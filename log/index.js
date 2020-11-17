const INDENT_SPACE = 2; // 格式化缩紧空格

const info = (msg) => {
    msg = parseMeg(msg)
    console.info(msg)
}

const log = (msg) => {
    msg = parseMeg(msg)
    console.log(msg)
}

const warn = (msg) => {
    msg = parseMeg(msg)
    console.warn(msg)
}

const error = (msg) => {
    msg = parseMeg(msg)
    console.error(msg)
}

function parseMeg(msg) {
    if (typeof msg === 'object') {
        return JSON.stringify(msg, null, INDENT_SPACE)
    }
    return msg
}

module.exports = {
    info,
    log,
    warn,
    error
}