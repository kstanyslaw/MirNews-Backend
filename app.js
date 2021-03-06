var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
var mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect('mongodb://main_author:main0author@ds048279.mlab.com:48279/mirnews', { useNewUrlParser: true }).then(
    () => { console.log('\x1b[1m', 'Successfuly connected to DataBase:)\n', '\x1b[0m') },
    err => {
        console.error('\x1b[31m', 'Connection to DataBase failed because of:', err.errmsg, '\x1b[0m');
        console.error('See also full error message: \n', err)
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup api requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// setup api routes
var v1 = require('./routes/api_v1');

app.use('/v1', v1);

// setup default (or latest) API route
app.use('/', v1);

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