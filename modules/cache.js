const cache = require('memory-cache');


let memCache = new cache.Cache();
module.exports = (duration) => {
        return (req, res, next) => {
            let key =  '__express__' + req.originalUrl || req.url
            let cacheContent = memCache.get(key);
            if(cacheContent){
                res.status(cacheContent.status).send( JSON.parse(cacheContent.body) );
                return
            }else{
                res.sendResponse = res.send
                res.send = (body) => {
                    memCache.put(key, {status:res.statusCode, body:body},duration*1000);
                    res.sendResponse(body)
                }
                next()
            }
   }
}