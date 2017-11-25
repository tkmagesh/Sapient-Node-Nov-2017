var http = require('http'),
	url = require('url'),
	path = require('path'),
	querystring = require('querystring'),
	calculator = require('./calculator');
	

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url),
		reqData = querystring.parse(urlObj.query)
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var op = reqData.op,
		n1 = parseInt(reqData.n1),
		n2 = parseInt(reqData.n2),
		result = calculator[op](n1, n2);

	res.write(result.toString());
	res.end();
});

server.listen(8080);
console.log('server listeninig on port 8080!');