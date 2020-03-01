const path = require('path');

const serverFilePath = process.env.__SERVER_FILE__;

if (path.extname(serverFilePath) === '.ts') {
  require('ts-node').register({
    transpileOnly: true,
    typeCheck: false,
  });
}

// eslint-disable-next-line
require(serverFilePath);
