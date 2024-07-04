const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { Role } = require('../models/role');
const { Session } = require('../models/session');
const { delay } = require('../utils/misc');
const { sendEmail } = require('../services/aws');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const mongoose = require('mongoose');
const fs = require('fs');
// Promisify bcrypt functions
const bcryptCompare = promisify(bcrypt.compare);
const bcryptHash = promisify(bcrypt.hash);


/**
 * Creates a JWT token with the provided payload.
 * @param {any} payload The data to be encoded in the token.
 * @returns {string} The generated JWT token.
 */
const createToken = (payload) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET,{ expiresIn: '3d' });
};


async function getUserById(req, res) {
	try {
		const userId = req.params.id;

		if(mongoose.Types.ObjectId.isValid(userId)) {
        	const user = await User.findById(userId).populate('roles').populate('customers');
        	if(user)
	    		res.status(200).json(user);
	    	else 
	    		res.status(404).json({});
		}
		else
	    	res.status(400).json({ message:'Invalid userId' });

    } catch (err) {
        console.log('Exception controllers/user.js => getUserById => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}


async function getUsers(req, res) {
	try {
		const query = req.query;

		if(query && typeof query == 'object') {
        	const users = await User.find(query).populate('roles').populate('customers');
        	if(users && Array.isArray(users) && users.length>0)
	    		res.status(200).json(users);
	    	else 
	    		res.status(404).json([]);
		}
		else
	    	res.status(400).json({  message:'Invalid request' });

    } catch (err) {
        console.log('Exception controllers/user.js => getUsers => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}

async function signup(req, res) {
	try {

		if(!req.body.email) 
			return res.status(400).json({  message : 'Invalid request' });

	 	const existingUser = await User.findOne({ email: req.body.email }).select('_id').lean();
        
        if (existingUser) 
    		return res.status(400).json({  message : 'User already exists' });
        

        const hash = await bcryptHash(req.body.password, 10);
        let userObj = new User({
        	...req.body,
        	password: hash
        })
		let session = await manageSession(req, userObj.id);
        console.log(userObj, session);
    	userObj.accessToken = await createToken({ id : userObj.id, email : userObj.email, sessID : session.session.sessionId });
    	const user = await userObj.save();
		const data = {
     		accessToken:user.accessToken,
            userId: user.id,
            sessionId:session.session.sessionId,
            user: {
              email: user.email,
              firstName:user.firstName,
              lastName:user.lastName,
              customer: user?.customer?._id,
              roles: user.roles,
            }
 		}
		if(user) {
    		res.status(200).json( data );
		}
		else
	    	res.status(404).json({  message : 'Unable to create user' });

    } catch (err) {
        console.log('Exception controllers/user.js => signup => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}

async function createUser(req, res) {
	try {

		if(!req.body.email) 
			return res.status(400).json({  message : 'Invalid request' });

	 	const existingUser = await User.findOne({ email: req.body.email }).select('_id').lean();
        
        if (existingUser) 
    		return res.status(400).json({  message : 'User already exists' });

        const hash = await bcryptHash(req.body.password, 10);
        
        let user = await User.create({
        	...req.body,
        	password: hash,
        	accessToken:generateTokenString()
        })

		if(user) {
    		res.status(200).json( user );
		}
		else
	    	res.status(404).json({  message : 'Unable to create user' });

    } catch (err) {
        console.log('Exception controllers/user.js => signup => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}

async function resetPassword(req, res) {
	try {

		if(!req.body.password || !req.body.email) 
			return res.status(400).json({  message : 'Invalid request' });

		const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.password, salt);

        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) 
        	return res.status(404).json({  message : 'User not found' });

        const currentPassword = user.password;
        const compare = promisify(bcrypt.compare);
        const result = await compare(req.body.password, currentPassword);

        if (result) 
            return res.status(400).json({  message : 'You have already used this password!' });;

        await User.updateOne({ email }, { password: newPassword });
        res.status(200).json({ message : 'Password updated successfully' });

    } catch (err) {
        console.log('Exception controllers/user.js => resetPassword => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}

async function logout(req, res) {

	try{
		await clearUserSession(req.params.userID);
  		res.status(200).json({ message : 'Password updated successfully' });
	}
	catch(e) {
		console.log('Exception controllers/user.js => logout => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
	}
}

function generateTokenString() {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  	let token = "";

	for (let i = 0; i < 10; i++) 
		token += chars.charAt(Math.floor(Math.random() * chars.length));

	return token;
}

async function forgetPassword(req, res) {
  	
  	try{
	    const user = await User.findOne({ email: req.body.email, status:'active' })

	    if (user ) {

	    	user.accessToken = generateTokenString();
	    	await user.save();

	      	const link = `${process.env.SET_PASSWORD_LINK}${token}/${user._id}`;
	          
	      	let emailSubject = "Reset Password";

			let params = { to: user.email, subject: emailSubject, html: true };

	      	let name = user.name;

			fs.readFile(__dirname+'/../templates/forget-password.html','utf8', async function(err,data) {
			  	params.htmlData = render(data,{  name, link });
			  	await sendEmail(params);
			});
			res.status(200).json({messsage:'Forget Password Email Sent Successfully'});
	    } else {
	      res.status(400).json({message:'Unable to locate the system user'});
	    }
  	} catch (err) {
        console.log('Exception controllers/user.js => forgetPassword => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
};

async function verifyToken(req, res) {

  try {
    const user = await User.findById(req.body.userId);
    
    if (user && user.accessToken==req.body.token) {
		const newPassword = await bcrypt.hash(req.body.password, 12);
		user.password = newPassword;
		await user.save();

      	let emailContent = `Your password has been updated successfully.<br> <br>Please sign in to access your account<br>`;
      	let emailSubject = "Password Reset Successful";

		let params = { to: user.email, subject: emailSubject, html: true };

		let name = user.name;
		params.htmlData = emailContent;
		await awsService.sendEmail(params);
		res.status(200).json({message:emailSubject})
	}
	else {
		res.status(400).json( { message : 'Token Invalid!' } );
	}
  }
  catch (error) {
    console.log('Exception controllers/user.js => verifyToken => ', err);
	res.status(500).json({  message:'Internal Server Error' });
  }

};


async function login(req, res) {
	try {

		if(!req.body.email || !req.body.password) 
			return res.status(400).json({  message : 'Invalid request' });

        let user = await User.findOne({ email:  req.body.email }).populate('roles').populate('customers');
        if(user) {

        	let session = await manageSession(req,user.id);
	        if (!session || !session.session || !session.session.sessionId) {
	          return res.status(500).send("Unable to Start session.");
	        }
	        else {
	    		user.accessToken = await createToken({ id : user.id, email : user.email, sessID : session.session.sessionId });
	    		user = await user.save();
		        const passwordMatched = await bcryptCompare(req.body.password, user.password);
		     	if (passwordMatched){
		     		const data = {
			     		accessToken:user.accessToken,
			            userId: user.id,
			            sessionId:session.session.sessionId,
			            user: {
			              email: user.email,
			              firstName:user.firstName,
			              lastName:user.lastName,
			              customer: user?.customer?._id,
			              roles: user.roles,
			            }
		     		}
		            res.status(200).json(data);
		     	}
		        else 
					return res.status(400).json({  message : 'Invalid request' });
	        }
        }
        else 
			return res.status(400).json({  message : 'Invalid request' });
    } catch (err) {
        console.log('Exception controllers/user.js => login => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}


async function manageSession(req, userId) {

  try {
    await clearUserSession(userId);

    // console.log("req.session",req.session);
    if(req.session) {

      req.session.cookie.expires = false;
      let maxAge = process.env.TOKEN_EXP_TIME || "48h";
      maxAge = maxAge.replace(/\D/g,'');

      req.session.cookie.maxAge =  maxAge * 60 * 60 * 1000;
      req.session.isLoggedIn = true;
      req.session.user = userId;
      req.session.sessionId = req.sessionID;
      
      await req.session.save();
      await delay(500);
      let user = await Session.findOne({"session.user":userId});
      return user;
    }
    else {
      console.log("session not found",new Date().getTime());

      return false;
    }


  } catch (err) {
    console.error('Error saving to session storage: ', err);
  }
}

async function clearUserSession(userId) {
  await Session.deleteMany({"session.user":userId});
  await Session.deleteMany({"session.user":{$exists:false}});
}

async function updateUser(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({  message : 'Invalid request' });

		const salt = await bcrypt.genSalt(10);
        req.body.password = await bcryptHash(req.body.password, salt);

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(user)
            res.status(200).json(user);
        else 
			return res.status(404).json({  message : 'User Not found' });
    } catch (err) {
        console.log('Exception controllers/user.js => updateUser => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}

async function deleteUser(req, res) {
	try {

		if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
			return res.status(400).json({  message : 'Invalid request' });

        const deleteResponse = await User.deleteOne({_id:req.params.id});
        if(deleteResponse)
            res.status(200).json({});
        else 
			return res.status(404).json({  message : 'User Not found' });
    } catch (err) {
        console.log('Exception controllers/user.js => deleteUser => ', err);
    	res.status(500).json({  message:'Internal Server Error' });
    }
}


module.exports = {
	createToken,
	getUserById,
	getUsers,
	signup,
	resetPassword,
	login,
	updateUser,
	deleteUser,
	createUser,
	logout,
	verifyToken,
	forgetPassword
}