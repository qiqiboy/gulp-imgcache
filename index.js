'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var imgs=[];
var win32=process.platform=='win32';

var imgcache = function(name, jsVar) {

    var stream = through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-concat',  'Streaming not supported'));
            cb();
            return;
        }

        imgs.push(file);

        // tell the stream engine that we are done with this file
        cb();
    }, function(cb){
        var file=new gutil.File,
            json=JSON.stringify(imgs.map(function(img){
                var path=img.path.replace(process.cwd(),'');
                if(win32){
                    path=path.replace(/\\/g,'/');
                }
                return path.replace(/^\//,'');
            })),
            varName;

        if(jsVar){
            varName=typeof jsVar=='string'?jsVar:name;
            json='var '+varName+'='+json+';';
            file.path=name+'.js';
        }else{
            file.path=name+'.json';
        }

        file.contents=new Buffer(json);

        gutil.log('Create '+file.path+': '+gutil.colors.green(json));

        this.push(file);
        // tell the stream engine that we are done with this file
        cb();
    });
        
    name=name||'cache';

    // returning the file stream
    return stream;
};

module.exports = imgcache;
