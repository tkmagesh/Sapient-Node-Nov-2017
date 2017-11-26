var express = require('express');
var router = express.Router();

var tasks = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true},
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(tasks);
});

router.post('/', function(req, res, next){
	var taskToAdd = req.body;
	var	newId = tasks.reduce(function(prevResult, task){
			return task.id > prevResult ? task.id : prevResult;
		}, 0) + 1;
	taskToAdd.id = newId;
	tasks.push(taskToAdd);
	var viewData = {
	  	tasks : tasks
	  };
	res.status(201).json(taskToAdd);
});

router.put('/:id', function(req, res, next){
	var taskToUpdate = req.body;
	tasks = tasks.map(function(task){
		return task.id === parseInt(req.params.id) ? taskToUpdate : task;
	});
	res.status(200).json(taskToUpdate);
});

router.delete('/:id', function(req, res, next){
	tasks = tasks.filter(function(task){ 
		return task.id !== parseInt(req.params.id)
	});
	res.status(200).json({});
})
module.exports = router;
