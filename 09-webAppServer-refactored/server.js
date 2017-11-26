var http = require('http'),
	path = require('path'),
	app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

app.use(dataParser);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);
	
http.createServer(app).listen(8080);
console.log('server listeninig on port 8080!');