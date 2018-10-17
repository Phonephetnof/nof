const path = require("path");
const fs = require("fs");

const PLATFORM = process.platform;
const ARCH = process.arch;
const MODULES = process.versions.modules;
const NODE = process.versions.node;
const ELECTRON = process.versions.electron;

let moduleName;

if (ELECTRON) {
  const MINOR_RELEASE = ELECTRON.match(/\d\.\d/)[0];

  if (!MINOR_RELEASE) {
    throw new Error("Electron", ELECTRON, "release not supported");
  }

  moduleName = `electron-v${MINOR_RELEASE}-${PLATFORM}-${ARCH}`;
} else {
  moduleName = `node-v${MODULES}-${PLATFORM}-${ARCH}`;
}

try {
  module.exports = require(path.join(__dirname, moduleName, "node_sqlite3"));
} catch (err) {
  throw new Error(
    `NodeJS ${NODE} Module ${MODULES} (${moduleName}) is not supported.`
  );
}
