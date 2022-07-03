const User = require('../model/userModal');
const generateToken = require('../utils/generateToken');

exports.addUser = async function (req, res) {
	let user = new User(req.body);

	const result = await user.save();

	if(!result) {
		res.json({
			status: "FAIL",
			message: "User not registered"
		})
	} else {
		res.json({
			status: "SUCCESS",
			message: "User registered",
			data: result
		})
	}
}

exports.getSingleUser = async function(req, res) {
	try {
		const _id = req.params.id;
		const result = await User.findById(_id);
		if(!result) {
			res.json({
				status: "FAIL",
				message: "No user found"
			})
		} else {
			res.json({
				status: "SUCCESS",
				message: "User found",
				data: result
			})
		}
	} catch(error) {
		res.send(error);
	}
}

exports.getAllUsers = async function(req, res) {
	try {
		const result = await User.find();
		if(!result) {
			res.json({
				status: "FAIL",
				message: "No user found"
			}) 
		} else {
			res.json({
				status: "SUCCESS",
				message: "Users found",
				data: result
			})
		}
	} catch(error) {
		console.log(error.message);
	}
}

exports.editUser = async function(req, res) {
	try {
		const _id = req.params.id;
		const result = await User.findByIdAndUpdate(_id, req.body, {
			new: true,
		});
		if(!result) {
			res.json({
				status: "FAIL",
				message: "Record not updated"
			}) 
		} else {
			res.json({
				status: "SUCCESS",
				message: "Record updated successfully",
				data: result
			})
		}
	} catch(error) {
		console.log(error.message)
	}
}

exports.deleteUser = async function(req, res) {
	try {
		const _id = req.params.id;
		const result = await User.findByIdAndDelete(_id);
		if(!result) {
			res.json({
				status: "FAIL",
				message: "Record not deleted"
			}) 
		} else {
			res.json({
				status: "SUCCESS",
				message: "Record deleted successfully",
				data: result
			})
		}
	} catch(error) {
		console.log(error.message)
	}
}





exports.loginUser = async function(req, res) {
	try {
		const {email, password} = req.body;
		const result = await User.findOne({email});
		// console.log(result)
		if(result && (await result.matchPassword(password))) {
			res.json({
				status: "LOGIN SUCCESS",
				message: "User Logged In",
				// data: result,
				// token: generateToken(result._id)
				data:{...result._doc, token: generateToken(result._id)}
				
				
			})
		} else {
			res.json({
				status: 'LOGIN FAIL',
				message: "Invalid Credentials"
			})
		}
	} catch(error) {
		console.log(error.message)
	}
	
} 