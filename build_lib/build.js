'use strict';
var
    path = require('path'),
    u = require('util'),
    fse = require('fs-extra'),
    wrench = require('wrench'),
    _ = require('lodash'),
    debug = require('debug')('clean'),

    build;

build = module.exports = function(config) {
  'use strict';
  console.log('Building ...');

  // Creating the temporary dirs.
  _.each(config.tmp.dirs, function(dir, key) {
    'use strict';

    if (!fse.existsSync(dir)) {
      u.print(u.format("Creating %s ...", dir));
      fse.mkdirsSync(dir);
      u.print(" ok\n");
    }

  });

  console.log('Finished building.');
};
