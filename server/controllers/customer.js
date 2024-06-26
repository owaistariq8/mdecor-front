const { Customer } = require('../models/customer');
const mongoose = require('mongoose');

async function getCustomerById(req, res) {
	try {
		const custID = req.params.id;

		if(mongoose.Types.ObjectId.isValid(custID)) {
        	const customer = await Customer.findById(custID);
        	if(customer)
	    		res.status(200).json({ success: true, data:customer });
	    	else 
	    		res.status(404).json({ success: false, data:{} });
		}
		else
	    	res.status(400).json({ success: false, message:'Invalid custID' });

    } catch (err) {
        console.log('Exception controllers/customer.js => getCustomerById => ', err);
    	res.status(500).json({ success: false, message:'Internal Server Error' });
    }
}


async function getCustomers(req, res) {
	try {
		const query = req.query;

		if(query && typeof query == 'object') {
        	const customers = await Customer.find(query);
        	if(customers && Array.isArray(customers) && customers.length>0)
	    		res.status(200).json({ success: true, data:customers });
	    	else 
	    		res.status(404).json({ success: false, data:{} });
		}
		else
	    	res.status(400).json({ success: false, message:'Invalid request' });

    } catch (err) {
        console.log('Exception controllers/customer.js => getCustomers => ', err);
    	res.status(500).json({ success: false, message:'Internal Server Error' });
    }
}


async function createCustomer(req, res) {
	try {

        const customer = await Customer.create(...req.body);
        if(customer)
            res.status(200).json({ success: true, data : customer});
        else 
			return res.status(404).json({ success: false, message : 'Customer Not found' });
    } catch (err) {
        console.log('Exception controllers/customer.js => updateCustomer => ', err);
    	res.status(500).json({ success: false, message:'Internal Server Error' });
    }
}

async function updateCustomer(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ success: false, message : 'Invalid request' });

        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(customer)
            res.status(200).json({ success: true, data : customer});
        else 
			return res.status(404).json({ success: false, message : 'Customer Not found' });
    } catch (err) {
        console.log('Exception controllers/customer.js => updateCustomer => ', err);
    	res.status(500).json({ success: false, message:'Internal Server Error' });
    }
}

async function deleteCustomer(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ success: false, message : 'Invalid request' });

        const deleteResponse = await Customer.deleteOne({_id:req.params.id});
        if(deleteResponse)
            res.status(200).json({ success: true, data : {}});
        else 
			return res.status(404).json({ success: false, message : 'Customer Not found' });
    } catch (err) {
        console.log('Exception controllers/customer.js => deleteCustomer => ', err);
    	res.status(500).json({ success: false, message:'Internal Server Error' });
    }
}


module.exports = {
	getCustomerById,
	getCustomers,
	createCustomer,
	updateCustomer,
	deleteCustomer
}