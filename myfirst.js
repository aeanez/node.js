var http = require('http');
var dt = require('./modules/dateModule');
var url = require('url');
var fs = require('fs'); 

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = "";
    loadView('header').then((data) => {

        html += data;
        var q = url.parse(req.url, true)
        
        return loadView(q.pathname);
        
    }).catch((rej) => {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return fs.promises.readFile('./views/404.html', {encoding: 'UTF-8'}, (err, data) => {
            return data;
        })
    }).then((data) => {
        html += data;
        return loadView('footer');
    }).then((data) => {
        html += data;
        res.write(html);
        res.end();
    });
}).listen(8081); 


function loadView(viewName) {

    if(viewName == "/"){
        viewName = 'home';
    }

    return Promise.resolve(fs.promises.readFile('./views/' + viewName + '.html', {encoding: 'UTF-8'}, (err, data) => {
        if (err) throw err;
        return data;
    }));
}