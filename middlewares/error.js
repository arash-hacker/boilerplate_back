const winston = require('winston')

module.exports = function (err, req, res, next) {

	winston.error({err:err.message,stack:err.stack},err)

	res.status(500).send('Opps someThing Fail')
}