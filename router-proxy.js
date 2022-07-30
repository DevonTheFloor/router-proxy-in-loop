const express = require('express'),
  routeur = express(),
  helmet = require('helmet'),
  httpProxy = require('http-proxy'),
  proxy = httpProxy.createProxyServer(),
  vhost = require('vhost');

routeur.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('X-Frame-Options',' SAMEORIGIN');
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

routeur.disable('x-powered-by');

const piece = express();
piece.use('/', express.static(process.env.PNR_PATH_UI));

const anp = express();
anp.use(express.static(process.env.ANP_PATH_UI));

routeur.use(vhost(process.env.PNR_DOMAIN, piece));
routeur.use('/engin',(req, res, next)=>{
  proxy.web(req, res, {
    target: process.env.PNR_API_HOST, 
    changeOrigin: true,
    pathRewrite: {
      '^/engin': '/', // rewrite path
    }
  });
})

routeur.use(vhost(process.env.ANP_DOMAIN, anp));
routeur.use('/myapis',(req, res, next)=>{
  proxy.web(req, res, {
    target: process.env.ANP_API_HOST, 
    changeOrigin: false,
    /*pathRewrite: {
      '^/anp-api': '/', // rewrite path
    }*/
  });
})

routeur.use('/rssflow',(req, res, next)=>{
    proxy.web(req, res, {
      target: process.env.RSS_HOST, 
      changeOrigin: true,
      pathRewrite: {
        '^/rssflow': '/', // rewrite path
      }
    });
  })

module.exports = routeur;
