const { uploadFileS3 } = require('../services/aws');
const { Category } = require('../models/category');
const { File } = require('../models/file');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

async function getCategoryById(req, res) {
	try {
		const custID = req.params.id;

		if(mongoose.Types.ObjectId.isValid(custID)) {
        	const category = await Category.findById(custID);
        	if(category)
	    		res.status(200).json(category);
	    	else 
	    		res.status(404).json({});
		}
		else
	    	res.status(400).json({ message:'Invalid custID' });

    } catch (err) {
        console.log('Exception controllers/category.js => getCategoryById => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function getCategories(req, res) {
	try {
		const query = req.query;

		if(query && typeof query == 'object') {
        	const categories = await Category.find(query);
    		res.status(200).json(categories);
		}
		else
	    	res.status(400).json({ message:'Invalid request' });

    } catch (err) {
        console.log('Exception controllers/category.js => getCategories => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function createCategory(req, res) {
	try {

		let files = [];

		if(Array.isArray(req.files) && req.files.length>0) {
            for(const file of req.files) {
				if(!file || !file.originalname) {
					console.log('Invalid File')
					return res.status(400).send("Image file not valid");
				}

				let fileObj = {}

				const processedFile = await processFile(file);

		        fileObj.name = processedFile.fileName;
		        fileObj.type = processedFile.type
		        fileObj.ext = processedFile.fileExt;
		        fileObj.path = processedFile.s3FilePath;
		        fileObj.status = 'active';
		        fileObj = await File.create(fileObj);
                files.push(fileObj._id);
            }
        }

        req.body.images = files;
        
        req.body.status = 'inactive';
        req.body.desc = req.body.description;
        if(req.body.isActive==true)
        	req.body.status = 'active';

        delete req.body.description;
        delete req.body.isActive;
        delete req.body.isDefault;

        const category = await Category.create({...req.body});
        if(category)
            res.status(200).json(category);
        else 
			return res.status(404).json({ message : 'Category Not found' });
    } catch (err) {
        console.log('Exception controllers/category.js => updateCategory => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function updateCategory(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(category)
            res.status(200).json(category);
        else 
			return res.status(404).json({ message : 'Category Not found' });
    } catch (err) {
        console.log('Exception controllers/category.js => updateCategory => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function deleteCategory(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const deleteResponse = await Category.deleteOne({_id:req.params.id});
        if(deleteResponse)
            res.status(200).json({});
        else 
			return res.status(404).json({ message : 'Category Not found' });
    } catch (err) {
        console.log('Exception controllers/category.js => deleteCategory => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function readFileAsBase64(filePath) {
  try {
    const fileData = await fs.promises.readFile(filePath);
    const base64Data = fileData.toString('base64');
    return base64Data;
  } catch (error) {
    console.log('Error reading file as base64:', error);
    throw error;
  }
}

async function processFile(file) {
  const { name, ext } = path.parse(file.originalname);
  const fileExt = ext.slice(1);

  let base64fileData = null;
  if(file.buffer)
    base64fileData = file.buffer;
  else 
    base64fileData = await readFileAsBase64(file.path);

  const fileName = name+"-"+new Date().getTime();
  const s3Data = await uploadFileS3(fileName, 'uploads', base64fileData, fileExt);

  fs.unlinkSync(file.path);
  
  if (!s3Data || s3Data === '') {
    throw new Error('AWS file saving failed');
  }
  else{
    return {
      fileName,
      name,
      fileExt,
      s3FilePath: s3Data.Key, 
      type: file.mimetype,
      physicalPath: file.path,
    };
  }
}

module.exports = {
	getCategoryById,
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	readFileAsBase64,
	processFile
}