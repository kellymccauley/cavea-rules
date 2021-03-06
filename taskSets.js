/*
 * Copyright 2014 Kelly A. McCauley
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var taskSets = {}
  , path = require('path')
  , u = require('util')
  , _ = require('lodash')
  , dateFormat = require('dateformat')
  , httpServer = require('http-server')
  , portfinder = require('portfinder')
  , cheerio = require('cheerio')
  , debug = require('debug')('taskSets')

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
    human: dateFormat(now, "dddd, mmmm dS, yyyy, HH:MM:ss Z"),
    utc: dateFormat(now, "UTC:dddd, mmmm dS, yyyy, HH:MM:ss Z"),
    iso: dateFormat(now, "isoDateTime"),
    year: dateFormat(now, "yyyy")
  },

  'rots': {
    version: '0.3.5',
    inceptionYear: '2013',
    author: 'Kelly A. McCauley',
    srcFile: './src/web/rules/index.html',
    destPath: './dist/web/rules/'
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

if (props.rots.inceptionYear !== props.ts.year) {
  context.setProperty(
    'rots.copyright.year',
    [props.rots.inceptionYear, '-', props.ts.year].join('')
  );
} else {
  context.setProperty('rots.copyright.year', props.rots.inceptionYear);
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


taskSets['rots:proc-templates'] = {
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
        'use strict';
        var out;

        out = createSectionNumbers(output);
        out = createTOC(out);
        out = createLOR(out);
        out = createLOF(out);
        out = createLOE(out);
        out = createLOT(out);

        return out;
      }
    },
    { task: function() { context.setProperty('isForWebSite', false); } },

  ]
}


taskSets['rots:web'] = {
  description: 'Builds the html pages to use on the website.',
  // deps: ['rots:proc-templates', 'rots:gen-sec-numbers', 'rots:gen-toc']
  deps: ['rots:proc-templates']
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


// Support functions.
//


function createSectionNumbers(output) {
  'use strict';
  var $ = cheerio.load(output)
    , $main
    , maxDepth
    , $toNumber
    , idx = 0
  ;

  $main = $('#book');

  maxDepth = $main.data('maxSectionNumberingDepth');
  if (!maxDepth) {
    maxDepth = 3;
  }

 
  $toNumber = $('main > .numbered-section');
  
  debug("\n");
  $toNumber.each(function() {
    'use strict';
    var $section = $(this)
      , numberStack = []
    ;
  
    numberSection($, $section, ++idx, numberStack, maxDepth);
  
  });
  
  return $.html();
}

function numberSection($, $section, idx, numberStack, maxDepth) {
  'use strict';
  var $subSections
    , $h1
    , sectionNumber
    , i = 0
  ;

  if (numberStack.length + 1 <= maxDepth) {
    numberStack.push(idx);
    sectionNumber = numberStack.join('.');
    debug("%s %s", sectionNumber, $section.attr('id'));

    $section.attr('data-sec-number', sectionNumber);
    $section.children('h1').each(function() {
      'use strict';
      var $h1 = $(this);
      $h1.prepend('<span class="section-number">' + sectionNumber + ' </span>');
    });

    $section.children('section').each(function() {
      'use strict';
      var $subSection = $(this);
      numberSection($, $subSection, ++i, numberStack, maxDepth);
    });

    numberStack.pop();
  }
}



function createTOC(output) {
  'use strict';
  var $ = cheerio.load(output)
    , $main
    , $tocContent
    , maxDepth
    , toc
    , $sections
  ;

  $tocContent = $('#toc-content');


  $main = $('#book');

  maxDepth = $main.data('maxTocDepth');
  if (!maxDepth) {
    maxDepth = 3;
  }

  toc = ['<nav><ul>'];

  $sections = $('main > section');
  $sections.each(function() {
    'use strict';
    var $section = $(this)
      , skipToc = false
    ;

    skipToc = $section.data('tocSkip') || false;

    if (!skipToc) {
      tocify($, $section, toc, 1, maxDepth);
    }

  });

  toc.push('</ul></nav>');

  $tocContent.html(toc.join(''));

  return $.html();
}


function tocify($, $section, toc, depth, maxDepth) {
  'use strict';
  var $subSections
  ;

  if (depth <= maxDepth) {
    toc.push('<li><a href="#');
    toc.push($section.attr('id'));
    toc.push('">');
    $section.children('h1').each(function() {
      'use strict';
      var $h1 = $(this);
      toc.push($h1.html());
    });
    toc.push('</a>');

    $subSections = $section.children('section');
    if ($subSections.length > 0) {
      toc.push('<ul>');
      $subSections.each(function() {
        var $subSection = $(this);
        tocify($, $subSection, toc, depth + 1, maxDepth);
      });
      toc.push('</ul>');
    }

    toc.push('</li>');

  }

}

function createLOR(output) {
  'use strict';
  var $ = cheerio.load(output)
    , $main
    , $figures
    , lof
    , $lofContent
    , idx = 0
  ;

  lof = ['<ul>'];

  $figures = $('main figure.rule');
  $figures.each(function() {
    'use strict';
    var $figure = $(this)
      , $figCap
    ;

    lof.push('<li><a href="#');
    lof.push($figure.attr('id'));
    lof.push('">');

    $figure.attr('data-figure-number', ++idx);
    $figCap = $figure.children('figcaption').each(function() {
      var $fc = $(this);
      $fc.prepend('Rule <span class="figure-number">' + idx + '</span> - ');
      lof.push($fc.html());
    });

    lof.push('</a></li>');
  });

  lof.push('</ul>');

  $('#lor-content').html(lof.join(''));

  return $.html();
}



function createLOF(output) {
  'use strict';
  var $ = cheerio.load(output)
    , $main
    , $figures
    , lof
    , $lofContent
    , idx = 0
  ;

  lof = ['<ul>'];

  $figures = $('main figure.figure');
  $figures.each(function() {
    'use strict';
    var $figure = $(this)
      , $figCap
    ;

    lof.push('<li><a href="#');
    lof.push($figure.attr('id'));
    lof.push('">');

    $figure.attr('data-figure-number', ++idx);
    $figCap = $figure.children('figcaption').each(function() {
      var $fc = $(this);
      $fc.prepend('Figure <span class="figure-number">' + idx + '</span> - ');
      lof.push($fc.html());
    });

    lof.push('</a></li>');
  });

  lof.push('</ul>');

  $('#lof-content').html(lof.join(''));

  return $.html();
}

function createLOE(output) {
  'use strict';
  var $ = cheerio.load(output)
    , $main
    , $figures
    , lof
    , $lofContent
    , idx = 0
  ;

  lof = ['<ul>'];

  $figures = $('main .figure-example');
  $figures.each(function() {
    'use strict';
    var $figure = $(this)
      , $figCap
    ;

    lof.push('<li><a href="#');
    lof.push($figure.attr('id'));
    lof.push('">');

    $figure.attr('data-figure-number', ++idx);
    $figCap = $figure.children('figcaption').each(function() {
      var $fc = $(this);
      $fc.prepend('Example <span class="figure-number">' + idx + '</span> - ');
      lof.push($fc.html());
    });

    lof.push('</a></li>');
  });

  lof.push('</ul>');

  $('#loe-content').html(lof.join(''));

  return $.html();
}


function createLOT(output) {
  'use strict';
  var $ = cheerio.load(output)
    , $main
    , $tables
    , lot
    , $lotContent
    , idx = 0
  ;

  lot = ['<ul>'];

  $tables = $('main table');
  $tables.each(function() {
    'use strict';
    var $table = $(this)
      , $caption
    ;

    lot.push('<li><a href="#');
    lot.push($table.attr('id'));
    lot.push('">');

    $table.attr('data-table-number', ++idx);
    $caption = $table.children('caption').each(function() {
      var $tc = $(this);
      $tc.prepend('Table <span class="table-number">' + idx + '</span> - ');
      lot.push($tc.html());
    });

    lot.push('</a></li>');
  });

  lot.push('</ul>');

  $('#lot-content').html(lot.join(''));

  return $.html();
}


// Do the module thing.
//
module.exports = taskSets;


