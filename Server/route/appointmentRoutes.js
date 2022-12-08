//app declarations
const express = require("express");
//routing
const router = express.Router();
const {
  getAllAppointments,
  createNewAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointmentById
} = require("../controllers/appointmentController");


router.get("/appointments", getAllAppointments);
router.post("/appointments", createNewAppointment);
router.delete("/appointments/:id", deleteAppointment);
router.patch("/appointments/:id", updateAppointment);
router.get("/appointments/:id", getAppointmentById);

module.exports = router;