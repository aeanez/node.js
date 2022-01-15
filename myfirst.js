var http = require('http');
var dt = require('./modules/dateModule');
var url = require('url');
var fs = require('fs'); 

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    fs.promises.readFile('./views/header.html', "UTF-8", function (err, data) {
        if (err) throw err;
        return data;
    }).then( (data) => {
        res. write(data);
        res.write('Hello World!<br>');
        res.write('The current date is: ' + dt.myDateTime()+ "<br>");
        res.write('The Query String is: ' + req.url + "<br>");
    
        var query = url.parse(req.url, true).query
        var txt = query.year + " " + query.month
    
        res.write('Spliting the Query string: ' + txt + "<br>");
        res.write('<a href="http://localhost:8081/?year=2017&month=July">Click me</a><br>');

    }).then(() => {
        fs.promises.readFile('./views/footer.html', (err, data) => {
            if (err) throw err;
            res.write(data);
        }).then(() => {
            res.end();
        });
    });


    
}).listen(8081); 