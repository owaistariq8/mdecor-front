const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../middlewares/auth');

const { Role } = require('../models/role');
const { getRoles, getRoleById, createRole, updateRole, deleteRole } = require('../controllers/role');


router.get('/', auth, getRoles);
router.get('/:id', auth, getRoleById);
router.post('/', auth, createRole);
router.patch('/update/:id', auth, updateRole);
router.get('/delete/:id', auth, deleteRole);

module.exports = router;