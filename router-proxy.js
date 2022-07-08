const express = require('express');
const routeur = express();
const helmet = require('helmet');
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const vhost = require('vhost');

routeur.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.DOMAIN_NAME );
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('X-Frame-Options',' SAMEORIGIN');
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

routeur.disable('x-powered-by');

routeur.use('/', express.static(process.env.PNR_PATH_UI));
routeur.use(process.env.PNR_API_PATH,(req, res, next)=>{
  proxy.web(req, res, {
    target: process.env.PNR_API_HOST, 
    changeOrigin: true,
    pathRewrite: {
      '^/engin': '/', // rewrite path
    }
  });
})

routeur.use(process.env.RSS_PATH,(req, res, next)=>{
    proxy.web(req, res, {
      target: process.env.RSS_HOST, 
      changeOrigin: true,
      pathRewrite: {
        '^/rssflow': '/', // rewrite path
      }
    });
  })

routeur.use(vhost('SECOND_SITE', function handle (req, res, next) {
  // for match of "foo.bar.example.com:8080" against "*.*.example.com":
  console.dir(req.vhost.host) // => 'foo.bar.example.com:8080'
  console.dir(req.vhost.hostname) // => 'foo.bar.example.com'
  console.dir(req.vhost.length) // => 2
  res.status(200).json({message: "Mais non!!!"});
}))

module.exports = routeur;
