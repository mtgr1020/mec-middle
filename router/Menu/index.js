const router = require("koa-router")({
    prefix: "/api/v1"
});

const { asideMenuConfig } = require("../../config")

router.get("/getAsideMenus", (ctx) => {
    ctx.body = {
        asideMenuList: asideMenuConfig
    }
})

module.exports = router;