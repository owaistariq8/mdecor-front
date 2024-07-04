const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../middlewares/auth');

const { Order } = require('../models/order');
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/order');


router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createOrder);
router.patch('/update/:id', auth, updateOrder);
router.get('/delete/:id', auth, deleteOrder);

module.exports = router;