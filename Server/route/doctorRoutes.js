//app declarations
const express = require("express");
//routing
const router = express.Router();
const {
  getAllDoctors,
  createNewDoctor,
  getAllDoctorTimes
} = require("../controllers/doctorController");

const {
  getAllPatients
} = require("../controllers/patientController");


router.get("/doctors", getAllDoctors);
router.post("/doctors", createNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/patients", getAllPatients);
router.get("/doctors/time", getAllDoctorTimes);
// router.get("/departments/count", getTotalDepartments);
// router.get("/departments/:id", getDepartmentById);
// router.delete("/departments/:id", deleteDepartmentById);
// router.put("departments/:id", updateDepartmentById);

module.exports = router;