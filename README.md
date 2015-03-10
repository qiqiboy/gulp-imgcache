
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

## API

### imgcache(name)

#### name

Type: `string`

生成的json文件的名称，默认为 ` "cache"` 。

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
