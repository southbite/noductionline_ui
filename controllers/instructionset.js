
exports.edit = function(req, res, done){
	
	var _id = req.query['_id'];
	var _parentId = req.query['_parentid']; // parent robot id
	var type = req.query['type'];
	
	var default_code = this.settings.getSetting('defaultInstructionsJavascript');
	var mode = 'javascript';
	var deserialize = true;
	
	if (type == 'robot_controls')
	{
		default_code = this.settings.getSetting('defaultControlsJavascript');
		mode = 'html';
	}
	
	if (type == 'component')
	{
		default_code = this.settings.getSetting('defaultComponentJavascript');
	}
	
	var renderInstructionSet = function(code, _mode, _deserialize)
	{
		console.log('rendering code editor: ' + _id);
		console.log(this.settings);

		this.render(res, 'edit', {'_id':_id, 'default_code':code, 'mode':_mode, 'deserialize':_deserialize}, 'layout_modal');
	}.bind(this);
	
	
	if (_id != 'new')
	{
		this.api.getById('SourceCode', _id, function(e, response){
			//we load the fetched code here
			renderInstructionSet(response.code, mode, deserialize);
		});
		
		//we need to pull the code out of the api here
		var request = require('request');
		
		var api_call_url = this.api_url + '/' + this.account_id + '/SourceCode/' + _id;
		
		request.post(api_call_url, function(error, response, body){
			
			console.log('back from ' + api_call_url);
			//console.log(error);
			//console.log(response);
			console.log(body);
			
			res.redirect('/auth/login');
			
		}.bind(this));
	}
	else
	{
		//we load the default code here
		renderInstructionSet(default_code, mode, deserialize);
	}
	
}.bind(this);