const app = require('./app');
const proxy = require(process.cwd()+'/modules/proxy');
const cache = require(process.cwd()+'/modules/cache');
const helmet = require('helmet');
app
  .use(helmet())
  .use('/items', cache(10), require('./controllers/items')(proxy.getHttpProxy()))
  .all('*', (req, res) => res.sendStatus(404))
  .listen(3000);
