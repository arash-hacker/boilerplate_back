const Controller  = require(`${config.path.controller}/Controller`);


const FormItems   = require(`${config.path.model}/FormItem`)
const Forms       = require(`${config.path.model}/Form`)
const Chats       = require(`${config.path.model}/Chat`)
const Products    = require(`${config.path.model}/Product`)

module.exports = new class FormItemController extends Controller {

	index(req, res) {
		FormItems
			.find({})
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e))
	}

	post(req, res) {

		new FormItems({
			itemType:req.body.itemType,
			placeholder:req.body.placeholder,
			value:req.body.value || "",
			title:req.body.title,
		})
			.save()
			.then(r=>res.json(r),e=>res.status(404).json(e))
	}
 
 
}