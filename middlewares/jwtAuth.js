const jwt = require('jsonwebtoken');
const User = require(`${config.path.model}/User`);

module.exports = (req, res, next) => {
    let token = req.headers['authorization'] || req.body.token || req.query.token || req.headers['x-access-token'];

    req.user = {_id: undefined, roles: ['anonymous']};

    if (token) {
        jwt.verify(token, config.secret, (err, decode) => {

            if (!err) {
                User.findById(decode.user_id, (err, user) => {

                    if (!err && user) {
                        user.token = token;
                        req.user = user;
                        next();
                    }
                    else {
                        next();
                    }
                });
            }
            else {
                next();
            }
        })
    }
    else {
        next();
    }
}