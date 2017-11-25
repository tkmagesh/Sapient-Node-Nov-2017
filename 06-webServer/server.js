var http = require('http');

var server = http.createServer(function(req, res){
	res.write('<h1>Welcome to Node.js</h1>');
	res.end();
});

server.listen(8080);
console.log('server listeninig on port 8080!');