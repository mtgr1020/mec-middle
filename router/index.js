const router = require("koa-router")({
  prefix: "/api/v1"
});



router.post("/userLogin", (ctx) => {
  const { userName, pass } = ctx.request.body;
  //TODO check userInfo from db 
  if (userName !== pass) {
    throw new Error('用户名密码不正确')
  }
  ctx.session.username = userName
  // 当我们没有响应数据的时候,就给个空对象
  ctx.body = {}
});

router.get("/getAsideMenus", (ctx) => {
  ctx.body = {
    memu: 'di'
  }
})

module.exports = router.routes();
