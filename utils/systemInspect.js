const os = require("os");
const { log } = require('../log')

log('---开始服务启动前系统检查---')
log('当前操作系统 : ' + os.type());
log('操作系统 CPU 架构 : ' + os.arch());
log('系统可使用内存总量 : ' + os.totalmem() / 1e9 + " G.");
log('系统当前空闲内存量 : ' + os.freemem() / 1e9 + " G.");

let interfaces = os.networkInterfaces();
for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            log('当前服务可访问地址 : ' + alias.address);
        }
    }
}


log('---结束服务启动前系统检查---')
log('')
