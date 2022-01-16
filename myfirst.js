var http = require('http');
var dt = require('./modules/dateModule');
var url = require('url');
var fs = require('fs'); 

http.createServer(function (req, res) {
    var html = "";
    loadView('header').then((data) => {

        html += data;
        var q = url.parse(req.url, true)
        
        if(q.pathname != "/" && q.pathname != undefined){
            return loadView(q.pathname);
        }
        return new Promise((res, rej) => {
            res('404 Page not found');
        });
    })
    .then((data) => {
        html += data;
        return loadView('footer');
    }).then((data) => {
        html += data;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();

    });
}).listen(8081); 


async function loadView(viewName) {
    return Promise.resolve(fs.promises.readFile('./views/' + viewName + '.html', {encoding: 'UTF-8'}, (err, data) => {
        if (err) throw err;
        return data;
    }));
}