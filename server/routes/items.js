const express = require('express');
const router = express.Router();
const multer = require("multer");
const auth = require('../middlewares/auth');
const fileUpload = require('../middlewares/file-upload');

const { Item } = require('../models/item');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/item');


router.get('/', auth, getItems);
router.get('/:id', auth, getItemById);

router.post('/', auth, (req, res, next) => {
    fileUpload.fields([{name:'images', maxCount:1}])(req, res, (err) => {

      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(500).send(err._message);
      } else if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        next();
      }
    });
  }, createItem);

router.patch('/update/:id', auth, (req, res, next) => {
    fileUpload.fields([{name:'images', maxCount:1}])(req, res, (err) => {

      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(500).send(err._message);
      } else if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        next();
      }
    });
  }, updateItem);
router.get('/delete/:id', auth, deleteItem);

module.exports = router;