const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/*',
    createProxyMiddleware({
      target: 'https://appletree-express-server.herokuapp.com:3000',
      changeOrigin: true,
    })
  );
};