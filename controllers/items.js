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
function getHttpProxy(){
	if(httpProxy){
		return httpProxy;
	}
	httpProxy = {
		getHttps : function(url, callback) {
            let data = "";

            var request = https.get(url, function(response) {
                response.on('data', function(chunk) {
                    data += chunk;
                });
                response.on('end', function() {
                    callback(null, data);
                });
			});

            request.on('error', function(error) {
                callback(error);
            });
        },
        getHttp : function(url, callback) {
            let data = "";

            var request = http.get(url, function(response) {
                response.on('data', function(chunk) {
                    data += chunk;
                });
                response.on('end', function() {
                    callback(null, data);
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
	    		JSON.parse(resp).forEach((element)=>{
			  		result.push({"id": element._id, "name":element.name});
			  	})
			  	callback(null, null);
	    	});
	    	
	        
	    },
	    function(callback) {
	    	proxy.getHttps('https://pokeapi.co/api/v2/pokemon/', (err, resp) =>{
	    		if(err) return callback(err);
	    		JSON.parse(resp).results.forEach((element) =>{
	    			result.push({"id": url.parse(element.url).pathname.split("/")[4], "name": element.name});
	    		})
	    		callback(null, null);
	    	});
	        
	    },
	    function(callback){
	    	proxy.getHttp('http://ergast.com/api/f1/drivers?limit=847', (err, resp) =>{
	    		if(err) return callback(err);
	    		parseString(resp, function(err, res){
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
    res.sendStatus(200);
  });
