const express = require('express');
const routeur = express();
const helmet = require('helmet');
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
//const mongoose = require('mongoose');
//const nMailer = require('nodemailer');
const vhost = require('vhost');

/*mongoose.connect(process.env.ROUTER_BD,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log(':D Local ConneXion to MDB!'))
  .catch(() => console.log('8X Connexion à MongoDB échouée !'));*/

routeur.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.DOMAIN_NAME );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('X-Frame-Options',' SAMEORIGIN');
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

routeur.disable('x-powered-by');
//follow the /api path for hit the targeted server


routeur.use('/',(req, res, next)=>{
  proxy.web(req, res, {
    target: process.env.FIRST_SITE, 
    changeOrigin: false,
    /*pathRewrite: {
      '^/api/': '/', // rewrite path
    }*/
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
