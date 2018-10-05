const Controller = require(`${config.path.controller}/Controller`);
const File = require(`${config.path.model}/File`);

module.exports = new class FileController extends Controller {
	index(req, res) {

		File.find({}).sort('-timestamp').exec((err, entities) => {
			if (err)
				return res.status(404).json('Error');

			if (entities) {
				return res.json(entities);
			}
		});
	}

	create(req, res) {
		const {file} = req;

		File({
			name: file.originalname,
			path: file.path,
			mimeType: file.mimetype,
			size: file.size,
			// user: req.user,
		}).save((err, entity) => {
			if (err) {
				throw err
			}

			return res.json(entity._id);
		})
	}
}