const { Router } = require('express');
const async = require('async');
const pokeapi = require('./pokeapi');
const clashapi = require('./clashapi');
const ergastapi = require('./ergastapi');


function isNumeric(num){
  return !isNaN(num)
}

const router = new Router()
module.exports = function(proxy){
	router.use(function timeLog (req, res, next) {
	  console.log('Time: ', Date.now())
	  next()
	})
	router.get('/', (req, res) =>{
		async.parallel([
			pokeapi.getAll(proxy), 
			clashapi.getAll(proxy),
			ergastapi.getAll(proxy)], function(err, result){
				if(err) return res.status(500).send(err);
				res.status(200).send(result[0].concat(result[1]).concat(result[2])); 
			})
		
	})
	.get('/:id', (req, res) => {
    const hasNumber = /\d/;
   
    if(isNumeric(req.params.id)){
    	pokeapi.get(proxy, req.params.id, (err, resp) =>{
    		if(err) return res.status(500).send(err);
    		return res.status(resp.status).send(resp.body);
    	})
    }
    else if (hasNumber.test(req.params.id)){
    	clashapi.get(proxy, req.params.id, (err, resp) =>{
    		if(err) return res.status(500).send(err);
    		return res.status(resp.status).send(resp.body);
    	})
    }
    else{

    	ergastapi.get(proxy, req.params.id, (err, resp) =>{
    		if(err) return res.status(500).send(err);
    		return res.status(resp.status).send(resp.body);
    	})
    }
    
  });

  return router;
}
