const Controller  = require(`${config.path.controller}/Controller`);
const RecentlyChatroom = require(`${config.path.model}/RecentlyChatroom`)
const Chatroom = require(`${config.path.model}/Chatroom`)
const States = require(`${config.path.model}/States`)
import mongo from 'mongoose'

module.exports = new class RecentlyChatroomController extends  Controller{


	index(req, res) {
		Chatroom
			.find({users:{$in:[mongo.Types.ObjectId(req.body.userId)]}},{_id:1})
			.then(chatroomsInclduesUser=>{

				if(chatroomsInclduesUser.length>0){
					RecentlyChatroom
						.find({chatroomId:{$in:chatroomsInclduesUser.map(item=>mongo.Types.ObjectId(item._id))}})
						.then(r=>res.json(r))
						.catch(e=>res.status(404).json(e))
				}
				else{
					return res.json([])
				}  

			})
			.catch(e=>res.status(404).json(e))

}

	async put(req,res){
		let {chatroomId,title,description,status}=req.body;
		try {
			let chtrm=await Chatroom.findOne({_id:mongo.Types.ObjectId(req.body.chatroomId)})
			if(!chtrm)
				return res.status(404).json('Error Not Found Chatroom')

			let nextPureStateName=Object.keys(chtrm.statusHash).find(item=>chtrm.statusHash[item]==status)
			let foundState =await States.findOne({state_en:nextPureStateName})
			if(foundState.autoTransaction)
				nextPureStateName=foundState.state_next[0]

			await RecentlyChatroom
				.update({chatroomId},{chatroomId,title,description:description+` ::  ${nextPureStateName}`},{upsert:true})
				 res.json('ok')
			} catch (e) {
				return res.status(500).json(e)
			}
	}
	 _put(req, res) {

		RecentlyChatroom
			.update({chatroomId:req.body.chatroomId},req.body,{upsert:true})
			.then(r=>res.json(r))
			.catch(e=>res.status(404).json(e))
	 }
  
}