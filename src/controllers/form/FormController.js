const Controller  = require(`${config.path.controller}/Controller`);
const Forms       = require(`${config.path.model}/Form`)

module.exports = new class FormController extends Controller {

	index(req,res){
		Forms
			.findById({_id:req.params.id})
			.populate('formItems')
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e)) 
	}

	get(req,res){
		Forms
			.find({})
			.populate('formItems')
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e)) 
	}
	put(req,res){
		Forms
			.findByIdAndUpdate(req.params.id,{$set:{header:req.body.header,formItems:[...req.body.formItems]}})
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e)) 
	}
 
	post(req,res){
		new Forms({
			header:req.body.header,
			formItems:[...req.body.formItems]  
		}).save((e,p)=>{
			if(e) res.status(404).json(e)
			res.json({msg:'ok'})

		})
	}

 

  
}