const express = require("express")
const router = express.Router()
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router