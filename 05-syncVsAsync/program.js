function addSync(x,y){
	if (x % 2 === 0 && y% 2 === 0)
		throw new Error('Invalid arguments');
	return x + y;
}

console.log('[sync] valid arguments');
console.log(addSync(10,3));

console.log('[sync] invalid arguments');
try{
	console.log(addSync(10,2));
} catch(e){
	console.log('something went wrong');
}


function addAsync(x,y,onResult){
	setTimeout(function(){
		if (x % 2 === 0 && y% 2 === 0){
			var err = Error('Invalid arguments');
			onResult(err);
			return;
		}
		var result = x + y;
		if (typeof onResult === 'function')
			onResult(null, result);
	},4000)
}

console.log('[async] valid arguments');
addAsync(10,3, function(result){
	console.log(result);
});

console.log('[async] invalid arguments');

addAsync(10,2, function(e, result){
	if (e){
		console.log('something went wrong');
		return;		
	}
	console.log(result);
});
