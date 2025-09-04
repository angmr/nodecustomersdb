const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "customer",
  password: "fjsi583Nspda#"
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}