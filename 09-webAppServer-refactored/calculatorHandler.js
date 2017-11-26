var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname,
		urlObj = req.urlObj;
	if (resourceName === '/calculator' && req.method === 'GET'){
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
	}
}