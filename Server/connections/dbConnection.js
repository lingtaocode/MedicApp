const config = require('./config');
const sql = require('mssql');

// connect to database
const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("connected to DB ");
    return pool;
  } catch (error) {
    console.error("Connecting error:" + error.message);
  }
}
module.exports = { getConnection } 