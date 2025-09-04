const jwt = require('jsonwebtoken');
const user = require('../db/users');
const bcrypt = require('bcrypt');

/**
 * User login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 * 
 * Expects JSON body with email and password, extracts them, and looks up the user by email in the database.
 * The callback in getUserByEmail returns an array of users, even if only one is expected (email is unique).
 * If found, compares the provided password with the stored hashed password using bcrypt. 
 * If they match, creates a JSON Web Token (JWT) signed with a secret key from environment variables and sends it in the response.
 * The response is a JSON object containing the token.
 * If the user is not found or the password does not match, responds with a 400 status code.
 */
const login = (req, res) => {
    // Extract email and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    const loginUser = user.getUserByEmail(email, (user) => {
    if (user.length > 0) {
     const hashpwd = user[0].password;
     // Create JSON Web Token
     const token = jwt.sign({userId: email}, process.env.SECRET_KEY);

    // If password match, send the token
    if (bcrypt.compareSync(password, hashpwd))
      res.send({token});
    else
      res.sendStatus(400).end();
    }
    else {
      res.sendStatus(400).end();
    }
  });
}

/**
 * User authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Callback function to proceed to Express next middleware.
 * @returns {void}
 *
 * Middleware function that checks for a JWT in the Authorization header of the request.
 * If the token is present, it verifies the token using the secret key from environment variables.
 * If the token is valid, it calls next() to proceed to the next middleware or route handler.
 * If the token is missing or invalid, it responds with a 400 status code.
 * The JWT should be provided in the Authorization header.
 */
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        res.sendStatus(400).end();
    }

    // Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
     res.sendStatus(400).end();
   else
     next();
  }); 
}

module.exports = {
  authenticate: authenticate,
  login: login
}