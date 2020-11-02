const router = require("koa-router")();

router.post("/api/v1/userLogin", (ctx) => {
  const { userName, pass } = ctx.request.body;
  //TODO check userInfo from db 
  if(userName !== pass){
    throw new Error('用户名密码不正确')
  }
  ctx.session.username = userName
});

module.exports = router.routes();
