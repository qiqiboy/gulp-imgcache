
> 读取管道中的文件，将其路径信息生成一个json文件。

主要应用场景，例如需要预加载页面上的图片等。

## Install

```sh
$ npm install --save gulp-imgcache
```


## Usage

```js
var gulp = require('gulp');
var imgcache = require('gulp-imgcache');

var SRC = ['images/*','!images/cache.json'];

gulp.task('cache', function () {
	return gulp.src(SRC)
		.pipe(imgcache('cache'))
		.pipe(gulp.dest('images'));
});
```

## Output
```js
/* 生成的文件中内容示例：*/

[
	"images/1712640.jpg",
	"images/IMG_5196.jpg",
	"images/IMG_5200.jpg",
	"images/IMG_5201.jpg",
	"images/IMG_5205.jpg",
	"images/avatar/qiqiboy.jpg"
]
```

## API

### imgcache(name, jsVar)

#### name

Type: `string`

生成的json文件的名称，默认为 ` "cache"` 。

#### jsVar

Type: `bool`, `string`

如果为true，则将会生成 `var varName=[];` 的js文件，varName为参数name。如果jsVar是个字符串，则varName等于jsVar。


## License

MIT © [qiqiboy](http://www.qiqiboy.com/)
