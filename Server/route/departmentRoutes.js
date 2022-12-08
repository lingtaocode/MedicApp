//app declarations
const express = require("express");
//routing
const router = express.Router();
const {
  getAllDepartments,
  createNewDepartment
} = require("../controllers/departmentController");


router.get("/departments", getAllDepartments);
router.post("/departments", createNewDepartment);
// router.get("/appointments/count", getTotalDepartments);
// router.get("/appointments/:id", getDepartmentById);
// router.delete("/appointments/:id", deleteDepartmentById);
// router.put("/appointments/:id", updateDepartmentById);

module.exports = router;

