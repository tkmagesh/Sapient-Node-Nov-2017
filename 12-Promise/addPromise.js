function add(x,y){
	console.log(`processing ${x} and ${y}`);
	var promise = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			console.log(`[service] returning the result`);
            var result =  x + y;
            resolveFn(result);
        },4000)
	});
	return promise;
}
