const https = require('follow-redirects').https;
const http = require('http');
var httpProxy;

module.exports = {
    getHttpProxy: function() {
        if (httpProxy) {
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
};
