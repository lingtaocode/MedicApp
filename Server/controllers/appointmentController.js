const { getConnection } = require("../connections/dbConnection");
const table = "Appointments";

//GET all appointments
const getAllAppointments = async (req, res) => {
  try {
    const pool = await getConnection();
    //const query = "SELECT * FROM " + table + ";";
    const query = "SELECT Appointments.id, Appointments.status, Appointments.date_on, Departments.name as department_name, Doctors.name as doctor_name, Patients.name as patient_name, Doctor_times.stime as start_time, Doctor_times.etime as end_time FROM Appointments LEFT JOIN Departments ON Appointments.department_id=Departments.id LEFT JOIN Doctors ON Appointments.doctor_id = Doctors.id LEFT JOIN Patients ON Appointments.patient_id = Patients.id LEFT JOIN Doctor_times ON Appointments.doctor_time_id = Doctor_times.id ORDER BY CAST(Appointments.date_on AS date) DESC;";
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

//POST Appointments
const createNewAppointment = async (req, res) => {
  const { departmentId, doctorId, patientId, doctorTimeId, statusStr, date_on } = req.body;
  // fixme：validating
  const department_id = parseInt(departmentId);
  const doctor_id = parseInt(doctorId);
  const patient_id = parseInt(patientId);
  const doctor_time_id = parseInt(doctorTimeId);
  const status = parseInt(statusStr) - 1;
  const date = new Date(date_on);
  console.log(date);


  try {
    const pool = await getConnection();
    const tableColumns = "(department_id, doctor_id, patient_id, doctor_time_id, status, date_on)";
    const values = `('${department_id}', '${doctor_id}', '${patient_id}', '${doctor_time_id}', '${status}' , CAST('${date_on}' AS Date))`;
    const query = "INSERT INTO " + table + " " + tableColumns + " VALUES " + values + ";";
    await pool.request().query(query);
    console.log("Create success");
    res.json("Create Success");

  }
  catch (error) {
    console.error("this error:" + error.message);
    res.status(500);
    res.send(error.message);
  }
}

//Delete Appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id);

  try {
    //check if exist
    const pool = await getConnection();
    const query = "SELECT count(*) as count FROM " + table + " WHERE id=" + intId;
    const result = await pool.request().query(query);
    const array = result.recordset[0].count;
    console.log(array);
    if (array < 1) {
      return res.status(422).json({ error: "invalid ID" });
    }

    //delete item
    const queryDelete = "DELETE FROM " + table + " WHERE id=" + intId;
    await pool.request().query(queryDelete);

    res.status(200).json("Delete Success");

  }
  catch (error) {
    console.error("this error:" + error.message);
    res.status(500);
    res.send(error.message);
  }

}
// Get Appointment by ID
const getAppointmentById = async (req, res) => {

  const { id } = req.params;
  const intId = parseInt(id);
  try {
    const pool = await getConnection();
    //const query = "SELECT * FROM " + table + ";";
    const query = `SELECT Appointments.id, Appointments.status, Appointments.date_on, Departments.name as department_name, Doctors.name as doctor_name, Patients.name as patient_name, Patients.id as patient_id, Doctor_times.stime as start_time, Doctor_times.etime as end_time FROM Appointments LEFT JOIN Departments ON Appointments.department_id=Departments.id LEFT JOIN Doctors ON Appointments.doctor_id = Doctors.id LEFT JOIN Patients ON Appointments.patient_id = Patients.id LEFT JOIN Doctor_times ON Appointments.doctor_time_id = Doctor_times.id WHERE Appointments.id = ${intId};`;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

//Update Appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id);

  const { departmentId, doctorId, patientId, doctorTimeId, statusStr, date_on } = req.body;

  // fixme：validating
  const department_id = parseInt(departmentId);
  const doctor_id = parseInt(doctorId);
  const patient_id = parseInt(patientId);
  const doctor_time_id = parseInt(doctorTimeId);
  const status = parseInt(statusStr);


  try {
    //check if exist
    const pool = await getConnection();
    const query = "SELECT count(*) as count FROM " + table + " WHERE id=" + intId;
    const result = await pool.request().query(query);
    const array = result.recordset[0].count;
    console.log(array);
    if (array < 1) {
      return res.status(422).json({ error: "invalid ID" });
    }

    //update item
    const setData = ` SET department_id = ${department_id}, doctor_id = ${doctor_id}, patient_id = ${patient_id}, doctor_time_id = ${doctor_time_id}, status = ${status}, date_on = '${date_on}'`
    const queryUpdate = "UPDATE " + table + setData + " WHERE id = " + intId + ";";
    console.log(date_on);
    await pool.request().query(queryUpdate);

    res.status(200).json("Update Success");

  }
  catch (error) {
    console.error("this error:" + error.message);
    res.status(500);
    res.send(error.message);
  }

}

module.exports = {
  getAllAppointments,
  createNewAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointmentById
}