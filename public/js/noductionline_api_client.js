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
	post:function(url, body, response)
	{
		
	},
	get:function(url, body, response)
	{
		
	},
	put:function(url, body, response)
	{
		
	},
	'delete':function(url, body, response)
	{
		
	}
}

function noductionline_api_client()
{
	
}

noductionline_api_client.prototype = {
	api_url:'',
	session_key:'',
	login:function(usr, pwd){
		
	},
	get_available_accounts:function()
	{
		
	},
	find:function(account_id, type, criteria)
	{
		
	},
	getAll:function(account_id, type)
	{
		
	},
	getById:function(account_id, type, id)
	{
		
	},
	create:function(account_id, type, obj)
	{
		
	},
	update:function(account_id, type, obj, id)
	{
		
	},
	destroy:function(account_id, type, id)
	{
		
	}
}