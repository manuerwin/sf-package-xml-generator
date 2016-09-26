#Overview

CLI Tool to generate Salesforce.com package.xml file based on content of target directory.
Based upon Dan Lively's sf-packager https://github.com/dlively1/sf-packager.

##Install
```
git clone https://github.com/manuerwin/sf-package-xml-generator.git && cd sf-package-xml-generator && npm link
```

##Usage
```
$ sfpackagexmlgen ./src
```
This will create a package.xml file inside the target directory based on the content of the directory

You can also display the package.xml by passing the -d (--dryrun) flag
```
sfpackagexmlgen -d ./src
```
