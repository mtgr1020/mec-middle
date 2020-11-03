const server_config = require("./server");
const massage_config = require("./message");
const menu_config = require("./menu")
module.exports = {
  ...server_config,
  ...massage_config,
  ...menu_config
};
