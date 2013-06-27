
exports.edit = function(req, res, done){
	
	var _id = req.query['_id'];
	var _projectId = req.query['_projectId']; 
	
	console.log('_projectId');
	console.log(_projectId);
	
	var type = req.query['type'];
	
	var _default_code = this.settings.getSetting('defaultInstructionsJavascript');
	var _mode = 'javascript';
	
	if (type == 'robot_controls')
	{
		_default_code = this.settings.getSetting('defaultControlsJavascript');
		_mode = 'html';
	}
	
	if (type == 'component')
	{
		_default_code = this.settings.getSetting('defaultComponentJavascript');
	}
	
	var renderInstructionSet = function(object, mode)
	{
		
		object['projectId'] = _projectId;
		
		this.render(res, 'edit', {object:object, mode:mode}, 'layout_modal');
	}.bind(this);
	
	
	if (_id != 'new')
	{
		this.api.getById('SourceCode', _id, function(e, response){
			//we load the fetched code here
			
			console.log('Fetched source code');
			console.log(response);
			
			renderInstructionSet(response, _mode);
		});
		
		/*
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
	*/
	}
	else
	{
		//we load the default code here
		renderInstructionSet({_id:'new', name:'', version:'', description:'', systemVersion:0, projectId:_projectId, code:_default_code}, mode);
	}
	
}.bind(this);