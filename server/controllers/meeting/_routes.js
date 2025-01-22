const express = require('express');
const meeting = require('./meeting');
const auth = require('../../middelwares/auth');

const router = express.Router();

router.post('/meetings', auth,meeting.add);
router.get('/meetings', meeting.index);
router.get('/meetings/:id', auth, meeting.view);
router.delete('/meetings/:id', auth, meeting.deleteData);
router.post('/meetings/delete-many', auth, meeting.deleteMany);

module.exports = router