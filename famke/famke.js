var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var apihome = require('./routes/apihome');
var apiloaddb = require('./routes/apiloaddb');
var apiloadrun = require('./routes/apiloadrun');


var app = express(); 

//Serve static react build, once done
app.use(express.static('public'))


var server = require('http').Server(app);

//Socket.io code 
/*
var io = require('socket.io')(server);
io.set('transports', ['websocket','polling']);

app.use(function(req, res, next){
  res.io = io;
  next();
});
*/

//Middleware
morgan.token('datec', function() {
   let d = new Date();
   return((d.getMonth() + 1)+"-"+d.getDate()+"-"+d.getFullYear().slice(-2)+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()) 
});
app.use(morgan(":datec :method :url for :remote-addr", {immediate: true}))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//Mount routers
app.use('/loaddb/', apiloaddb);
app.use('/loadrun/', apiloadrun);
app.use('/', apihome);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            status: err.status, 
            message: err.message,
            stack: err.stack
        });
    });
}

app.use(function(err, req, res, next) {
      res.status(404);
      return res.json({"success":"false"});
});

module.exports = {app: app, server: server};
