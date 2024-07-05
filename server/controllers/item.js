const { Item } = require('../models/item');
const mongoose = require('mongoose');
const { uploadFileS3 } = require('../services/aws');

const { File } = require('../models/file');
const { processFile } = require('./category');
const path = require('path');
const fs = require('fs');

async function getItemById(req, res) {
	try {
		const itemId = req.params.id;

		if(mongoose.Types.ObjectId.isValid(itemId)) {
			const item = await Item.findById(itemId).populate([{ path: 'images'}, { path: 'category', select:'_id name'}]);
			
        	if(item)
	    		res.status(200).json(item);
	    	else 
	    		res.status(404).json({});
		}
		else
	    	res.status(400).json({ message:'Invalid itemId' });

    } catch (err) {
        console.log('Exception controllers/item.js => getItemById => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function getItems(req, res) {
	try {
		const query = req.query;

		if(query && typeof query == 'object') {
        	const items = await Item.find(query).populate([{ path: 'images'}, { path: 'category', select:'_id name'}]);
    		res.status(200).json(items);
		}
		else
	    	res.status(400).json({ message:'Invalid request' });

    } catch (err) {
        console.log('Exception controllers/item.js => getItems => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function createItem(req, res) {
	try {

		let files = [];
		if(Array.isArray(req.files.images) && req.files.images.length>0) {
            for(const file of req.files.images) {
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

        const item = await Item.create({...req.body});
        if(item)
            res.status(200).json(item);
        else 
			return res.status(404).json({ message : 'Item Not found' });
    } catch (err) {
        console.log('Exception controllers/item.js => updateItem => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function updateItem(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(item)
            res.status(200).json(item);
        else 
			return res.status(404).json({ message : 'Item Not found' });
    } catch (err) {
        console.log('Exception controllers/item.js => updateItem => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function deleteItem(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const deleteResponse = await Item.deleteOne({_id:req.params.id});
        if(deleteResponse)
            res.status(200).json({});
        else 
			return res.status(404).json({ message : 'Item Not found' });
    } catch (err) {
        console.log('Exception controllers/item.js => deleteItem => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


module.exports = {
	getItemById,
	getItems,
	createItem,
	updateItem,
	deleteItem
}