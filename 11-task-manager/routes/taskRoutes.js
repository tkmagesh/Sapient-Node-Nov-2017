var express = require('express');
var router = express.Router();

var taskService = require('../services/taskService');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var tasks = taskService.getAll();
  var viewData = {
  	completedCount : tasks.reduce(function(prevResult, task){
  		return task.isCompleted ? ++prevResult : prevResult;
  	},0),
  	tasks : tasks
  };
  res.render('tasks/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	
	var newTaskData = {
		id : 0,
		name : req.body.newTaskName,
		isCompleted : false
	};
	var newTask = taskService.addNew(newTaskData);
	res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
	var id = parseInt(req.params.id);
	var taskToToggle = taskService.get(id);
	if (taskToToggle){
		taskToToggle.isCompleted = !taskToToggle.isCompleted;
	}
	taskService.update(id, taskToToggle);
	res.redirect('/tasks');
});

router.post('/removeCompleted', function(req, res, next){
	taskService
		.getAll()
		.filter(function(task){
			return task.isCompleted;
		})
		.forEach(function(taskToRemove){
			taskService.remove(taskToRemove.id);
		});
	res.redirect('/tasks');
})
module.exports = router;
