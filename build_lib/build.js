'use strict';
var
    path = require('path'),
    u = require('util'),
    fse = require('fs-extra'),
    wrench = require('wrench'),
    glob = require('glob'),
    _ = require('lodash'),
    less = require('less'),
    debug = require('debug')('build:build'),

    build;

build = module.exports = function(config, callback) {
  'use strict';
  var _err, keepGoing = true;

  console.log('Building ...');


  _.each(config.tasks, function(taskConfig) {
    'use strict';
    var logKey = '[' + taskConfig.key + ']';

    if (!_err) {
      switch (taskConfig.key) {
        case 'css':
          cssTask(config, taskConfig, logKey, function(err) {
            _err = err;
          });
          break;

        case 'copy':
          copyTask(config, taskConfig, logKey, function(err) {
            _err = err;
          });
          break;

      }
    }

  });

  if (!_err) {
    console.log('Finished building.');
  } else {
    console.log("\nBuild failed.");
  }


  callback(_err);

};


function cssTask(config, taskConfig, logKey, callback) {
  'use strict';
  var 
      source, sourceFileName, sourceDir, 
      dest, destFileName, destDir,
      createDestDir = false,
      parser,
      errMsg,
      _err;

  source = taskConfig.source;
  sourceFileName = path.basename(source);
  sourceDir = path.dirname(source);

  destFileName = path.basename(source, 'less') + 'css';
  destDir = path.resolve(taskConfig.destDir);
  dest = path.join(destDir, destFileName);

  console.log("%s source:         %s", logKey, source);
  console.log("%s sourceFileName: %s", logKey, sourceFileName);
  console.log("%s sourceDir:      %s", logKey, sourceDir);

  console.log("%s dest:           %s", logKey, dest);
  console.log("%s destFileName:   %s", logKey, destFileName);
  console.log("%s destDir:        %s", logKey, destDir);


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
        _err = e3;
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



function copyTask(config, taskConfig, logKey, callback) {
  'use strict';
  var 
      errMsg,
      _err;

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
      d = dest || destDir;
      u.print(u.format("%s Copying %s to %s ...", logKey, source, d));

      if (fse.existsSync(source)) {
        _err = copy(source, d);

        if (_err) {
          u.print(" not ok\n");
          console.log(_err.message);
          return false;
        }

        u.print(" ok\n");

      } else {
        u.print(" not ok\n");
        errMsg = u.format("%s File not found: %s", logKey, source);
        console.log(errMsg);
        _err = new Error(errMsg);
        return false;
      }
    });

    if (_err) return false;
  });

  if (_err) {
    callback(_err);
    return;

  } else {
  }

  callback(_err);

};



function copy(sourceFile, destFile) {
  var _err;

  fse.copy(sourceFile, destFile, function(err) {
    if (err) _err = err;
  });

  return _err;
}

