exports.edit = function(req, res, done){
	var _id = req.query['_id'];
	
	console.log('rendering code editor: ' + _id);
	console.log(this.settings);
	
	var default_code = this.settings.getSetting('defaultInstructionsJavascript');
	var mode = 'javascript';
	var deserialize = true;
	
	this.render(res, 'edit', {'_id':_id, 'default_code':default_code, 'mode':mode, 'deserialize':deserialize}, 'layout_modal');
}.bind(this);