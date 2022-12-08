const config = require('../config'); // change path
const { Connection, Request } = require("tedious");
const sql = require('mssql');


// const connection = new Connection(config);


const getUsers = async (sql) => {

  try {

    // connection.on("connect", err => {
    //   console.log('connected');
    //   const users = 
    //   });
    const pool = await sql.connect(config);
    const query = "SELECT * FROM Usr;";
    const users = pool.request().query(query);
    console.log("from controller");
    return users;
  }
  catch (error) {
    console.error("this error:" + error.message);
  }
}

const addUser = async (user) => {

  try {

    // connection.on("connect", err => {
    //   console.log('connected');
    //   const users = 
    //   });
    const pool = await sql.connect(config);
    const query = `INSERT INTO Usr (email, password)
    VALUES ('${user.email}', '${user.password}');`;
    const users = pool.request().query(query);
    console.log("from controller");
    return users;
  }
  catch (error) {
    console.error("this error:" + error.message);
  }
}

module.exports = {
  getUsers,
  addUser
}