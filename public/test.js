var http = require ('http');
var dt = require ('./date.js');
http.createServer(function (req, res){
    res.writeHead(200, {'content Type':'Type/HTML'});
    res.write("The current Date and Time:" +dt.myDate);
    res.end();
}).listen(6700);