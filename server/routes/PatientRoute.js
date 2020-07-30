const express = require('express')
const patient = require('../controllers/PatientController')
const router = express.Router()

router.get('/patients', patient.findAllPrescriptions)
router.get('/patient/:id', patient.find)

router.post('/patient', patient.createProfile)
router.post('/prescription', patient.createPrescription)

router.put('/prescription', patient.updatePrescription)
router.delete('/prescription', patient.deletePrescription)


module.exports = router