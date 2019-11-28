var Todo = require('./models/todo');

module.exports = function(app){

	//get all todos
	app.get('/api/todos', function(req, res){
		Todo.find(function(err, data){
			if(err){
				res.send(err)
			}else{
				res.send(JSON.stringify(data));
			}
		});
	});

	//create a new todo
	app.post('/api/todos', function(req, res){
		Todo.create({text: req.body.text, done: false}, function(err, data){
			if(err){
				res.send(err);
			}else{
				Todo.find(function(err, todos){
					if(err){
						res.send(err);
					}else{
						res.send(JSON.stringify(todos));
					}
				});
			}
		});
	});

	//delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({_id: req.params.todo_id}, function(err, todo){
			if(err){
				res.send(err);
			}else{
				Todo.find(function(err, todos){
					if(err){
						res.send(err);
					}else{
						res.send(JSON.stringify(todos));
					}
				});
			}
		});
	});
};