var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var AipNlpClient = require('./routes/AipNlpClient');
var AipImageClassify = require('./routes/AipImageClassifyClient');
var AipOcrClient = require('./routes/AipOcrClient');
var AipFaceClient = require('./routes/AipFaceClient');
var AipSpeechClient = require('./routes/AipSpeechClient');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//post 数据量过大
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

//调用接口
//自然语言处理/语言处理
app.use('/AipNlpClient', AipNlpClient);
//图像识别
app.use('/AipImageClassify', AipImageClassify);
//文字识别
app.use('/AipOcrClient', AipOcrClient);
//人脸识别
app.use('/AipFaceClient', AipFaceClient);
//百度语音/语音合成/识别
app.use('/AipSpeechClient', AipSpeechClient);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
