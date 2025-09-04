require('dotenv').config();

const express = require('express');
const auth = require('./services/authenticate');
const query = require('./db/customers');

const app = express();
app.use(express.json());

const port = 3000;

// Route for authentication
app.post("/login", auth.login);

app.get("/api/customers", auth.authenticate, query.getAllCustomers);
app.get("/api/customers/:id", auth.authenticate, query.getCustomerById);
app.post("/api/customers", auth.authenticate, query.addCustomer);
app.delete("/api/customers/:id", auth.authenticate, query.deleteCustomer);
app.put("/api/customers/:id", auth.authenticate, query.updateCustomer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;