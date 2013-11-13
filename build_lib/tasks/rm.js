'use strict';
var path = require('path')
  , u = require('util')
  , fse = require('fs-extra')
  , glob = require('glob')
  , _ = require('lodash')
  , debug = require('debug')('build:task:rm')
  ;

module.exports = function(config, taskSets, taskSetName, taskConfig, callback) {
  'use strict';
  var logKey
    , toDelete = []
    , errMsg
    , _err
    , root = path.resolve('/');
 
  logKey = ['[', taskSetName, ':delete', ']'].join('');

  _.each(taskConfig.files, function(file) {
    'use strict';
    toDelete.push(glob.sync(path.resolve(file), {nocase: true, nosort: true}));
  });

  toDelete = _.flatten(toDelete);
  debug("%s toDelete: %s", logKey, u.inspect(toDelete));

  _.each(toDelete, function(file) {
    'use strict';
    if (file !== root) {
      u.print(u.format("%s Deleting %s ...", logKey, file));
      try {
        fse.removeSync(file);
      } catch (e) {
        u.print(" not ok\n");
        _err = e;
        console.log("%s %s", logKey, _err.message);
        return false;
      }
      u.print(" ok\n");
    }
  });

  callback(_err);
};
