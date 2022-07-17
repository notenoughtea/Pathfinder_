const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const config = require('./db/config/database.json')

const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRouter');
const routesRouter = require('./routes/routesRouter');
const uploadRouter = require('./routes/uploadRouter');

const app = express();
const session = require("express-session");
const { userInfo } = require('os');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(logger('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const { Client } = require('pg')
//
// const client = new Client(config)
// client.connect()
//
// const store = new (require('connect-pg-simple')(session))({
//     config,
// })

// app.use(
//   session({
//     name: "sId",
//     store: store,
//     saveUninitialized: false,
//     secret: "Chubaka",
//     resave: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 1e3 * 86400,
//     }
//   }),
// );

app.use('/', routesRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter)
app.use('/upload', uploadRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
