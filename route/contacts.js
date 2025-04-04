const express = require('express');
const router = express.Router();
const userController = require('../controller/contacts');

router.post('/Contacts', userController.CondactDetailspost);
router.get('/Contacts', userController.CondactDetailsget);
router.put('/Contactsupdate/:id',userController.CondactDetailsupdate);
router.delete('/Contactsdelete/:id',userController.CondactDetailsdelete)

module.exports = router;