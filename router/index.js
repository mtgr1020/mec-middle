const router = require("koa-router")();

router.post("/api/v1/userLogin", (ctx) => {
  const { userName, pass } = ctx.request.body;
  //TODO check userInfo
  //   throw new Error("ces");
});

module.exports = router.routes();
