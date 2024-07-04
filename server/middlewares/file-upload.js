const multer = require('multer');
const fs = require('fs');
const path = require('path');


const validExtensions = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'webp',
];

const fileUpload = multer({
  limits: { fileSize: process.env.MAX_FILESIZE || 5000000000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = process.env.UPLOAD_PATH;
      if (!uploadPath) {
        return cb(new Error('UPLOAD_PATH environment variable is not set'));
      }
      // create the directory if it doesn't already exist
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // const ext = validExtensions[file.mimetype];
      const { ext } = path.parse(file.originalname);
      let fileExt = ext.slice(1);
      if(fileExt)
        fileExt = fileExt.toLowerCase()
      cb(null, new Date().getTime()+'.'+fileExt);
    }
  }),
  fileFilter: (req, file, cb) => {
    let errorMessage = '';
    // const isValid = !!validExtensions[file.mimetype];
    const { ext } = path.parse(file.originalname);
    let fileExt = ext.slice(1);

    if(fileExt)
      fileExt = fileExt.toLowerCase()
    
    const isValid = (validExtensions.indexOf(fileExt.trim())) != -1 ? true : false;
    if (!isValid) {
      errorMessage = 'Invalid mime type!';
      return req.res.status(400).send(errorMessage);
    }
    cb(errorMessage, isValid);
  }
});

module.exports = fileUpload;
