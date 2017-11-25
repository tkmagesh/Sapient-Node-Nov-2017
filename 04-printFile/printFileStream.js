var fs = require('fs');

var stream = fs.createReadStream('./test.txt', { encoding: 'utf8'});

//open, data, end, close, error

var readCount = 0;
stream.on('data', function(contents){
	++readCount;
	console.log(contents);
});

stream.on('close', function(){
	console.log('------ Thats all folks! ------- ' + readCount + ' - readCounts');
});

stream.on('error', function(e){
	console.log('something went wrong');
});