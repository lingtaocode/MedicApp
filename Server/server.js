require("dotenv").config();
const express = require('express');
const config = require('./connections/config');
const sql = require('mssql');
const cors = require('cors');
const departmentRoutes = require('./route/departmentRoutes');
const doctorRoutes = require('./route/doctorRoutes');
const appointmentRoutes = require('./route/appointmentRoutes');



const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/department", departmentRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);

//listen for requests
app.listen(process.env.PORT, (req, res) => {
  console.log("Listening on port " + process.env.PORT);
});

