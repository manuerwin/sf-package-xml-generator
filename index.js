#!/usr/bin/env node

/**
 * CLI tool to parse directory content and build a package.xml file from it.
 * This is useful when total compressed size exceeds the 50MB limit.
 *
 * usage:
 *  $ sfpackagexmlgen ./target_directory
 *
 *  This will create a package.xml file at ./target_directory
 *  i.e. ./target_directory/package.xml
 */

var program = require('commander');
var util = require('util'),
    fs = require('fs');
    walk = require('fs-walk');
    spawnSync = require('child_process').spawnSync,
    packageWriter = require('./lib/metaUtils').packageWriter,
    buildPackageDir = require('./lib/metaUtils').buildPackageDir,
    packageVersion = require('./package.json').version;

program
    .arguments('<target>')
    .version(packageVersion)
    .option('-d, --dryrun', 'Only display the package.xml that would be generated')
    .action(function (target) {

        var dryrun = false;
        if (program.dryrun) {
            dryrun = true;
        }

        if (!dryrun && !target) {
            console.error('target required when not dry-run');
            program.help();
            process.exit(1);
        }

        //defines the different member types
        var metaBag = {};

        walk.filesSync(target, function(basedir, fileName, stat, next) {
            var fullFilePath = basedir + '/' + fileName;

            console.log('Processing file: %s', fullFilePath);

            //ignore .DS_Store
            if(fileName === '.DS_Store') {
                return;
            }
            //ignore the package.xml file
            if(fileName === 'package.xml') {
                return;
            }

            var parts = fullFilePath.split('/');
            var type = parts[1];
            var fileOrFolder = parts[2];
            var file = parts[3];

            if (fileOrFolder === undefined) {
                console.error('File name "%s" cannot be processed, exiting', fullFilePath);
                process.exit(1);
            }

            var meta;
            if (parts.length === 4) {
                // Processing metadata with nested folders e.g. emails, documents, reports
                meta = fileOrFolder + '/' + file.split('.')[0];
            } else {
                // Processing metadata without nested folders. Strip -meta from the end.
                meta = fileOrFolder.split('.')[0].replace('-meta', '');
            }

            // If the collection does not have the type, initialise it
            if (!metaBag.hasOwnProperty(type)) {
                metaBag[type] = [];
            }

            if (metaBag[type].indexOf(meta) === -1) {
                metaBag[type].push(meta);
            }
        }, function(err) {
            if (err) console.log(err);
        });

        //build package file content
        var packageXML = packageWriter(metaBag);
        if (dryrun) {
            console.log('\npackage.xml\n');
            console.log(packageXML);
            process.exit(0);
        }

        console.log('Writing package.xml in directory %s', target);

        fs.writeFile(target + '/package.xml', packageXML, 'utf8', (err) => {
            if (err) {
                return 'Failed to write xml file';
            }
        });
    });

program.parse(process.argv);
