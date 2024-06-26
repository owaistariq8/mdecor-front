const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../middlewares/auth');

const { Customer } = require('../models/customer');
const { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customer');


router.get('/', auth, getCustomers);
router.get('/:id', auth, getCustomerById);
router.post('/', auth, createCustomer);
router.patch('/update/:id', auth, updateCustomer);
router.get('/delete/:id', auth, deleteCustomer);

module.exports = router;