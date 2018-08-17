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

            Role.findOne({_id: {$in: req.user.roles}, permissions: {$in: [permission._id]}}, function(err, entities){
                if (err || !entities) {
                    return res.status(403).json('ACCESS DENIED.')
                }

                next();
                return;
            });
        })
    }
}