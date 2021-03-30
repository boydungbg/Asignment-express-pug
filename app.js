var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
require('./models/db.js');

var indexRouter = require('./routes/cozastore/index.js');
var productRouter = require('./routes/cozastore/product.js');
var blogRouter = require('./routes/cozastore/blog.js');
var aboutRouter = require('./routes/cozastore/about.js');
var contactRouter = require('./routes/cozastore/contact.js');
var shoppingCartRouter = require('./routes/cozastore/shoping-cart.js');
var loginRouter = require('./routes/login.js');
var registerRouter = require('./routes/register.js');
var dashboardRouter = require('./routes/admin/index.js');
var managementUsersRouter = require('./routes/admin/user.js');
var managementProductRouter = require('./routes/admin/product.js');
var middlewareAutithencation = require('./middlewares/authentication.js');
var middlewareCheckCart = require('./middlewares/checkShopingCart.js');

const { match } = require('assert');
const { error } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

function randomSecret(length) {
  var cheracter =
    '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var sec = '';
  for (let index = 0; index < length; index++) {
    sec += cheracter[Math.floor(Math.random() * cheracter.length)];
  }
  return sec;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(randomSecret(10)));
app.use(
  session({
    secret: randomSecret(10),
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cozastore/index', middlewareCheckCart.checkCartShoping, indexRouter);
app.use(
  '/cozastore/product',
  middlewareCheckCart.checkCartShoping,
  productRouter
);
app.use('/cozastore/blog', middlewareCheckCart.checkCartShoping, blogRouter);
app.use('/cozastore/about', middlewareCheckCart.checkCartShoping, aboutRouter);
app.use(
  '/cozastore/contact',
  middlewareCheckCart.checkCartShoping,
  contactRouter
);
app.use(
  '/cozastore/shoping-cart',
  middlewareAutithencation.authentication,
  middlewareCheckCart.checkCartShoping,
  shoppingCartRouter
);
app.use('/cozastore', loginRouter);
app.use('/cozastore', registerRouter);
app.use(
  '/admin/index',
  middlewareAutithencation.authentication,
  dashboardRouter
);
app.use(
  '/admin/user',
  middlewareAutithencation.authentication,
  managementUsersRouter
);
app.use(
  '/admin/product',
  middlewareAutithencation.authentication,
  managementProductRouter
);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.use('/', function (req, res) {
  res.redirect('/cozastore/login');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.message);
  console.log(req.app.get('env') === 'development' ? err : {});
  // // render the error page
  res.status(err.status || 500);
  res.render('404pageErr');
});

app.listen(3000, () => {
  console.log('Server is running on 3001!');
});
module.exports = app;
