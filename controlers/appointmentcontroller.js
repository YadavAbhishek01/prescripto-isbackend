import appointmentModel from '../models/appointments.js';

// ✅ Create new appointment
export const createappointments = async (req, res) => {
  try {
    const { doctorname, specialist, fees, date, time, Patient_details, phone, image ,isavailabel} = req.body;

    const appointment = await appointmentModel.create({
      doctorname,
      specialist,
      fees,
      date,
      time,
      phone,
      image,
      Patient_details,
      isavailabel,
    });

    res.status(201).json({ success: true, message: "Appointment created successfully", appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ success: false, message: "Server error while creating appointment" });
  }
};

// ✅ Get all appointments
export const getallappointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find();
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Failed to fetch appointments" });
  }
};

// ✅ Delete appointment by ID
export const deleteappointments = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await appointmentModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ success: false, message: "Failed to delete appointment" });
  }
};
