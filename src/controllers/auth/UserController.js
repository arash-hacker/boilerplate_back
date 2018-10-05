const Controller = require('../Controller');
const UserTransform = require(`${config.path.transform}/UserTransform`);
const User = require(`${config.path.model}/User`);
const Role = require(`${config.path.model}/Role`);
const {parameters} = require(`${config.path.lib}/pgq`);

module.exports = new class UserController extends Controller {
	index(req, res) {

		let {query, options} = parameters(req);

		User.paginate(query, options, (err, entities) => {
			if (err)
				return res.status(404).json('Error');

			if (entities) {
				// return res.json(entities);
				return res.json(new UserTransform().withPaginate().transformCollection(entities));
			}
		});
	}

	get(req, res) {
		User.findById(req.params._id, (err, entity) => {
			if (err)
				return res.status(404).json('Error');

			if (entity) {
				return res.json(entity);
			}
		});
	}

	create(req, res) {

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

					return res.json(new UserTransform().transform(user));
				})
			}

		})

	}

	update(req, res) {

		let {name, email, phone, status, roles, password, _id} = req.body;

		User.findById(_id, (err, entity) => {
			if (err) {
				return res.status(404).json('Error');
			}

			entity.set('name', name);
			entity.set('email', email);
			entity.set('phone', phone);
			entity.set('status', status);
			entity.set('roles', roles);

			if (password) entity.set('password', password);

			entity.save();
			return res.json(entity);
		})
	}

	delete(req, res) {
		let ids = req.body.ids;

		ids.map(id => {User.findByIdAndRemove(id, () => {})})

		return res.json('Delete Success');
	}
}