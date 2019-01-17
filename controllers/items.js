const { Router } = require('express');
const async = require('async');
const https = require('https');
const http = require('http');
const url = require('url');
const parseString = require('xml2js').parseString;
var httpProxy;

//http://www.clashapi.xyz/api/cards/{id}
//https://pokeapi.co/api/v2/pokemon/{id}
//http://ergast.com/api/f1/drivers/{id}
function isNumeric(num){
  return !isNaN(num)
}

function getHttpProxy(){
	if(httpProxy){
		return httpProxy;
	}
	httpProxy = {
		getHttps : function(url, callback) {
            let data = "";

            var request = https.get(url, function(response) {
            	let statusCode= response.statusCode
                response.on('data', function(chunk) {
                    data += chunk;
                });
                response.on('end', function() {
                    callback(null, {status: statusCode, data:data});
                });
			});

            request.on('error', function(error) {
                callback(error);
            });
        },
        getHttp : function(url, callback) {
            let data = "";

            var request = http.get(url, function(response) {
            	let statusCode= response.statusCode
                response.on('data', function(chunk) {
                    data += chunk;
                });
                response.on('end', function() {
                    callback(null, {status: statusCode, data:data});
                });
			});

            request.on('error', function(error) {
                callback(error);
            });
         }
	}
	return httpProxy;
}

module.exports = new Router()
  .get('/', (req, res) => {
  	var proxy = getHttpProxy();
  	let result =[]
    async.parallel([
	    function(callback) {
	    	proxy.getHttp('http://www.clashapi.xyz/api/cards', (err, resp) =>{
	    		if(err) return callback(err);
	    		JSON.parse(resp.data).forEach((element)=>{
			  		result.push({"id": element._id, "name":element.name});
			  	})
			  	callback(null, null);
	    	});
	    	
	        
	    },
	    function(callback) {
	    	proxy.getHttps('https://pokeapi.co/api/v2/pokemon/', (err, resp) =>{
	    		if(err) return callback(err);
	    		JSON.parse(resp.data).results.forEach((element) =>{
	    			result.push({"id": url.parse(element.url).pathname.split("/")[4], "name": element.name});
	    		})
	    		callback(null, null);
	    	});
	        
	    },
	    function(callback){
	    	proxy.getHttp('http://ergast.com/api/f1/drivers?limit=847', (err, resp) =>{
	    		if(err) return callback(err);
	    		parseString(resp.data, function(err, res){
	    			if(err) return callback(err);
	    			res.MRData.DriverTable[0].Driver.forEach((element) =>{
	    				result.push({"id":element.$.driverId, "name":element.GivenName[0]});
	    			})
	    			callback(null, null);
	    		})
	    		
	    	})
	    }
	],
	function(err, results) {
		res.status(200).send(result);
	});
    
  })
  .get('/:id', (req, res) => {
    // Code here
    const proxy = getHttpProxy();
    const hasNumber = /\d/;
   
    if(isNumeric(req.params.id)){
		proxy.getHttps('https://pokeapi.co/api/v2/pokemon/'+req.params.id, (err, resp) =>{
			if(err) return res.status(500).send(err);
			if(resp.status != 200) return res.status(resp.status).send(err);
			let result = JSON.parse(resp.data);
			return res.status(200).send({"id":result.id, "name":result.name, "image": result.sprites.front_default});
			   
		});
    }
    else if (hasNumber.test(req.params.id)){
    	proxy.getHttp('http://www.clashapi.xyz/api/cards/'+req.params.id, (err, resp) =>{
			if(err) return res.status(500).send(err);
			if(resp.status != 200) return res.status(resp.status).send(err);
			let result = JSON.parse(resp.data);
			return res.status(200).send({"id":result._id, "image":"/images/cards/"+result.idName+".png", "name":result.name});
			   
		});
    }
    else{
    	proxy.getHttp('http://ergast.com/api/f1/drivers/'+req.params.id, (err, resp) =>{
			if(err) return res.status(500).send({err:err, resp:resp});
	    	parseString(resp.data, function(err, result){
	    		if(result.MRData.$.total == 0) return res.status(404).send(result);
	    		return res.status(200).send({"id":result.MRData.DriverTable[0].$.driverId, 
	    			"name":result.MRData.DriverTable[0].Driver[0].GivenName[0],
	    		    "image":result.MRData.DriverTable[0].Driver[0].$.url});

	    	})
			   
		});
    }
    
  });
