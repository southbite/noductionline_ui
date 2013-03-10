
exports.design = function(req, res, done){
	this.render(res, 'design', {});
}.bind(this);

exports.create = function(req, res, done){
	console.log('rendering');
	this.render(res, 'create', {});
}.bind(this);

exports.confirm_complete = function(req, res, done){
	
	var request = require('request');
	
	console.log(req.query['account']);
	console.log(req.query['user']);
	
	var api_call_url = this.api_url + '/auth/confirm_account?account=' + req.query['account'] + '&user=' + req.query['user'];
	
	request.post(api_call_url, function(error, response, body){
		
		console.log('back from ' + api_call_url);
		//console.log(error);
		//console.log(response);
		console.log(body);
		
		res.redirect('/auth/login');
		
	}.bind(this));
	
}.bind(this);

exports.confirm = function(req, res, done){
	
	var createAccountPost = {};
	
	//console.log(req.body);
	
	//createAccountPost['account'] = {name:req.body['account_name'], description:req.body['account_name']};
	//createAccountPost['user'] = {emailaddress:req.body['user_email'], password:req.body['user_password']};
	
	createAccountPost['account_name'] = req.body['account_name'];
	createAccountPost['account_description'] = req.body['account_description'];
	createAccountPost['user_email'] = req.body['user_email'];
	createAccountPost['user_password'] = req.body['user_password'];
	createAccountPost['confirm_url'] = this.settings.getSetting('account_confirm_url');
	
	console.log(createAccountPost);
	console.log('createAccountPost');
	
	var request = require('request');
	var api_call_url = this.api_url + '/auth/create_account';
	
	console.log(api_call_url);
	
	request.post(this.api_url + '/auth/create_account', {form:createAccountPost}, function(error, response, body){
		
		console.log('back from ' + api_call_url);
		console.log(body);
		var sresponse = this.helper.tryParseJSON(body);
		
		console.log(sresponse.status);
		console.log(sresponse.message);
		
		if (sresponse.status == "SUCCESSFUL")
			this.render(res, 'confirm', sresponse['data']);
		else
			this.render(res, 'create', sresponse['data']);
		
		
	}.bind(this));
	
}.bind(this);