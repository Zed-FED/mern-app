const jwt = require('jsonwebtoken');

const generateToken = (id) => {
	return jwt.sign({id}, "jwtsecret", {
		expiresIn: '30d',
	})
}

module.exports = generateToken;