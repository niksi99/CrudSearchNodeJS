const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');

router.get('/', customerController.homepageRoute);

router.get('/add', customerController.addCustomerPage);
router.post('/add', customerController.createCustomer);

router.get('/view/:id', customerController.viewThatCustomer);

router.get('/edit/:id', customerController.editCustomerPage);
router.put('/edit/:id', customerController.updateCustomer);

router.delete('/view/:id', customerController.deleteCustomer);
module.exports = router