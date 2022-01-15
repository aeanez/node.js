var http = require('http');
var dt = require('./modules/dateModule');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!<br>');
  res.write('The current date is: ' + dt.myDateTime()+ "<br>");
  res.write('The Query String is: ' + req.url + "<br>");

  var query = url.parse(req.url, true).query
  var txt = query.year + " " + query.month

  res.write('Spliting the Query string: ' + txt + "<br>");
  res.write('<a href="http://localhost:8081/?year=2017&month=July">Click me</a><br>');
  res.end();
}).listen(8081); 