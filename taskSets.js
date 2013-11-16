'use strict';
var taskSets = {}
  , path = require('path')
  , u = require('util')
  , debug = require('debug')('taskSets')
  , dateFormat = require('dateformat')

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
      files: ['tmp/*']
    }
  ]
};

taskSets['clean:dist'] = {
  description: 'Deletes the contents of the distribution folder.',
  tasks: [
    {
      task: rm,
      file: ['dist/*']
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


taskSets.mustache = {
  description: "Processes the mustache templates.",
  deps: ['less'],
  tasks: [
    // Rules of the Stage
    { task: function() { context.setProperty('isForWebSite', true); } },
    {
      task: mustache,
      partials: fileset.of(
        [
          './src/web/rules/_partials/**/*.{txt,html}',
          './src/web/_partials/**/*.{txt,html}',
          './src/_partials/**/*.{txt,html}'
        ]
      ),
      templateData: context.properties(),
      templates: fileset.of(
        ['./src/web/rules/*.{txt,html}']
      ),
      toDir: './dist/web/rules/'
    },
    { task: function() { context.setProperty('isForWebSite', false); } },

  ]
}

taskSets.all = {
  description: 'Builds all of the documents',
  deps: ['clean:tmp', 'clean:dist', 'init:dist', 'less'],
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
