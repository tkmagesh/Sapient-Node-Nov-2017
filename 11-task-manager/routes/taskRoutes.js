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
			return task.id > prevResult ? prevResult : task.id;
		}, 0) + 1;
	var newTask = {
		id : id,
		name : taskName,
		isCompleted : false
	};
	tasks.push(newTask);
	res.redirect('/tasks');
});

module.exports = router;
