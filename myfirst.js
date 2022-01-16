var http = require('http');
var dt = require('./modules/dateModule');
var url = require('url');
var fs = require('fs'); 
var uc = require('upper-case')

http.createServer(function (req, res) {
    var html = "";
    var codeResponse = 200;
    loadView('header').then((data) => {

        html += data;
        var q = url.parse(req.url, true)
        
        return loadView(q.pathname);
        
    }).catch((rej) => {
        codeResponse = 404;
        return fs.promises.readFile('./views/404pageNotFound.html', {encoding: 'UTF-8'}, (err, data) => {
            return data;
        })
    }).then((data) => {
        html += codeResponse == 404 ? uc.upperCase(data) : data;
        return loadView('footer');
    }).then((data) => {
        html += data;
        res.writeHead(codeResponse, {'Content-Type': 'text/html'});
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