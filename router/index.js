const glob = require('glob')
const { resolve } = require('path')
const compose = require('koa-compose')
const { log } = require('../log')


const registerRouter = () => {
  const routers = []
  log(`开始加载目录${__dirname}下路由`)
  glob.sync(resolve(__dirname, "./", '**?/index.js'))
    .map(router => {
      routers.push(require(router).routes())
      routers.push(require(router).allowedMethods())
    })
  return compose(routers)
}



module.exports = registerRouter;