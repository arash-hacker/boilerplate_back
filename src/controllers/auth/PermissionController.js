const Controller = require(`${config.path.controller}/Controller`);
const Permission = require(`${config.path.model}/Permission`);

module.exports = new class PermissionController extends Controller {
	index(req, res) {
		Permission.find({}, (err, entities) => {
			if (err)
				return res.status(404).json('Error');

			if (entities) {
				return res.json(entities);
			}
		});
	}

	create(req, res) {
		let fields = {
			title: req.body.title,
			name: req.body.name,
		};

		if (req.user._id) {
			fields['user'] = req.user;
		}

		Permission(fields).save((err, entity) => {
			if (err) {
				if (err.code == 11000) {
					return res.status(409).json('Duplicated')
				} else {
					return res.status(404).json('Error');
				}
			}

			return res.json(entity);
		})
	}

	update(req, res) {

		let params = req.body;

		Permission.findByIdAndUpdate(req.body._id, params, {new: true}, (err, entity) => {
			if (err) {
				return res.status(404).json('Error');
			}

			return res.json(entity);
		})
	}

	delete(req, res) {
		let ids = req.body.ids;

		ids.map(id => {Permission.findByIdAndRemove(id, () => {})})

		return res.json('Delete Success');
	}
}