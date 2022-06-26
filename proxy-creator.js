const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();

const proxyWeb= (url, origin, rewrite)=> {
  proxy.web(req, res, {
    target: url, 
    changeOrigin: true,
    pathRewrite: {
      origin: rewrite, // rewrite path
    }
  });
}

module.exports = creator-proxy;