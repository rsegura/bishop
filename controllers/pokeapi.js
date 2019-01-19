const url = require('url');
var exports = module.exports = {}
exports.getAll = function(proxy){
	return function(done){
		proxy.getHttps('https://pokeapi.co/api/v2/pokemon?limit=10000', (err, resp) =>{
			let result = [];
		    if(err) return done(err);
		    JSON.parse(resp.data).results.forEach((element) =>{
		    	result.push({"id": url.parse(element.url).pathname.split("/")[4], "name": element.name});
		    })
		    return done(null, result);
		});
	}
	
	        
}

exports.get = function(proxy, id, callback){
	proxy.getHttps('https://pokeapi.co/api/v2/pokemon/'+id, (err, resp) =>{
			if(err) return callback(err);
			if(resp.status != 200) return callback(null, {status:resp.status, body: err});
			let result = JSON.parse(resp.data);
			return callback(null, {status: resp.status, body:{
				"id":result.id, 
				"name":result.name, 
				"image": result.sprites.front_default}});
			   
		});
}