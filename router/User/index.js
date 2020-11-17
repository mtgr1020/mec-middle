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


router.get("/checkAuthentication", (ctx) => {
    const username = ctx.session && ctx.session.username;
    //防止频繁切换路由请求,设置60*1e3 1小时强缓存
    //2020.11.13 在浏览器端做了sessionStorage缓存
    // ctx.response.set("Cache-Control", 'max-age=' + 60 * 1e1);
    ctx.body = {
        isAuthenticated: !!username
    }
})

module.exports = router;