import mongo from 'mongoose'

const Chats  = require(`${config.path.model}/Chat`);
const Controller = require(`${config.path.controller}/Controller`);


module.exports = new class ChatController extends Controller{

	formSend2Client(req,res){
            
		new Chats({
          
			sender:         req.body.userId,
			chatroomId:     req.body.chatroomId,
			type:           'Form',
			mode:           'broadcast',
			text:           req.params.id,
         
		}).save((err,entity)=>{
             
			if(err){ res.status(500).json('Error') }
 
			req.app.get('socketio')
				.of('/'+ String(req.body.chatroomId) )
				.emit('messageclientform', { _id: 2, text: req.params.id,type:'Form', time: '19s ago ' })
 
			res.json('ok')
		})
	}
    
	formSend2Admin(req,res){
 
		new Chats({
			sender:         req.body.userId,
			chatroomId:     req.body.chatroomId,
			type:           'Form',
			mode:           'broadcast',
			text:           req.params.id,
			data:           req.body.data
		}).save((err,entity)=>{
             
			if(err){ res.status(404).json(err) }
 
			req.app.get('socketio')
				.of('/'+ String(req.body.chatroomId) )
				.emit('messageadminform', { _id: 1, data:req.body.data, text: req.params.id, type:'Form', time: '19s ago ' })
			res.json('ok')
 
		})
	}

	get(req,res){
		Chats.find({chatroomId:mongo.Types.ObjectId(req.params.chatroomId)})
			.then(r=>{
				res.json(r)
			})
			.catch(e=>res.status(404).json(e))
	}
    
	post(req,res){
        
		new Chats({
			sender:         req.body.sender,
			chatroomId:     req.body.chatroomId,
			type:           req.body.type,//Form, Message
			mode:           req.body.mode,//monocast , broadcast
			text:           req.body.text,
        
		}).save((err,entity)=>{
            
			if(err){
				res.status(500).json(err)
			}
                

			req.app.get('socketio')
				.of('/'+String(req.body.chatroomId))
				.emit('messageclient', req.body)

			res.json('ok')
		})

	}

}