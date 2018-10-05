import mongo from 'mongoose'
const Controller  = require(`${config.path.controller}/Controller`);
const Products    = require(`${config.path.model}/Product`)
const {createTags} = require(`${config.path.controller}/content/TagController`);
const {parameters} = require(`${config.path.lib}/pgq`);

module.exports = new class Product extends Controller {

	index(req, res) {
		let {query, options} = parameters(req);
		Products
			.find({})
			.populate('image')
			.populate('tags')
			.sort( options.sort || {_id:1})
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e))
	}

	get(req, res) {
		Products
			.findOne({_id:mongo.Types.ObjectId(req.params.id)})
			.populate('image')
			.populate('tags')
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e))
	}
	put(req, res) {
		createTags(req.body.tags).then((tags) => {
			Products
			.findOneAndUpdate({_id:mongo.Types.ObjectId(req.params.id)},{...req.body,tags})
			.then(r=>res.json(r))
			.catch(e=>{
				res.status(404).json(e)})
        })
		
	}
   

	create(req,res){
		
        createTags(req.body.tags).then((tags) => {

            new Products({...req.body,tags}).save((err, entity) => {
                if (err) {
                    return res.status(404).json('Error');
                }

                return res.json(entity);
            });
        })
		
	}
}