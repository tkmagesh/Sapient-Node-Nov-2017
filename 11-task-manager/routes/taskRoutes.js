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

module.exports = router;
