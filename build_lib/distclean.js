'use strict';
var
    path = require('path'),
    u = require('util'),
    fse = require('fs-extra'),
    _ = require('lodash'),
    debug = require('debug')('distclean'),
    distclean;


distclean = module.exports = function(config) {
  'use strict';
  console.log('Cleaning distribution area ...');

  u.print(u.format("Removing %s ...", config.distDir));
  fse.removeSync(config.distDir);
  u.print(" ok\n");


  console.log('Finished cleaning distribution area.');
};
