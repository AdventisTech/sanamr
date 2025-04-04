const express = require('express');
const router = express.Router();
const userController = require('../controller/projects1');
router.post('/Contactsupdate', userController.submitForm);
router.get('/userleavedetails', userController.Detailsget);
router.put('/maildetailsupdate/:id',userController.mailDetailsupdate);
router.delete('/maildetailsdelete/:id',userController.mailDetailsdelete)
// router.get('/api/user/approve/:formId', userController.getApprovalData);


const Form = require('../models/projects1');  // Assuming your model is in the 'models' directory

router.post('/submit', async (req, res) => {
    try {
        const newForm = new Form({
            // populate form data from req.body
        });

        // Set default status to 'Pending'
        newForm.status = 'Pending';

        const savedForm = await newForm.save();

        // Send email with approval and decline buttons
        await sendEmail(savedForm);

        res.json(savedForm);
    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/approve/:id', async (req, res) => {
    try {
        const formId = req.params.id;
        const updatedForm = await Form.findByIdAndUpdate(formId, { status: 'Approved' }, { new: true });

        // Add logic to send confirmation email or perform other actions if needed

        res.json(updatedForm);
    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/decline/:id', async (req, res) => {
    try {
        const formId = req.params.id;
        const updatedForm = await Form.findByIdAndUpdate(formId, { status: 'Declined' }, { new: true });

        // Add logic to send rejection email or perform other actions if needed

        res.json(updatedForm);
    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



