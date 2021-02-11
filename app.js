require('dotenv').config();
const db = require('./config/db');
db();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var restaurantsRouter = require('./routes/restaurants');
var storesRouter = require('./routes/stores');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('/uploads'));

app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/stores', storesRouter);

module.exports = app;


