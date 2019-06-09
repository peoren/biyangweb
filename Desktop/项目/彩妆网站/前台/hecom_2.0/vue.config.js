
module.exports = {
    devServer: {
      proxy: {
        '/v1': {
          // target: 'http://192.168.2.247:8080',
          // target: 'http://172.16.7.118:8080',
          // target: 'http://192.168.2.220:8084',
          // target: 'http://192.168.2.234:8888',
          // target: 'http://192.168.2.246:8080',
          // target: 'http://192.168.2.224:8080',  
          // target: 'http://192.168.2.234:8888',
          target: 'http://localhost:8080',
          
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/v1': '/'
          } 
        }
      }
    }
}
