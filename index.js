
const winston = require('winston')
require('winston-mongodb')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const socketIO = require('socket.io')
const http = require('http')

global.config = require('./app/config');
global.params = require('./app/params');



app.use('/public' , express.static('public'));

const {database, port, path} = config;
// winstone Logging...
winston.configure({
	transports: [
		new winston.transports.Console(),
		new (winston.transports.File)({ filename: 'winston.log' }),
		new (winston.transports.MongoDB)({ db:'mongodb://localhost/winston', useNewUrlParser: true  })
	]
});

process.on('unhandledRejection',ex=>{
	console.log('Warning Caugh ...')
	winston.error(ex.message,ex)
})
process.on('uncaughtException',ex=>{
	console.log('Exception Caugh ...')
	winston.error(ex.message,ex)
})

mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`,{ useNewUrlParser: true })
	.then((res)=>{
		console.warn('connected to mongo db successfull')
	}).catch(e=>console.log(e))

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

const router = require('./app/router');
const jwtAuth = require(`${path.middleware}/jwtAuth`);

app.use('/', jwtAuth, router);
app.use(require('./middlewares/error'))//register final error passed from middlewares

const server = http.createServer(app)

const io = socketIO(server,{
	origins: '*:*',
	transports: ['websocket'],
	upgrade:false,
	forceNew:true,
	
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionDelayMax : 5000,
	reconnectionAttempts: 50,
	pingInterval: 2000,
	pingTimeout: 5000})

app.set('socketio',io)

	const exprortServer=server.listen(port, () => {
	console.log(`Server running at port ${port} with Process::id  ${process.pid} + `)
}); 


module.exports=exprortServer;



