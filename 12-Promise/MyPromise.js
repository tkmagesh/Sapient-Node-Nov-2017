var MyPromise = (function(){
	let subscriptionSymbol = Symbol(),
		resultSymbol = Symbol(),
		errorSymbol = Symbol(),
		statusSymbol = Symbol();
	
	function MyPromise(asyncFn){
		this[subscriptionSymbol] = {
			resolve : [],
			reject : []
		};
		this[statusSymbol] = 'pending';
		this[resultSymbol] = undefined;
		this[errorSymbol] = undefined;

		let resolveFn = (result) => {
			this[statusSymbol] = 'resolved';
			this[resultSymbol] = result;
			this[subscriptionSymbol]['resolve'].forEach(subscriptionFn => subscriptionFn(this[resultSymbol]));
		};

		let rejectFn = (error) => {
			this[statusSymbol] = 'rejected';
			this[errorSymbol] = error;
			this[subscriptionSymbol]['reject'].forEach(subscriptionFn => subscriptionFn(error));
		};

		asyncFn(resolveFn, rejectFn);
	}

	MyPromise.prototype.then = function(subscriptionFn){
		if (this[statusSymbol] === 'resolved'){
			subscriptionFn(this[resultSymbol]);
		} else {
			this[subscriptionSymbol]['resolve'].push(subscriptionFn);
		}
	};

	MyPromise.prototype.catch = function(subscriptionFn){
		if (this[statusSymbol] === 'rejected'){
			subscriptionFn(this[errorSymbol]);
		} else {
			this[subscriptionSymbol]['reject'].push(subscriptionFn);
		}
	}
	
	return MyPromise;
})();
