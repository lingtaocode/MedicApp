const { getConnection } = require("../connections/dbConnection");
const table = "Patients";

//GET all Patients
const getAllPatients = async (req, res) => {
  try {
    const pool = await getConnection();
    //const query = "SELECT * FROM " + table + ";";
    const query = "SELECT Patients.id, Patients.name FROM Patients ;";
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getAllPatients,

}