const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false,
// });

const path = require('path');
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
    }
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  },
  ...defineConfig({
    lintOnSave: false,
  })
}