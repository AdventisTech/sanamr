const express = require('express');
const router = express.Router();
const billableController = require('../controller/billable');

router.post('/Task', billableController.BillableDetailspost);
router.get('/Taskget', billableController.BillableDetailsget);
router.put('/Taskupdate/:id',billableController.BillableDetailsupdate);
router.delete('/Taskdelete/:id',billableController.BillableDetailsdelete)

module.exports = router;