import mongo from 'mongoose'

const Chatrooms = require(`${config.path.model}/Chatroom`);
const Controller = require(`${config.path.controller}/Controller`);
const Chats = require(`${config.path.model}/Chat`);
const Product = require(`${config.path.model}/Product`);
const States = require(`${config.path.model}/States`)
const bcrypt = require('bcrypt')
const _ = require('lodash');
const {parameters} = require(`${config.path.lib}/pgq`);

module.exports = new class ChatRoomController extends Controller {


	createNewNameSpace(req,oi){

		if (req.app.get('socketio').nsps['/' + String(oi)] != undefined)	return;

		const nsp1 = req.app.get('socketio').of('/' + String(oi))
		nsp1.on('connection', socket => {
			
			socket.on('connect', () => {})
			socket.on('reconnect', () => {})
			socket.on('reconnect_attempt', () => {})
			socket.on('reconnecting', () => {})
			socket.on('reconnect_error', () => {})
			socket.on('reconnect_failed', () => {})
			socket.on('disconnect', () => {})
			socket.on('error', function(ne) {});
		})   
	}
	index(req, res) {
		Chatrooms.findOne({
				_id: mongo.Types.ObjectId(req.params._id)
			})
			.then(r => res.json(
				Object.assign({},
					_.omit(r, 'statusHash'),
					...Object.entries(r.statusHash)
					.filter(item => item[0] !== '$init')
					.map((item, i) => {
						return ({
							[item[0]]: item[1]
						})
					})
				)
			))
			.catch(e => {
				res.status(500).json(e)
			})
	}
	getStatusByName(req, res) {
		Chatrooms.findOne({
				_id: mongo.Types.ObjectId(req.params._id)
			})
			.then(r => res.json(Object.keys(r.statusHash).find(item => r.statusHash[item] == r.status)))
			.catch(e => {
				res.status(500).json(e)
			})
	}
	get(req, res) {
		Chatrooms.findOne({
				_id: mongo.Types.ObjectId(req.params._id)
			})
			.then(r => {

				States.findOne({
						state_en: Object.keys(r.statusHash).find(item => r.statusHash[item] == r.status)
					}).then(s => {

						if (s && s.state_next.length > 0) {
							res.json(s.state_next.map(item => ({
								[item]: r.statusHash[item]
							})))
						} else
							res.json([])

					})
					.catch(e => {
						res.status(500).json(e)
					})


			})
			.catch(e => {
				res.status(500).json(e)
			})
	}

	put(req, res) {

		//update state chatroom

		const localTime = new Date().toLocaleTimeString() + new Date().toLocaleDateString()

		Chatrooms.findOne({
				_id: mongo.Types.ObjectId(req.body._id)
			}).then(chtrm => {

				let stateHashes = {
					"statusHash.initial": bcrypt.hashSync("initial" + localTime, 10),
					"statusHash.inprogress": bcrypt.hashSync("inprogress" + localTime, 10),
					"statusHash.paid": bcrypt.hashSync("paid" + localTime, 10),
					"statusHash.withdrawn": bcrypt.hashSync("withdrawn" + localTime, 10),
					"statusHash.stopped": bcrypt.hashSync("stopped" + localTime, 10),
					"statusHash.completed": bcrypt.hashSync("completed" + localTime, 10),
					"statusHash.checked": bcrypt.hashSync("checked" + localTime, 10),
					"statusHash.todo": bcrypt.hashSync("todo" + localTime, 10),
					"statusHash.terminated": bcrypt.hashSync("terminated" + localTime, 10),
				}


				let decryptedStateName = Object.keys(chtrm.statusHash).find(item => chtrm.statusHash[item] == req.body.status)

				States.findOne({
					state_en: decryptedStateName
				}).then(foundState => {

					if (foundState.autoTransaction)
						decryptedStateName = foundState.state_next[0]

					Chatrooms.update({
						_id: mongo.Types.ObjectId(req.body._id)
					}, {
						$set: {
							status: stateHashes["statusHash." + decryptedStateName],
							...stateHashes
						}
					}).then(r => {
						req.app.get('socketio').of(req.body._id).emit('changestate', decryptedStateName)
						res.json('ok')
					})

				})
			})
			.catch(e => {
				res.status(500).json(e)

			})


	}

	async patch(req, res) {


		const oi = new mongo.Types.ObjectId()


		if (!req.params.chatroomId) {

			// create new Chatroom ID

			const localTime = new Date().toLocaleTimeString() + new Date().toLocaleDateString()

			try {

				const inprogress = bcrypt.hashSync("inprogress" + localTime, 10);
				const _cr = new Chatrooms({
					_id: oi,
					users: [req.body.userid],
					status: inprogress,
					productId: req.body.productId,
					statusHash: {
						initial: bcrypt.hashSync("initial" + localTime, 10),
						inprogress: inprogress,
						paid: bcrypt.hashSync("paid" + localTime, 10),
						withdrawn: bcrypt.hashSync("withdrawn" + localTime, 10),
						stopped: bcrypt.hashSync("stopped" + localTime, 10),
						completed: bcrypt.hashSync("completed" + localTime, 10),
						checked: bcrypt.hashSync("checked" + localTime, 10),
						todo: bcrypt.hashSync("todo" + localTime, 10),
						terminated: bcrypt.hashSync("terminated" + localTime, 10),
					}

				})

				if (_cr.validateSync())
					return res.status(500).json('Error')

				let _chatroom = await _cr.save()

				let {
					baseFormId: formId
				} = await Product.findOne({
					_id: req.body.productId
				}, {
					_id: 1,
					baseFormId: 1
				})

				const c = new Chats({

					sender: req.body.userId,
					chatroomId: _chatroom._id, //new chatroomId
					type: 'Form',
					mode: 'broadcast',
					text: formId,
				})

				if (c.validateSync())
					return res.status(400).json('Error')
				let _c = await c.save()
				
				
				this.createNewNameSpace(req,oi)

				return res.json(oi)
			} catch (error) {
				res.status(500).json("Error")
			}
		} else {
				
				this.createNewNameSpace(req,String(req.params.chatroomId))	
				return res.status(201).json('ok')
		}
	}

	allUserChatrooms(req, res) {
		let {options} = parameters(req);

		Chatrooms.find({
				users: {
					$in: [mongo.Types.ObjectId(req.params.userid)]
				}
			}, {
				statusHash: 0
			})
			.sort( options.sort || {_id:1})
			.populate('productId')
			.populate('users')
			.then((r) => res.json(r))
			.catch(e => res.status(404).json(e)) 
	}

}