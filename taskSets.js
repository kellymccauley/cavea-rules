'use strict';
var
    path = require('path')
  , rm = require('./build_lib/tasks/rm')
  , copy = require('./build_lib/tasks/copy')
  , less2css = require('./build_lib/tasks/less2css')

  , baseDir = process.cwd()
  , bootstrapDir = path.join(baseDir, 'cavea-bootstrap')
  , taskSets
  ;

taskSets = {

  // Task set name
  deleteTmp: {
    // Task set description
    description: 'Deletes the contents of temporary build folder.',

    // Tasks to perform
    tasks: [
      // A task
      {
        // The task's function.  Will be called with the following arguments
        // config, taskSets, taskSetName, taskConfig, callback
        task: rm,

        // Remaining properties are specific to the task.
        files: ['tmp/*']
      }
    ]
  },

  deleteDist: {
    description: 'Deletes the contents of the distribution folder.',
    tasks: [
      {
        task: rm,
        files: ['dist/*']
      }
    ]
  },

  buildAll: {
    description: 'Builds all of the documents',
    deps: ['deleteTmp', 'deleteDist'],
    tasks: [
      {
        task: function(config, taskConfig, taskSetName, callback) {
          console.log("Hi");
        }
      },
      {
        task: copy,
        filesets: [
          { 
            fromFile: path.join(bootstrapDir, 'dist', 'js', 'bootstrap.min.js'),
            toFile: 'dist/web/assets/lib/bootstrap.js'
          },
          {
            fromGlob: 'src/web/assets/lib/*.js',
            toDir: 'dist/web/assets/lib/'
          }
        ]
      },
      
      {
        task: less2css,
        source: path.join(bootstrapDir, 'less', 'cavea.less'),
        destDir: 'dist/web/assets/css'
      }
    ]
  },

  'default': {
    deps: ['buildAll']
  }


};

module.exports = taskSets;
