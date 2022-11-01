<<<<<<< HEAD
=======
const { Router } = require('express');

>>>>>>> prod
const express = require('express'),
  routeur = express(),
  helmet = require('helmet'),
  httpProxy = require('http-proxy'),
  proxy = httpProxy.createProxyServer(),
<<<<<<< HEAD
  vhost = require('vhost');

routeur.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' );
=======
  config = require('../router-config/config'),
  configUi = config.configUi,
  configApi = config.configApi,
  vhost = require('vhost'),
  rendertron = require('rendertron-middleware'),
  listBot = rendertron.botUserAgents,
  BOTS = listBot.concat('Discordbot'),
  MARK_BOT= '+http://',
  BOTS_LIST = new RegExp(BOTS.join('|'),'i');

routeur.use((req, res, next) => {
>>>>>>> prod
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('X-Frame-Options',' SAMEORIGIN');
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

routeur.disable('x-powered-by');

<<<<<<< HEAD
const piece = express();
piece.use('/', express.static(process.env.PNR_PATH_UI));

const anp = express();
anp.use(express.static(preocess.env.ANP_PATH_UI));

routeur.use(vhost(process.env.PNR_DOMAIN, piece));
routeur.use(PNR_API_PATH,(req, res, next)=>{
=======
configUi.forEach(ui =>{ 
  const site = express(); 
  routeur.use(rendertron.makeMiddleware(
    {
      proxyUrl: ui.render+'/render',
      userAgentPattern: BOTS_LIST,
      injectShadyDom: true,
      timeout: 11000
    }
  ));

  site.use('/', express.static(ui.path));
  routeur.use(vhost(ui.domain, site));

})

configApi.forEach(api => {
  routeur.use(api.path,(req, res, next)=>{
    const pathRewrite = '^'+api.path;
    proxy.web(req, res, {
      target: api.target, 
      changeOrigin: true,
      pathRewrite: {
        pathRewritedd: '/', // rewrite path
      }
    });
  })
})

routeur.use('/myapis',(req, res, next)=>{
>>>>>>> prod
  proxy.web(req, res, {
    target: process.env.ANP_API_HOST, 
    changeOrigin: true,
    pathRewrite: {
      '^/myapis': '/', // rewrite path
    }
  });
})

<<<<<<< HEAD
routeur.use(vhost(preocess.env.ANP_DOMAIN, anp));
routeur.use(ANP_API_PATH,(req, res, next)=>{
  proxy.web(req, res, {
    target: process.env.ANP_API_HOST, 
    changeOrigin: true,
    pathRewrite: {
      '^/engin': '/', // rewrite path
    }
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
=======
>>>>>>> prod

module.exports = routeur;
