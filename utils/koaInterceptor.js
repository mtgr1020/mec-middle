const {
  SUCCESS_STATUS,
  SUCCESS_MESSAGE,
  ERROR_STATUS,
  ERROR_MESSAGE,
  SESSION_CONFIG,
} = require("../config");

const session = require('koa-session')

/**
 * koa 跨域拦截器 请求跨域处理
 *
 * @param {Context} ctx
 * @param {Next} next
 */
const corsIntercept = async (ctx, next) => {

  if (ctx.method === "OPTIONS") {
    ctx.status = 204;
  } else {
    await next();
  }
  ctx.set({
    "Access-Control-Allow-Origin": ctx.header.origin,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
    "Access-Control-Max-Age": 86400000,
    "Access-Control-Allow-Headers":
      "x-requested-with, accept, origin, content-type, sessionId",
    "Access-Control-Expose-Headers": "Content-Type,sessionId",
  });
};

/**
 * session处理
 * @param { Object } instance koa实例
 */
const sessionIntercept = (instance) => {
  SESSION_CONFIG.signed && (instance.keys = ['KeysForSigned']); // 如果SESSION_CONFIG中signed为false就不需要keys
  return session(SESSION_CONFIG, instance)
}

/**
 * 服务请求默认拦截器
 * @param {*} ctx 
 * @param {*} next 
 */
const defaultResponseIntercept = async (ctx, next) => {

  try {
    await next();
    if (ctx.body) {
      ctx.body = Object.assign({
        status: SUCCESS_STATUS,
        message: SUCCESS_MESSAGE,
      }, ctx.body);
    } else {
      console.error(JSON.stringify(ctx.response, null, 2))
    }
  } catch (err) {
    ctx.body = {
      status: ERROR_STATUS,
      message: err.message || ERROR_MESSAGE,
    };
  }
};

module.exports = {
  corsIntercept,
  defaultResponseIntercept,
  sessionIntercept
};
