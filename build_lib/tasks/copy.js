'use strict';
var path = require('path')
  , u = require('util')
  , fse = require('fs-extra')
  , _ = require('lodash')
  , glob = require('glob')
  , debug = require('debug')('build:task:copy')
  ;

module.exports = function(config, taskSets, taskSetName, taskConfig, callback) {
  'use strict';
  var logKey
    , errMsg
    , _err
    ;

  logKey = ['[', taskSetName, ':copy', ']'].join('');

  _.each(taskConfig.filesets, function(fileset) {
    var 
      sourceFiles = [],
      dest,
      destDir,
      d;

    if (fileset.toFile) {
      dest = path.resolve(fileset.toFile);
      destDir = path.dirname(dest);
    }

    if (fileset.toDir) {
      destDir = path.resolve(fileset.toDir);
    }

    if (!fse.existsSync(destDir)) {
      u.print(u.format("%s Creating %s ...", logKey, destDir));
      fse.mkdirsSync(destDir);
      u.print(" ok\n");
    }

    if (fileset.fromFile) {
      sourceFiles.push(path.resolve(fileset.fromFile));
    }

    if (fileset.fromGlob) {
      try {
        sourceFiles = glob.sync(fileset.fromGlob, {nocase: true, nosort: true});
      } catch (e) {
        _err = e;
        return false;
      }
    }

    _.each(sourceFiles, function(source) {
      // d = dest || destDir;
      if (dest) {
        d = dest;
      } else {
        d = path.join(destDir, path.basename(source));
      }

      u.print(u.format("%s Copying %s to %s ...", logKey, source, d));

      if (fse.existsSync(source)) {

        fse.copy(source, d, function(e) {
          if (e) _err = e;
        });

        if (_err) {
          u.print(" not ok\n");
          console.log("%s %s", logKey, _err.message);
          return false;
        }

        u.print(" ok\n");

      } else {
        u.print(" not ok\n");
        errMsg = u.format("%s File not found: %s", logKey, source);
        console.log("%s %s", logKey, errMsg);
        _err = new Error(errMsg);
        return false;
      }
    });

    if (_err) return false;
  });

  callback(_err);

};

function copy(sourceFile, destFile) {
  var _err;

  fse.copy(sourceFile, destFile, function(err) {
    if (err) _err = err;
  });

  return _err;
}
