'use strict';
var taskSets = {}
  , path = require('path')
  , u = require('util')
  , _ = require('lodash')
  , dateFormat = require('dateformat')
  , debug = require('debug')('taskSets')

  , httpServer = require('http-server')
  , portfinder = require('portfinder')

  , helper = require('./build_lib/helper')
  , fileset = require('./build_lib/fileset')
  , context = require('./build_lib/context')
  , rm = require('./build_lib/tasks/rm')
  , copy = require('./build_lib/tasks/copy')
  , less2css = require('./build_lib/tasks/less2css')
  , mustache = require('./build_lib/tasks/mustache')

  , baseDir = process.cwd()
  , bootstrapDir = path.join(baseDir, 'cavea-bootstrap')

  , props
  , now = new Date()
  ;

context.bindTo(taskSets);
context.loadWith({
  project: {
    inceptionYear: '2013',
  },

  ts: {
    date: now,
    iso: dateFormat(now, "isoDateTime"),
    year: dateFormat(now, "yyyy")
  },

  'rots': {
    inceptionYear: '2013',
    author: 'Kelly A. McCauley',
    srcFile: 'src/web/rules/index.html',
    destPath: 'dist/web/rules/'
  }
});

props = context.properties();

if (props.project.inceptionYear !== props.ts.year) {
  context.setProperty(
    'copyright.year',
    [props.project.inceptionYear, '-', props.ts.year].join('')
  );
} else {
  context.setProperty('copyright.year', props.project.inceptionYear);
}


console.log('context %s', u.inspect(context.runProperties()));

// Task set name
taskSets['clean:tmp'] = {

  // Task set description
  description: 'Deletes the contents of temporary build folder.',

  // Tasks to perform serially.
  tasks: [
    // A task
    {
      // The task's function.  Will be called with the following arguments
      // config, taskSets, taskSetName, taskConfig, callback
      task: rm,

      // Remaining properties are specific to the task.
      files: ['./tmp/*']
    }
  ]
};

taskSets['clean:dist'] = {
  description: 'Deletes the contents of the distribution folder.',
  tasks: [
    {
      task: rm,
      files: ['./dist/*']
    }
  ]
};

taskSets['realclean'] = {
  description: 'Deletes the temporary and distribution folders.',
  tasks: [
    {
      task: rm,
      file: ['tmp', 'dist']
    }
  ]

}

taskSets['init:dist'] = {
  description: "Initializes the distribution directory.",
  deps: ['clean:dist'],
  tasks: [
    {
      task: copy,
      from: path.join(bootstrapDir, 'dist', 'js', 'bootstrap.min.js'),
      toFile: 'dist/web/assets/lib/bootstrap.js'
    },
    {
      task: copy,
      from: 'src/web/assets/lib/*.js',
      toDir: 'dist/web/assets/lib'
    }
  ]
};

taskSets.less = {
  description: "Compiles the LESS templates into CSS.",
  deps: ['init:dist'],
  tasks: [
    {
      task: less2css,
      from: path.join(bootstrapDir, 'less', 'cavea.less'),
      toDir: 'dist/web/assets/css'
    }
  ]
};


taskSets['rots:web'] = {
  description: "Processes the rules of the stage documents.",
  deps: ['less'],
  tasks: [
    { 
      // Set up
      task: function() { 
        context.setProperty('isForWebSite', true); 
      } 
    },

    {
      // Text files.
      task: mustache,
      partials: fileset.of(
        [
          './src/web/rules/_partials/**/*.txt',
          './src/web/_partials/**/*.txt',
          './src/_partials/**/*.txt'
        ]
      ),
      templateData: context.properties(),
      templates: fileset.of(
        ['./src/web/rules/*.txt']
      ),
      toDir: './dist/web/rules/'
    },
    {
      // HTML files.
      task: mustache,
      partials: fileset.of(
        [
          './src/web/rules/_partials/**/*.html',
          './src/web/_partials/**/*.html',
          './src/_partials/**/*.html'
        ]
      ),
      templateData: context.properties(),
      templates: fileset.of(['./src/web/rules/*.html']),
      toDir: './dist/web/rules/',
      outputTransformer: function (file, destFile, output) {
        return output;
      }
    },
    { task: function() { context.setProperty('isForWebSite', false); } },

  ]
}

taskSets.serve = {
  description: "Starts up a web server and serves dist/web.",
  tasks: [
    { 
      task: function() {
        var server;
        portfinder.basePort = 8080;
        portfinder.getPort(function(err, port) {
          if (err) throw err;
          server = httpServer.createServer({
            root: './dist/web',
            cache: -1,
            showDir: true,
            autoIndex: true
          });
          server.listen(port, '0.0.0.0', function() {
            console.log('Starting http-server on port %s', port.toString());
            console.log('CTRL-C to stop the server.');
          });

        });

        if (process.platform !== 'win32') {
          process.on('SIGINT', function () {
            console.log('http-server has stopped.');
            process.exit();
          });
        }
      }
    }
  ]
}

taskSets.server = taskSets.serve;

taskSets.all = {
  description: 'Builds all of the documents',
  deps: ['init:dist', 'less', 'rots:web'],
  tasks: [
    {
      task: function(config, taskConfig, taskSetName, callback) {
        console.log("Hi");
      }
    }
  ]
};

taskSets['default'] = {
  deps: ['all']
};


module.exports = taskSets;
