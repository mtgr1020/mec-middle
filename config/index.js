const server_config = require("./server");
const massage_config = require("./message");
module.exports = {
  ...server_config,
  ...massage_config,
};
