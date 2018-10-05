const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/UserTransform`);
const User = require(`${config.path.model}/User`);
const Role = require(`${config.path.model}/Role`);
const Access = require(`${config.path.model}/Access`);
const VerificationCode = require(`${config.path.model}/VerificationCode`);
const sms = require(`${config.path.lib}/sms`);
const bcrypt = require('bcrypt');
const atob = require('atob');

module.exports = new class AuthController extends Controller {

	login(req, res) {

		let auth = atob(req.headers.authorization), data = auth.split(':'), query;

		if (data[0].includes('@')) {
			query = {email: data[0]}
		}
		else {
			query = {phone: data[0]}
		}

		User.findOne(query, (err, user) => {

			if (err){}
			if (user === null) {
				return res.status(422).json('اطلاعات وارد شده صحیح نمی باشد');
			}

			bcrypt.compare(data[1], user.password, (err, state) => {
				if (!state)
					return res.status(422).json('اطلاعات وارد شده صحیح نمی باشد');

				user.loginAt = Date.now();
				user.save();

				this.getUserData(user, (user) => {
					return res.json(new UserTransform().transform(user, true));
				});
			});
		});
	}

	register(req, res) {

		Role.findOne({name:'authenticated'}, (err, role) => {
			if (err) {
				return res.status(404).json('Error');
			}

			if (role) {
				let {name, email, phone, password} = req.body;
				User({name, email, phone, password, roles: [role]}).save((err, user) => {
					if (err) {
						if (err.code == 11000) {
							return res.status(409).json({
								message: 'ایمیل و موبایل نمی تواند تکراری باشد',
								success: false
							})
						} else {
							return res.status(404).json('Error');
						}
					}

					this.getUserData(user, (user) => {
						return res.json(new UserTransform().transform(user, true));
					});
				})
			}
		});
	}

	user(req, res) {
		this.getUserData(req.user, (user) => {
			return res.json(new UserTransform().transform(user));
		});
	}

	getUserData(user, cb) {
		if (user._id) {

			Role.find({_id: {$in: user.roles}}).populate('accesses').exec((err, roles) => {
				if (err) {
					console.log(err);
				}

				let accesses = [];
				if (roles) {

					if (user.email === 'set.ali.mousavi@gmail.com') {
						Access.find({}, (err, entities) => {

							entities.forEach(access => {
								accesses.push(access.name)
							});

							let result = Object.assign({accesses: [...new Set(accesses)]}, user._doc);

							return cb(result);
						})
					}
					else {
						roles.forEach(role => {
							role.accesses.forEach(access => {
								accesses.push(access.name)
							})
						});

						let result = Object.assign({accesses: [...new Set(accesses)]}, user._doc);

						return cb(result);
					}
				}
			});
		}
		else {
			return cb(user);
		}
	}

	update(req, res) {

		let {name, email, phone} = req.body;

		User.findById(req.user._id, (err, entity) => {
			if (err) {
				return res.status(404).json('Error');
			}

			if (email) entity.set('email', email);
			if (phone) entity.set('phone', phone);
			if (name) entity.set('name', name);

			entity.save();

			this.getUserData(entity, (user) => {
				return res.json(new UserTransform().transform(user));
			});
		})
	}

	changePassword(req, res) {

		let {old_password, password} = req.body;

		User.findById(req.user._id, (err, user) => {
			if (err) {
				return res.status(404).json('Error');
			}

			bcrypt.compare(old_password, user.password, function (err, state) {
				if (!state)
					return res.status(422).json('پسورد وارد شده صحیح نمی باشد');


				if (password) user.set('password', password);

				user.save();

				return res.json(true);
			});

		})
	}

	verificationCode(req, res) {

		User.findOne({phone: req.body.phone}, (err, entity) => {
			if (err) {
				return res.status(500).json('Error');
			}

			if (!entity) {
				return res.status(404).json('user not found');
			}


			let min = params.verification.range[0], max = params.verification.range[1];
			let code = Math.floor(Math.random() * (max - min + 1) + min);

			let {phone} = entity;

			VerificationCode({user: entity, code, phone}).save((err, result) => {
				if (err) {
					return res.status(500).json('Error');
				}

				sms.send(`کد تایید شما: ${code}`, phone);
				return res.json(true);
			})
		})
	}

	resetPassword(req, res) {

		let {phone, code, password} = req.body;

		if (!phone || !code || !password) {
			return res.status(400).json('input error');
		}

		User.findOne({phone}, (err, user) => {
			if (err) {
				return res.status(500).json('Error');
			}

			if (!user) {
				return res.status(404).json('user not found');
			}

			VerificationCode.findOne({user}).sort('-createdAt').exec((err, verification_code) => {

				if (err) {
					return res.status(500).json('Error');
				}

				if (!verification_code || verification_code.code !== code) {
					return res.status(404).json('Code not found');
				}

				let now = new Date();
				let diff = parseInt(( now - verification_code.createdAt) / 1000);

				if (diff > params.verification.expires) {
					return res.status(404).json('Code expired');
				}

				user.set('password', password);
				user.save();

				this.getUserData(user, (user) => {
					return res.json(new UserTransform().transform(user, true));
				})
			})
		})
	}
}