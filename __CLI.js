#! /usr/bin/env node

//brefore exe sudo npm link +> acl (Pro only)
//npm run arash

const path = require('path')
const fs = require('fs');
const PermissionModel  = require('./src/models/Permission');
const colors=require('colors/safe')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhurrency', { useNewUrlParser: true })
	.then(()=>{
		console.warn('connected to mongo db successfull')
	}).catch(e=>console.log(e))

let AllArray=[]
let FindRegexp=[]
//let ourRegexp =/console.log\([^\)]*\)/igm
let ourRegexp =/acl\([\\",\\'].*[\\",\\']\)/igm
function searchRegexp(p){
	return new Promise((res,rej)=>{

		fs.readFile(p, 'utf8', function(err, data) {  
			if (err) throw err;
			let _find = data.match(ourRegexp)
			_find && res(_find)
			!_find && rej(null)
		})
	})
 
}

function readDirectory(p){return fs.readdirSync(path.resolve(p))}

function recursiveReadDirectory(p){
	if(fs.statSync(p).isDirectory() )
	{
		return fs.readdirSync(path.resolve(p)).map(folder=>recursiveReadDirectory(p+'/'+folder))
	}
	AllArray.push(p)
	return p
}

Promise.resolve().then(()=>readDirectory('.')
	.filter(folder=>!['node_modules','__tests__','.git','.bin'].includes(folder))
	.filter(folder=>fs.statSync(__dirname+'/'+folder).isDirectory())
	.forEach(folder => recursiveReadDirectory(__dirname+'/'+folder))
).then(async ()=>{
	for(  _file of AllArray)
	{
		await  searchRegexp( _file).then(r=>{
			FindRegexp=[...FindRegexp,...r]
		}).catch(e=>{})
	}
})
	.then(async ()=>{
		let SetList=new Set()
		FindRegexp=FindRegexp.map(str=>str.replace('"','\'').split('\'')[1])
		FindRegexp.map((item,ind)=>{
			ind%2?
				console.log(colors.bgCyan(ind,' - ',item))
				:
				console.log(colors.cyan(ind,' - ',item))
		})

		console.log(colors.green('Found All Matches ...',FindRegexp.length))
		FindRegexp.map(item=>SetList.add(item))
		console.log(colors.yellow('After Delete Duplicates ...',SetList.size))
		console.log(colors.red('Inserting in Permission DB...'))
		await PermissionModel.remove({}).then(async ()=>{
			await PermissionModel.insertMany(
				[...SetList].map(st=>({'title':st,'name':st}))
			)
		})
    
	}).then(()=>{
		console.log(colors.green('Finishing in Permission DB...'))
		//process.exit(1)

	})
