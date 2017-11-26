var path = require('path'),
	fs = require('fs');

var staticResExtns = ['.html', '.css', '.js', '.xml', '.png', '.ico', '.jpg', '.json']

function isStatisResource(resourceName){
	return staticResExtns.indexOf(path.extname(resourceName)) !== -1;
}

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname;
	if (isStatisResource(resourceName)){
		var  resourcePath = path.join(__dirname, resourceName);		
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);

		stream.on('data', function(contents){
			res.write(contents);
		});
		stream.on('end', function(){
			res.end();
		});
	}
}