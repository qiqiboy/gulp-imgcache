'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var imgs=[];
var win32=process.platform=='win32';

var imgcache = function(name) {

    var stream = through.obj(function(file, enc, cb) {
        if (file.isNull()) {
			cb(null, file);
			return;
		}

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-concat',  'Streaming not supported'));
            cb();
            return;
        }

        imgs.push(file);

        // tell the stream engine that we are done with this file
        cb();
    }, function(cb){
        var file=new gutil.File;
        file.path=(name||'cache')+'.json';
        file.contents=new Buffer(JSON.stringify(imgs.map(function(img){
            var path=img.path.replace(process.cwd(),'');
            if(win32){
                path=path.replace(/\\/g,'/');
            }
            return path.replace(/^\//,'');
        })));

        this.push(file);
        // tell the stream engine that we are done with this file
        cb();
    });

    // returning the file stream
    return stream;
};

module.exports = imgcache;
