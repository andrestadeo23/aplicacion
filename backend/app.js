const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
var index_router = require('./routes/index');
const { options } = require('./routes/index');

//Se crea el servidor http con el cual podras hacer POST y GET
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(4000);

/*const allowedOrigins = ['http://localhost:4200'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));*/
// Configurar cabeceras y cors
app.use (function (req, res, next) {
  res.header ("Access-Control-Allow-Origin", "*");
  next();
  });
app.use(express.json());
app.use('/', index_router);
app.use(express.static(path.join(__dirname, '/')));