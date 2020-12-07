const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    
    let proxy = process.env.REACT_APP_PROXY;
    
    if(proxy === undefined) {
        proxy = "http://localhost:8080";
    }
    
    app.use(
        '/v1/api/',
        createProxyMiddleware({
            target: proxy,
            changeOrigin: true,
        })
    );
    
};