var exports = module.exports = {}
exports.getAll = function(proxy){
	return function(done){
		proxy.getHttp('http://www.clashapi.xyz/api/cards', (err, resp) =>{
			let result = [];
		    if(err) return done(err);
		    JSON.parse(resp.data).forEach((element)=>{
				result.push({"id": element._id, "name":element.name});
			})
			return done(null, result);
		});
	}
	
	        
}

exports.get = function(proxy, id, callback){
	proxy.getHttp('http://www.clashapi.xyz/api/cards/'+id, (err, resp) =>{
		if(err) return callback(err);
		if(resp.status != 200) return callback(null, {status:resp.status, body: err});
		let result = JSON.parse(resp.data);
		return callback(null, {status:resp.status, body:{
			"id":result._id, 
			"image":"/images/cards/"+result.idName+".png", 
			"name":result.name}});			   
	});
}