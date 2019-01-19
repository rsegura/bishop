/**
 * Module dependencies.
 */
var http = require('http');
var fs = require('fs');

var expressServer = require('./expressServer');


var Workers = function(){
	this.config = {};
	var app = new expressServer();
	this.serverhttp = http.createServer(app.expressServer);
};

Workers.prototype.run = function(){
	var self = this;
	self.serverhttp.listen(3000, function(){
		console.log("Rest Server started at port: 3000");
	});
};

if(module.parent){
	module.exports = Workers;
} else {
	new Workers();
	console.log('debugger');
}
