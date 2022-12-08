const { getConnection } = require("../connections/dbConnection");
const table = "Doctors";

//GET all doctors
const getAllDoctors = async (req, res) => {
  try {
    const pool = await getConnection();
    //const query = "SELECT * FROM " + table + ";";
    const query = "SELECT Doctors.id, Doctors.email, Doctors.address, Doctors.name, Doctors.phone, Doctors.photo, Doctors.specialties, Departments.name as department_name FROM Doctors LEFT JOIN Departments ON Doctors.department_id=Departments.id;";
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

//POST Doctor

const createNewDoctor = async (req, res) => {
  const { departmentId, email, address, name, phone, photo, specialties } = req.body;
  //validating
  if (email == null || address || name || phone == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  const department_id = parseInt(departmentId);
  try {
    const pool = await getConnection();
    const tableColumns = "(department_id, email, address, name, phone, photo, specialties)";
    const values = `('${department_id}', '${email}', '${address}', '${name}', '${phone}', '${photo}', '${specialties}')`;
    //const query = `INSERT INTO Departments (name, room_num, phone) VALUES ('${name}', '${roomNumber}', '${phone}');`;
    const query = "INSERT INTO " + table + " " + tableColumns + " VALUES " + values + ";";
    await pool.request().query(query);
    console.log("Create success");
    res.json({ departmentId, email, address, name, phone, photo, specialties });

  }
  catch (error) {
    console.error("this error:" + error.message);
    res.status(500);
    res.send(error.message);
  }
}

//GET all doctorTimes
const getAllDoctorTimes = async (req, res) => {
  try {
    const pool = await getConnection();
    //const query = "SELECT * FROM " + table + ";";
    const query = "SELECT Doctor_times.id as id, CONCAT_WS(' ', CONCAT_WS('-', Doctor_times.stime, Doctor_times.etime), Doctor_times.date_on, 'Doctor: ', Doctors.name) as date, Doctors.id as doctorId, Doctors.department_id as departmentId, Doctor_times.date_on as dateOn FROM Doctor_times LEFT JOIN Doctors ON Doctor_times.doctor_id=Doctors.id WHERE Doctor_times.date_on >= CAST( GETDATE() AS Date ) ORDER BY CAST(Doctor_times.date_on AS date) ASC;";
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getAllDoctors,
  createNewDoctor,
  getAllDoctorTimes
}