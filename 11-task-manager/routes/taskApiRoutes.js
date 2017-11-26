var express = require('express');
var router = express.Router();

var taskService = require('../services/taskService');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(taskService.getAll());
});

router.post('/', function(req, res, next){
	var taskToAdd = req.body;
	var newTask = taskService.addNew(taskToAdd);
	res.status(201).json(newTask);
});

router.put('/:id', function(req, res, next){
	var taskToUpdate = req.body;
	taskService.update(parseInt(req.params.id), taskToUpdate);
	res.status(200).json(taskToUpdate);
});

router.delete('/:id', function(req, res, next){
	taskService.remove(parseInt(req.params.id))
	res.status(200).json({});
});
module.exports = router;
