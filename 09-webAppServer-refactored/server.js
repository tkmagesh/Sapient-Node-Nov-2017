var http = require('http'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');



var server = http.createServer(function(req, res){
	dataParser(req);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(res);
});

server.listen(8080);
console.log('server listeninig on port 8080!');