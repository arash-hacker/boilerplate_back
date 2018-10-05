module.exports = new class ChatRoomController extends Controller {

    index(req,res){
        res.json({
            
        users:     
            Object.keys(req.app.get('socketio').sockets.adapter.rooms),
        nsps: 
            Object.keys(req.app.get('socketio').nsps), //['/','/435678','/456789']
        user2Nsps:
            Object
            .keys(req.app.get('socketio').nsps)
            .map(item => Object.keys(req.app.get('socketio').nsps[item].adapter.rooms))
        })
        
    }
    get(req,res){
        
        if( req.app.get('socketio').nsps['/' + String(req.params.chatroomId)]){

            res.json(
                Object.keys(
                req.app.get('socketio').nsps['/' + String(req.params.chatroomId)].sockets
                )
                .map(item=>req.app.get('socketio').nsps['/' + String(req.params.chatroomId)].sockets[item].id))
        }			
        else
        {
            res.json([])
        }		
    }


}

 