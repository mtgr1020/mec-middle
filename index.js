const koa = require("koa");
const app = new koa();
const {
  corsIntercept,
  defaultResponseIntercept,
  sessionIntercept,
} = require("./utils/koaInterceptor");
const router = require("./router");
const bodyParse = require("koa-bodyparser");
const { PORT } = require("./config");

app
  .use(corsIntercept)
  .use(
    bodyParse({
      multipart: true,
    })
  )
  .use(sessionIntercept(app))
  .use(defaultResponseIntercept)
  .use(router);
/**
 * 错误处理
 * req/res 期间出现错误，并且 _无法_ 响应客户端，Context实例仍然被传递
 * 发生错误 _并且_ 仍然可以响应客户端时 Koa 将用一个 500 “内部服务器错误” 进行适当的响应
 */
app.on("error", (err, ctx) => {
  console.error("server  error", err, ctx);
});
app.listen(PORT);
console.log("create server by " + PORT);
