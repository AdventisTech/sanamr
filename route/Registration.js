const express = require('express');
const router = express.Router();
const userController = require('../controller/Registration');

router.post('/Register',userController.RegisterDetails);

router.post('/5498',userController.LoginDetails);
router.post('/Forgotpassword',userController.forgotPassword);
router.get('/5498', userController.LoginDetailsget);
router.put('/userupdate/:id',userController.userDetailsupdate);

router.delete('/userdelete/:id',userController.userDetailsdelete)

module.exports = router;