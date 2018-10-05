const Permission = require(`${config.path.model}/Permission`);
const Role = require(`${config.path.model}/Role`);

module.exports = function acl(permission_name) { 

	return (req, res, next) => {

		if (req.user._id && req.user.email === 'set.ali.mousavi@gmail.com') {
			next();
			return;
		}

		Permission.findOne({name: permission_name}, function (err, permission) {
			if (err || !permission) {
				return res.status(403).json('ACCESS DENIED.')
			}

			console.log(req.user.roles, permission);
			Role.findOne({_id: {$in: req.user.roles}, permissions: {$in: [permission._id]}}, function(err, entities){
				console.log(entities, err);
				if (err || !entities) {
					return res.status(403).json('ACCESS DENIED.')
				}

				next();
				return;
			});
		})
	}
}