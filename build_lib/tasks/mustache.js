'use strict';
var path = require('path')
  , u = require('util')
  , fse = require('fs-extra')
  , _ = require('lodash')
  , mustache = require('mustache')
  , debug = require('debug')('build:task:hbs')
  ;

module.exports = function(config, taskSets, taskSetName, taskConfig, callback) {
  'use strict';
  var logKey
    , errMsg
    , _err
    ;

  logKey = ['[', taskSetName, ':mustache', ']'].join('');

  callback(_err);

};


