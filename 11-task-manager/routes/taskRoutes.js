var express = require('express');
var router = express.Router();

var tasks = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true},
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  var viewData = {
  	tasks : tasks
  };
  res.render('tasks/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var taskName = req.body.newTaskName,
		id = tasks.reduce(function(prevResult, task){
			return task.id > prevResult ? task.id : prevResult;
		}, 0) + 1;
	var newTask = {
		id : id,
		name : taskName,
		isCompleted : false
	};
	tasks.push(newTask);
	res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
	var id = parseInt(req.params.id);
	var taskToToggle = tasks.filter(function(task){
		return task.id === id;
	})[0];
	if (taskToToggle){
		taskToToggle.isCompleted = !taskToToggle.isCompleted;
	}
	res.redirect('/tasks');
});

router.post('/removeCompleted', function(req, res, next){
	tasks = tasks.filter(function(task){ 
		return !task.isCompleted;
	});
	res.redirect('/tasks');
})
module.exports = router;
