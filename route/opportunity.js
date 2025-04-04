const express = require('express');
const router = express.Router();
const userController = require('../controller/opportunity');

router.post('/opportunity', userController.opportunityDetailspost);
router.get('/opportunity', userController.opportunityDetailsget);
router.put('/opportunityupdate/:id',userController.opportunityDetailsupdate);
router.delete('/opportunitydelete/:id',userController.opportunityDetailsdelete);

module.exports = router;