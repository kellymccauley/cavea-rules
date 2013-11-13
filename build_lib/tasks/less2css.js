'use strict';
var path = require('path')
  , u = require('util')
  , fse = require('fs-extra')
  , less = require('less')
  , debug = require('debug')('build:task:less2css')
  ;

module.exports = function(config, taskSets, taskSetName, taskConfig, callback) {
  'use strict';
  var logKey
    , source, sourceFileName, sourceDir
    , dest, destFileName, destDir
    , createDestDir = false
    , parser
    , errMsg
    , _err
    ;

  logKey = ['[', taskSetName, ':less2css', ']'].join('');

  source = taskConfig.source;
  sourceFileName = path.basename(source);
  sourceDir = path.dirname(source);

  destFileName = path.basename(source, 'less') + 'css';
  destDir = path.resolve(taskConfig.destDir);
  dest = path.join(destDir, destFileName);

  debug("%s source:         %s", logKey, source);
  debug("%s sourceFileName: %s", logKey, sourceFileName);
  debug("%s sourceDir:      %s", logKey, sourceDir);

  debug("%s dest:           %s", logKey, dest);
  debug("%s destFileName:   %s", logKey, destFileName);
  debug("%s destDir:        %s", logKey, destDir);


  if (!fse.existsSync(source)) {
      errMsg = u.format("%s File not found: %s", logKey, source);
      console.log(errMsg);
      callback(new Error(errMsg));
      return;
  }

  if (!fse.existsSync(destDir)) {
    u.print(u.format("%s Creating %s ...", logKey, destDir));
    fse.mkdirsSync(destDir);
    u.print(" ok\n");
  }


  u.print(u.format("%s Compiling %s to %s ...", logKey, source, dest));
  fse.readFile(source, 'utf8', function(e, data) {
    var lessOpts;

    if (e) {
      u.print(" not ok\n");
      console.log("%s Unable to open file for reading: %s", logKey, source);
      _err = e;
      return;
    }

    lessOpts = {
      dumpLineNumbers: "comments",
      paths: [sourceDir], // Specify search paths for @import directives
      filename: destFileName // Specify a filename, for better error messages
    };

    parser = new(less.Parser)(lessOpts);

    parser.parse(data, function (e2, tree) {
      var css;

      if (e2) {
        u.print(" not ok\n");
        _err = e2;
        less.writeError(e2, lessOpts);
        return;
      }

      try {
        css = tree.toCSS(lessOpts);
      } catch (e3) {
        u.print(" not ok\n");
        _err = e3;
        less.writeError(e3, lessOpts);
        return;
      }


      try {
        fse.writeFileSync(dest, css, 'utf8');

      } catch (e4) {
        u.print(" not ok\n");
        _err = e4;
        console.log("%s Unable to write to file: %s", dest);
        return;
      }
    });

  });

  if (_err) {
    callback(_err);
    return;

  } else {
    u.print(" ok\n");
  }

  callback(_err);
}


