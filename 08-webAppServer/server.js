var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticResExtns = ['.html', '.css', '.js', '.xml', '.png', '.ico', '.jpg', '.json']

function isStatisResource(resourceName){
	return staticResExtns.indexOf(path.extname(resourceName)) !== -1;
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url),
		resourceName = urlObj.pathname;
	if (isStatisResource(resourceName)){
		var  resourcePath = path.join(__dirname, resourceName);		
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (resourceName === '/calculator' && req.method === 'GET'){
		var reqData = querystring.parse(urlObj.query),
			op = reqData.op,
			n1 = parseInt(reqData.n1),
			n2 = parseInt(reqData.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end();
	} else if (resourceName === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(contents){
			rawData += contents;
		});
		req.on('end', function(){
			var reqData = querystring.parse(rawData),
				op = reqData.op,
				n1 = parseInt(reqData.n1),
				n2 = parseInt(reqData.n2),
				result = calculator[op](n1, n2);

			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('server listeninig on port 8080!');