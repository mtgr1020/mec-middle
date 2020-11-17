const {
  SUCCESS_STATUS,
  SUCCESS_MESSAGE,
  ERROR_STATUS,
  ERROR_MESSAGE,
  SESSION_CONFIG,
  NOT_LOGIN,
  REQUEST_WHITE_LIST,
} = require("../config");

const { error } = require('../log')

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
const defaultRequestIntercept = async (ctx, next) => {

  const noIntercept = REQUEST_WHITE_LIST[ctx.request.path]
  const username = ctx.session && ctx.session.username;
  if (noIntercept || username) {
    await next();
  } else {
    ctx.body = {
      status: NOT_LOGIN,
      message: NOT_LOGIN
    }
  }

};

/**
 * 服务响应默认拦截器
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
      const { status, message } = ctx.response;
      error({
        requestUrl: ctx.request.url,
        status,
        message
      })
    }
  } catch (err) {
    error(err)
    ctx.body = {
      status: ERROR_STATUS,
      message: err.message || ERROR_MESSAGE,
    };
  }
};

module.exports = {
  defaultRequestIntercept,
  corsIntercept,
  defaultResponseIntercept,
  sessionIntercept
};
