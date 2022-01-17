var http = require('http');
var dt = require('./modules/dateModule');
var url = require('url');
var fs = require('fs'); 
var uc = require('upper-case');
var events = require('events');
var formidable = require('formidable'); 


var eventEmitter = new events.EventEmitter();

var loadViewEvent = function (viewName) {  
    console.log('A view was loaded: ' + viewName)
}
eventEmitter.on('viewLoaded', loadViewEvent);

http.createServer(function (req, res) {
    var html = "";
    var codeResponse = 200;

    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if(Object.keys(files).length !== 0 && files.filetoupload.size > 0){
                var oldpath = files.filetoupload.filepath;
                var newpath = './uploads/' + files.filetoupload.originalFilename;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });
            }
        })
    };

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
    eventEmitter.emit('viewLoaded', viewName);

    return Promise.resolve(fs.promises.readFile('./views/' + viewName + '.html', {encoding: 'UTF-8'}, (err, data) => {
        if (err) throw err;
        return data;
    }));
}

