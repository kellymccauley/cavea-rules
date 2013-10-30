# Installation

The following instructions are for setting up the build system.  Familiarity with using the command line shell for your operating is recommended, but not required.

## Software Requirements

*   [git](http://gitscm.com/) - any recent version
*   [Node.js](http://nodejs.org/) - version 0.10.21 or higher




## Installation Steps

### Notes

#### Executing Commands as Root or Administrator

Some commands will need to be executed by the *root* user or administrator user.

##### Mac OS, Linux, or \*nix configured to use `sudo`

[sudo](http://www.sudo.ws/) grants specified users or groups of users the ability to run some or all commands as the root user.

Prepend `sudo` to each of the commands that need to be executed by the *root*.

##### Linux or *nix

Use the `su` command to change to the *root* user.  See `man su` for more information.

Either run `su -` or execute the command using the `--command` option.

##### Windows

Not sure if any of the commands need to run as Administrator on windows.  If needed, run Windows PowerShell as an Administrator.


### Perform the Installation

1.  Install the required software that is listed above.

2.  Get the project.

    If you are wanting to just build the books and documents, then use your favorite git interface and clone the repository.  Command line example:

        git clone https://github.com/kellymccauley/cavea-rules.git

    If you are wanting to contribute to the project, then:

    1. Read the [CONTRIBUTING](https://github.com/kellymccauley/cavea-rules/blob/master/CONTRIBUTING.md) document. 
    2. Fork the [project](https://github.com/kellymccauley/cavea-rules). See [Fork A Repo](https://help.github.com/articles/fork-a-repo) for instructions.



3.  Launch a terminal or shell.
    
    **Mac OS:**
    
    Launch the Terminal application or [iTerm2](http://www.iterm2.com/)
        
    **Linux:**
    
    Run your favorite terminal.
        
    **Windows:**
    
    Open Windows PowerShell as a normal user.

4.  Update global Node packages.

    Node packages are managed by the [npm](https://npmjs.org/doc/) command line application.
    
    Execute the following:
    
        npm -g update

5.  Install [Grunt](http://gruntjs.com/)

    Grunt is a JavaScript based task runner.  We use it for running taking all of the parts, doing stuff to the parts, make more parts, and assemble the final books and documents.
    
    Execute the following:

        npm install -g grunt-cli

6.  Install the project's Node packages.



