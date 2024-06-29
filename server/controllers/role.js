const { Role } = require('../models/role');
const mongoose = require('mongoose');

async function getRoleById(req, res) {
	try {
		const roleId = req.params.id;

		if(mongoose.Types.ObjectId.isValid(roleId)) {
        	const role = await Role.findById(roleId);
        	if(role)
	    		res.status(200).json( role );
	    	else 
	    		res.status(404).json({ });
		}
		else
	    	res.status(400).json({ message:'Invalid roleId' });

    } catch (err) {
        console.log('Exception controllers/role.js => getRoleById => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function getRoles(req, res) {
	try {
		const query = req.query;

		if(query && typeof query == 'object') {
        	const roles = await Role.find(query);
    		res.status(200).json( roles );
		}
		else
	    	res.status(400).json({ message:'Invalid request' });

    } catch (err) {
        console.log('Exception controllers/role.js => getRoles => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


async function createRole(req, res) {
	try {

        const role = await Role.create(...req.body);
        if(role)
            res.status(200).json(role);
        else 
			return res.status(404).json({ message : 'Role Not found' });
    } catch (err) {
        console.log('Exception controllers/role.js => updateRole => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function updateRole(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(role)
            res.status(200).json( role);
        else 
			return res.status(404).json({ message : 'Role Not found' });
    } catch (err) {
        console.log('Exception controllers/role.js => updateRole => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}

async function deleteRole(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({ message : 'Invalid request' });

        const deleteResponse = await Role.deleteOne({_id:req.params.id});
        if(deleteResponse)
            res.status(200).json( {});
        else 
			return res.status(404).json({ message : 'Role Not found' });
    } catch (err) {
        console.log('Exception controllers/role.js => deleteRole => ', err);
    	res.status(500).json({ message:'Internal Server Error' });
    }
}


module.exports = {
	getRoleById,
	getRoles,
	createRole,
	updateRole,
	deleteRole
}