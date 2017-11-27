class EventEmitter{
	constructor(){
		this._subscriptions = { };
	}
	on(evtName, subscriptionFn){
		this._subscriptions[evtName] = this._subscriptions[evtName] || [];
		this._subscriptions[evtName].push(subscriptionFn)
	}
	off(evtName, subscriptionFn){
		let subscriptionFns = this._subscriptions[evtName] || [];
		let index = subscriptionFns.indexOf(subscriptionFn);
		if (index >= 0)
			subscriptionFns.splice(index, 1);
	}
	emit(evtName, ...data){
		let subscriptionFns = this._subscriptions[evtName] || [];
		subscriptionFns.forEach(subscriptionFn => subscriptionFn(...data));
	}
}