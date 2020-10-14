const {
  SUCCESS_STATUS,
  SUCCESS_MESSAGE,
  ERROR_STATUS,
  ERROR_MESSAGE,
} = require("../config");

/**
 * koa 跨域拦截器 请求跨域处理
 *
 * @param {Context} ctx
 * @param {Next} next
 */
const corsIntercept = async (ctx, next) => {
  ctx.set({
    "Access-Control-Allow-Origin": ctx.header.origin,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
    "Access-Control-Max-Age": 86400000,
    "Access-Control-Allow-Headers":
      "x-requested-with, accept, origin, content-type, sessionId",
    "Access-Control-Expose-Headers": "Content-Type,sessionId",
  });
  if (ctx.method === "OPTIONS") {
    ctx.status = 204;
  } else {
    await next();
  }
};

const defaultResponseIntercept = async (ctx, next) => {
  ctx.body = {
    status: SUCCESS_STATUS,
    message: SUCCESS_MESSAGE,
  };
  console.log("-defaultResponseIntercept-");
  try {
    await next();
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
};
