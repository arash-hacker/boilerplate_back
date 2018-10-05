const  mongoo=require('mongoose');
/* 
initial//1

inprogress//2

paid//3     
checked//3    
stopped//3    

withdrawn//4  
todo//4
			  
completed//5  
terminated//5 

*/

module.exports= mongoo.model('State',mongoo.Schema({

	state_en:String,
	state_fa:String,
	state_prev :[String],
	state_next :[String],
	autoTransaction:{
		type:Boolean,
		default:false,
	},
	confirm: mongoo.Schema.Types.Mixed,//{color:'green',}
	cancel:  mongoo.Schema.Types.Mixed,//{color:'red',text:'cancel',}

},{timestamps: true}))