const { Order } = require('../models/order');
const mongoose = require('mongoose');

async function getOrderById(req, res) {
	try {
		const orderId = req.params.id;

		if(mongoose.Types.ObjectId.isValid(orderId)) {
        	const order = await Order.findById(orderId).populate('customer').populate('user').populate('items')
        	.populate('billingSite').populate('shippingSite');
        	if(order)
	    		res.status(200).json( order );
	    	else 
	    		res.status(404).json({ message:'Order Not Found' });
		}
		else
	    	res.status(400).json({ message:'Invalid orderId' });

    } catch (err) {
        console.log('Exception controllers/order.js => getOrderById => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function getOrders(req, res) {
	try {
		const query = req.query;

		if(query && typeof query == 'object') {
        	const orders = await Order.find(query).populate('customer').populate('user').populate('items')
        	.populate('billingSite').populate('shippingSite');
    		res.status(200).json( orders );
		}
		else
	    	res.status(400).json({ message:'Invalid request' });

    } catch (err) {
        console.log('Exception controllers/order.js => getOrders => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function createOrder(req, res) {
	try {

        const order = await Order.create({...req.body});
        if(order)
            res.status(200).json(order);
        else 
			return res.status(404).json({ message : 'Order Not found' });
    } catch (err) {
        console.log('Exception controllers/order.js => createOrder => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function updateOrder(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(order)
            res.status(200).json( order);
        else 
			return res.status(404).json({ message : 'Order Not found' });
    } catch (err) {
        console.log('Exception controllers/order.js => updateOrder => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function deleteOrder(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const deleteResponse = await Order.deleteOne({_id:req.params.id});
        if(deleteResponse)
            res.status(200).json( {});
        else 
			return res.status(404).json({ message : 'Order Not found' });
    } catch (err) {
        console.log('Exception controllers/order.js => deleteOrder => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


module.exports = {
	getOrderById,
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder
}