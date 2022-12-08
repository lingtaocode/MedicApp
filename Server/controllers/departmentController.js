const { getConnection } = require("../connections/dbConnection");

//GET all departments
const getAllDepartments = async (req, res) => {
  try {
    const pool = await getConnection();
    const query = "SELECT * FROM Departments;";
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

//POST department

const createNewDepartment = async (req, res) => {
  const { name, roomNumber, phone } = req.body;
  // validating
  if (name == null || roomNumber == null || phone == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const query = `INSERT INTO Departments (name, room_num, phone) VALUES ('${name}', '${roomNumber}', '${phone}');`;
    await pool.request().query(query);
    console.log("Create success");
    res.json({ name, roomNumber, phone });

  }
  catch (error) {
    console.error("this error:" + error.message);
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getAllDepartments,
  createNewDepartment,
}