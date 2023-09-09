const express = require('express');
const router = express.Router()

const {addTest,getUserTests} = require('../controllers/report')

router.post('/addtest/:id',addTest);
router.get('/tests/:email',getUserTests)

module.exports = router;