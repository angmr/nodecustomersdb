# nodecustomersdb
A secure RESTful API built with Node.js and Express for performing CRUD operations on customer data, featuring JWT authentication and PostgreSQL integration.

## What each file does
### index.js
This file loads environment variables, requires all necessary modules, initializes the Express app, enables JSON parsing for incoming requests, sets the local port, defines all API routes (including authentication and customer CRUD operations), starts the server, and exports the app for testing or external use.

### db/customers.js
This file defines and exports handler functions for all the different API routes related to customer data. Each function interacts with the PostgreSQL database to perform CRUD operations.

For example: getAllCustomers is defined as a constant and assigned an arrow function that takes req (request) and res (response) as parameters. Inside, it calls db.query (a wrapper from the pg library), with an SQL query string and a callback function, which receives err and result. If there is no error, it sends back all customers rows from the database as a JSON response using res.json(result.rows). If there is an error, it logs it to the console (basic error handling, needs to be extended for production use).
All other handler functions operate with a similar structure with differences based on the database query.
These handlers are intented to be used as Express route callbacks.

### db/dbconfig.js
This file requires the PostgreSQL library (pg), loads environment variables, and creates a connection pool for efficient database access. It exports a query wrapper function that delegates SQL queries to the pool, allowing other modules to interact with the database easily. For a more detailed explanation read the file comments.

### db/users.js
Provides database handler functions for the users table, similar to how customers.js does for the customers table. Its functions are used for user login and authentication processes.

### services/authenticate.js
This file requires the authentication (jsonwebtoken) and hashing (bcrypt) libraries, as well as the user database handler. It defines the login and authenticate functions for handling user login and token-based authentication, and exports them for use in index.js to secure API routes. For more details read the doc comments in file.

### test/customer.js
