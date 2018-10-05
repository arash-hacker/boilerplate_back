const Transform = require('./Transform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform {

	transform(item , createToken = false) {
		this.createToken = createToken;
		return {
			'_id' : item._id,
			'name' : item.name,
			'email' : item.email,
			'phone' : item.phone,
			'createdAt' : item.createdAt,
			'updatedAt' : item.updatedAt,
			'roles': item.roles,
			'accesses': item.accesses,
			...this.withToken(item)
		}
	}

	withToken(item) {
		if(item.token) 
			return { token : item.token};

		if(this.createToken === true) {
         
			let token = jwt.sign({ user_id : item._id } , config.secret , {
				expiresIn :  '336h',
			});

			return { token }
		}

		return {};
	}
}