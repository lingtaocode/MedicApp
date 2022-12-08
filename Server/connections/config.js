'use strict';

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD
    },
    type: "default"
  },
  server: process.env.SQL_SERVER,
  options: {
    database: process.env.SQL_DATABASE,
    encrypt: true
  }
};


module.exports = config;