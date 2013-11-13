'use strict';
var
    path = require('path')
  , u = require('util')
  , fse = require('fs-extra')
  , _ = require('lodash')
  , glob = require('glob')
  , debug = require('debug')('build:go')
  , go
  , taskFile;

go = module.exports = function(config, taskSets, taskSetName, callback) {
  'use strict';
  var _err, errMsg, taskSet, logKey, deps;

  taskSet = taskSets[taskSetName];
  if (!taskSet) {
    errMsg = u.format("Could not find the taskSet named %s.", taskSetName);
    console.log(errMsg);
    callback(new Error(errMsg));
    return;
  }

  logKey = '[' + taskSetName + ']';

  deps = _.result(taskSet, 'deps');

  if (deps) {
    if (_.isString(deps)) {
      deps = [deps];
    }

    // Do the dependencies first.
    _.each(deps, function(depTaskSetName) {
      console.log('%s %s depends on %s.', logKey, taskSetName, depTaskSetName);
      go(config, taskSets, depTaskSetName, function(err) {
        _err = err;
        return false;
      });
    });
  }

  if (!_err && taskSet.tasks && taskSet.tasks.length > 0) {
    console.log('%s Running %s tasks ...', logKey, taskSetName);

    _.each(taskSet.tasks, function(taskConfig) {
      if (taskConfig.task) {
        taskConfig.task(config, taskSets, taskSetName, taskConfig, function(err) {
          if (err) _err = err;
        });

        if (_err) return false;

      } else {
        debug("%s Task without a task function specified: %s", logKey, u.inspect(taskConfig));
      }
    });

    if (_err) {
      console.log('%s Unable to complete task set: %s', logKey, taskSetName);

    } else {
      console.log('%s Finished running %s tasks.', logKey, taskSetName);

    }
  }

  callback(_err);
};

