var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url),
		resourcePath = path.join(__dirname, urlObj.pathname);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resourcePath).pipe(res);
});

server.listen(8080);
console.log('server listeninig on port 8080!');