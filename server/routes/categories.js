const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require("multer");

const auth = require('../middlewares/auth');
const fileUpload = require('../middlewares/file-upload');

const { Category } = require('../models/category');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category');


router.get('/', auth, getCategories);
router.get('/:id', auth, getCategoryById);
router.post('/', auth, (req, res, next) => {
    fileUpload.fields([{name:'images', maxCount:1}])(req, res, (err) => {

      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err._message);
      } else if (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      } else {
        next();
      }
    });
  }, createCategory);
router.patch('/update/:id', auth, (req, res, next) => {
    fileUpload.fields([{name:'images', maxCount:1}])(req, res, (err) => {

      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err._message);
      } else if (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      } else {
        next();
      }
    });
  }, updateCategory);
router.get('/delete/:id', auth, deleteCategory);

module.exports = router;