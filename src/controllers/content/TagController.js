const mongoose = require('mongoose');
const Controller = require('../Controller');
const Entity = require(`${config.path.model}/Tag`);
const {parameters} = require(`${config.path.lib}/pgq`);

module.exports = new class TagController extends Controller {


	constructor() {
		super();

		this.createTags = this.createTags.bind(this);
		this.createTag = this.createTag.bind(this);
	}

	index(req, res) {

		let {query, options} = parameters(req);

		Entity.paginate(query, options, (err, entities) => {
			if (err)
				return res.status(404).json('Error');

			if (entities) {
				return res.json(entities);
			}
		});
	}

	get(req, res) {

		Entity.findById(req.params._id).populate('image').exec((err, entity) => {
			if (err)
				return res.status(404).json('Error');

			if (entity) {
				return res.json(entity);
			}
		});
	}

	create(req, res) {

		let {title, text} = req.body, user = req.user._id;

		Entity({title, text, user}).save((err, entity) => {
			if (err) {
				return res.status(404).json('Error');
			}

			return res.json(entity);
		})
	}

	update(req, res) {

		let {_id, title, text} = req.body;

		Entity.findOneAndUpdate({_id}, {title, text}, {new: true}, (err, entity) => {

			if (err) {
				return res.status(404).json('Error');
			}

			return res.json(entity);
		});
	}

	delete(req, res) {
		let ids = req.body.ids;

		ids.forEach(id => {Entity.findByIdAndRemove(id, () => {})});

		return res.json('Delete Success');
	}

	async createTag(tag) {
		const Tag = new Entity({title: tag});

		let newTag = await Tag.save().catch(async(err) => {
			if (err.name === 'MongoError' && err.code === 11000) {
				let existTag = await Entity.findOne({title: tag});
				return existTag;
			}
		});

		return newTag;
	}

	async createTags(tags) {

		let result = [];

		for (let i in tags) {
			let tag = tags[i];

			if (mongoose.Types.ObjectId.isValid(tag)) {
				result.push(tag);
			}
			else {
				let newTag = await this.createTag(tag);
				result.push(newTag._id);
			}
		}

		return result;
	}
}