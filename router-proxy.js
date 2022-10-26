const { Router } = require('express');

const express = require('express'),
  routeur = express(),
  helmet = require('helmet'),
  httpProxy = require('http-proxy'),
  proxy = httpProxy.createProxyServer(),
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
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('X-Frame-Options',' SAMEORIGIN');
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

routeur.disable('x-powered-by');


/*configUi.forEach(ui =>{

  const site = express();
  site.use('/', express.static(ui.path));
  routeur.use(vhost(ui.domain, site));
})
*/
configUi.forEach(ui =>{
  const site = express();
  routeur.use((req, res, next)=> {
    const botUserAgents = ['baiduspider','bingbot','embedly','facebookexternalhit','linkedinbot','outbrain','pinterest','quora link preview','rogerbot','showyoubot','slackbot','TelegramBot','twitterbot','vkShare','W3C_Validator','whatsapp','Discordbot' ]
   
   let ua = req.headers['user-agent'],
     botlist = new RegExp(botUserAgents.join('|'), 'i'),
     itis = botlist.test(ua);
     if( itis = true) {
       proxy.web(req, res, {
         target: ui.render, 
         changeOrigin: false,
         pathRewrite: {
           //pathRewritedd: '/', // rewrite path
         }
       });
     } else {
      site.use('/', express.static(ui.path));
      routeur.use(vhost(ui.domain, site));
     }
   })
  /*routeur.use(rendertron.makeMiddleware(
    {
      proxyUrl: ui.render+'/render',
      userAgentPattern: BOTS_LIST,
      injectShadyDom: true,
      timeout: 11000
    }
  ));*/

  /*site.use('/', express.static(ui.path));
  routeur.use(vhost(ui.domain, site));*/


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
  proxy.web(req, res, {
    target: process.env.ANP_API_HOST, 
    changeOrigin: true,
    pathRewrite: {
      '^/myapis': '/', // rewrite path
    }
  });
})


module.exports = routeur;
