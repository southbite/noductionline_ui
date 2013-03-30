/*
	app.post('/auth/login', authcontroller.login);
	
	app.get('/auth/available_accounts', authcontroller.available_accounts);
	
	app.post('/:account_id/:type/find', controller.find);
	app.get('/:account_id/:type', controller.getAll);
	app.get('/:account_id/:type/:id', controller.getById);
	app.post('/:account_id/:type', controller.create);
	app.put('/:account_id/:type/:id', controller.update);
	app.delete('/:account_id/:type/:id', controller.destroy);
 */

function jquery_rest_client()
{
	
}

jquery_rest_client.prototype = {
	post:function(pURL, body, onResponse)
	{
		$.ajax({
			type: "POST",
			url: pURL,
			data: body,
			success: function (response) {
				console.log(response);
				onResponse(null, response);
			},
			error: function(req, status, message){
				onResponse(status + ":" + message, null);
			}
		});
	},
	get:function(pURL, onResponse)
	{
		$.ajax({
			type: "GET",
			url: pURL,
			success: function (response) {
				onResponse(null, response);
			},
			error: function(req, status, message){
				onResponse(status + ":" + message, null);
			}
		});
	},
	put:function(pURL, body, onResponse)
	{
		$.ajax({
			type: "PUT",
			url: pURL,
			data: body,
			success: function (response) {
				onResponse(null, response);
			},
			error: function(req, status, message){
				onResponse(status + ":" + message, null);
			}
		});
	},
	'delete':function(pURL, body, response)
	{
		$.ajax({
			type: "DELETE",
			url: pURL,
			data: body,
			success: function (response) {
				onResponse(null, response);
			},
			error: function(req, status, message){
				onResponse(status + ":" + message, null);
			}
		});
	}
}

function noductionline_api_client()
{
	
}

noductionline_api_client.prototype = {
	api_url:'',
	session_key:'',
	rest_client:null,
	validate:function(validate_session_key)
	{
		
		if (this.api_url == '')
			throw "Please configure the api_url property";
		
		if (validate_session_key && this.session_key == '')
			throw "Please configure the session key property";
		
		if (this.rest_client == null)
			throw "Please set up the rest client you wish to use to access the api";
		
	},
	login:function(usr, pwd, done){
		this.validate(false);
		
		this.rest_client.post(this.api_url + '/auth/login', {user_email:usr, pwd:pwd}, function(err, response){
			
			if (!err)
			{
				if (response.status == 'SUCCESSFUL')
				{
					this.session_key = response.data['key'];
					done(null, response.data);
				}
				else
				{
					done(response);
				}
			}
			else
				throw err;
			
		});
	},
	get_available_accounts:function(done)
	{
		this.validate(true);
		
		this.rest_client.get(this.api_url + '/auth/available_accounts?SESSIONTOKEN=' + this.session_key, function(err, response){
			
			console.log('made call');
			console.log(err);
			console.log(response);
			if (!err)
			{
				if (response.status == 'SUCCESSFUL')
				{
					console.log(response);
					//this.session_key = response.data['key'];
					done(null, response.data);
				}
				else
				{
					done(response);
				}
			}
			else
				throw err;
			
		});
		
	},
	find:function(account_id, type, criteria, done)
	{
		this.validate(true);
		
	},
	getAll:function(account_id, type, done)
	{
		this.validate(true);
		
	},
	getById:function(account_id, type, id, done)
	{
		this.validate(true);
		
	},
	create:function(account_id, type, obj, done)
	{
		this.validate(true);
		
	},
	update:function(account_id, type, obj, id, done)
	{
		this.validate(true);
		
	},
	destroy:function(account_id, type, id, done)
	{
		this.validate(true);
		
	}
}