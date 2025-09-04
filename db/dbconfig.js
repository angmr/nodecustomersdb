require('dotenv').config();
const { Pool } = require('pg');  //Import the Pool class from pg using destructuring

/** Create a new instance of the Pool class. 
 * A pool manages multiple connections to the PostgreSQL database, so the app can efficiently handle many queries at once
 * without opening/closing a connection for every request. 
 * The configuration object uses environment variables for database credentials.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});


/** Exports an object with a single property, query. The value of query is an arrow function that
 * takes two parameters: text and params.
 * This function calls pool.query(text, params), which sends the query to the database
 * using the connection pool. It returns a promise that resolves with the query result when the
 * query completes.
 * Executes a SQL query using the connection pool.
 * @param {string} text
 * @param {Array} params
 * @returns {Promise}
 */
module.exports = {
  query: (text, params) => pool.query(text, params),
}