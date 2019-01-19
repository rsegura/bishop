const express = require('express');
const helmet = require('helmet');
const proxy = require(process.cwd()+'/modules/proxy');
const cache = require(process.cwd()+'/modules/cache');


var expressServer = function(){
	this.expressServer = express();
	this.expressServer.use(helmet());
	this.expressServer.use('/items', cache(10), require('./controllers/items')(proxy.getHttpProxy()))
  	this.expressServer.all('*', (req, res) => res.sendStatus(404))
}

module.exports = expressServer;
