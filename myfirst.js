var http = require('http');
var dt = require('./modules/dateModule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!<br>');
  res.write('The current date is: ' + dt.myDateTime()+ "<br>");
  res.write('The requested URL is: ' + req.url + "<br>");
  res.end();
}).listen(8081); 