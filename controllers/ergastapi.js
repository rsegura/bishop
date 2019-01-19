
const parseString = require('xml2js').parseString;

var exports = module.exports = {}


exports.getAll = function(proxy){
	return function(done){
		proxy.getHttp('http://ergast.com/api/f1/drivers?limit=847', (err, resp) =>{
			let result = [];
			if(err) return done(err);
			parseString(resp.data, function(err, res){
				if(err) return done(err);
				res.MRData.DriverTable[0].Driver.forEach((element) =>{
					result.push({"id":element.$.driverId, "name":element.GivenName[0]});
				})
				done(null, result);
			})
			
		})
	}
	        
}

exports.get = function(proxy, id, callback){
	proxy.getHttp('http://ergast.com/api/f1/drivers/'+id, (err, resp) =>{
		if(err) return callback(err);
    	parseString(resp.data, function(err, result){
    		if(result.MRData.$.total == 0) return callback(null, {status:404, body: result});
    		return callback(null, {status:200, body:{
    			"id":result.MRData.DriverTable[0].$.driverId, 
    			"name":result.MRData.DriverTable[0].Driver[0].GivenName[0],
    		    "image":result.MRData.DriverTable[0].Driver[0].$.url}})
    	})
		   
	});
}