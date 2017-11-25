var fs = require('fs');

fs.readFile('./test.txt', { encoding:'utf8'}, function(err, contents){
	if (!err){
		console.log(contents);
	}
});

console.log(fileContents);