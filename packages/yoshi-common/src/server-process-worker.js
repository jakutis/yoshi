// We use this file in order to have a `fork` with `ipc`
// and also have `ts-node` register for TypeScript support
// for the user's server file

const path = require('path');

const serverFilePath = process.env.__SERVER_FILE__;

if (path.extname(serverFilePath) === '.ts') {
  require('ts-node').register({
    fast: true,
  });
}

// eslint-disable-next-line
require(serverFilePath);
