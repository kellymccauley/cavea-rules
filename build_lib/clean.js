'use strict';
var
    path = require('path'),
    u = require('util'),
    fse = require('fs-extra'),
    _ = require('lodash'),
    debug = require('debug')('build:clean'),
    clean;


clean = module.exports = function(config) {
  'use strict';
  console.log('Cleaning temporary build area ...');

  u.print(u.format("Removing %s ...", config.tmpDir));
  fse.removeSync(config.tmpDir);
  u.print(" ok\n");

  console.log('Finished cleaning temporary build area.');
};
