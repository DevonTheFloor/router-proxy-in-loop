const express=require("express"),routeur=express(),httpProxy=require("http-proxy"),proxy=httpProxy.createProxyServer(),vhost=require("vhost");routeur.use((req,res,next)=>{res.setHeader("Access-Control-Allow-Origin",process.env.DOMAIN_NAME),res.setHeader("Access-Control-Allow-Origin","*"),res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"),res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS"),res.setHeader("X-Frame-Options"," SAMEORIGIN"),res.setHeader("Strict-Transport-Security","max-age=31536000; includeSubDomains"),res.setHeader("X-Content-Type-Options","nosniff"),next()}),routeur.disable("x-powered-by"),routeur.use("/",express.static(process.env.PNR_PATH_UI)),routeur.use("/engin",(req,res,next)=>{proxy.web(req,res,{target:process.env.PNR_API_HOST,changeOrigin:!0,pathRewrite:{"^/engin":"/"}})}),routeur.use("/rssflow",(req,res,next)=>{proxy.web(req,res,{target:process.env.RSS_HOST,changeOrigin:!0,pathRewrite:{"^/rssflow":"/devweb"}})}),routeur.use(vhost("apprentis-et-patrons.fr",(function handle(req,res,next){console.dir(req.vhost.host),console.dir(req.vhost.hostname),console.dir(req.vhost.length),res.status(200).json({message:"Mais non!!!"})}))),module.exports=routeur;