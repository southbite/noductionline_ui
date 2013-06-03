exports.edit = function(req, res, done){
	var _id = req.query['_id'];
	
	console.log('rendering code editor: ' + _id);
	
	this.render(res, 'edit', {'_id':_id}, 'layout_modal');
}.bind(this);