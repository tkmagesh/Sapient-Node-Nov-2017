class TaskService{
	
	constructor(){
		this._tasks = [];
	}

	getAll(){
		return this._tasks.slice(0);
	}

	addNew(taskToAdd){
		let	newId = this._tasks.reduce(
			(prevResult, task) => task.id > prevResult ? task.id : prevResult, 0) + 1;
		let newTask = { ...taskToAdd, id : newId };
		this._tasks.push(newTask);
	}

	update(id, taskToUpdate){
		this._tasks = this._tasks.map(task => task.id === parseInt(id) ? taskToUpdate : task);
	}

	remove(id){
		this._tasks = this._tasks.filter(task => task.id !== parseInt(id));
	}

	get(id){
		return this._tasks.filter(task => task.id === id)[0];
	}

}

module.exports = new TaskService();

