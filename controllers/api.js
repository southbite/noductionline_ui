var restful_api_client = { api_url:'',
	session_key:'',
	rest_client:null,
	account_id:null,
	session:null,
	initialize:function(sess, client){
		this.api_url = sess.api_url;
		this.session_key = sess.key;
		this.rest_client = client;
		this.session = sess;
		
		console.log('session for api_client');
		console.log(sess);
		
		if (sess['account'] != null)
			this.account_id = sess.account.id;
	},
	validate:function(validate_session_key, validate_account_id)
	{
		
		if (this.api_url == '')
			throw "Please configure the api_url property";
		
		if (validate_session_key && this.session_key == '')
			throw "Please configure the session_key property";
		
		if (validate_account_id && this.account_id == '')
			throw "Please configure the account_id property";
		
		
		if (this.rest_client == null)
			throw "Please set up the rest client you wish to use to access the api";
		
	},
	login:function(usr, pwd, done){
		this.validate(false,false);
		
		this.rest_client.post(this.api_url + '/auth/login', {user_email:usr, pwd:pwd}, function(err, response){
			
			if (!err)
			{
				if (response.status == 'OK')
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
				done(err);
			
		});
	},
	get_available_accounts:function(done)
	{
		this.validate(true,false);
		
		this.rest_client.get(this.api_url + '/auth/available_accounts?SESSIONTOKEN=' + this.session_key, function(err, response){
			
			console.log('made call');
			console.log(err);
			console.log(response);
			if (!err)
			{
				if (response.status == 'OK')
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
				done(err);
			
		});
		
	},
	getModel:function(type, done)
	{
		this.validate(true,true);
		
		this.rest_client.get(this.api_url + '/' + this.session.account._id + '/' + type + '/model?SESSIONTOKEN=' + this.session_key, function(err, response){
					
					if (!err)
					{
						console.log(response);
						
						if (response.status == 'OK')
						{
							done(null, response.data);
						}
						else
						{
							done(response);
						}
					}
					else
						done(err);
					
				});
		
	},
	find:function(type, criteria, done)
	{
		this.validate(true,true);
		
		this.rest_client.post(this.api_url + '/' + this.session.account._id + '/' + type + '/find?SESSIONTOKEN=' + this.session_key, criteria, function(err, response){
			
			if (!err)
			{
				console.log(response);
				
				if (response.status == 'OK')
				{
					done(null, response.data);
				}
				else
				{
					done(response);
				}
			}
			else
				done(err);
			
		});
	},
	getAll:function(type, done)
	{
		this.validate(true,true);
		
		this.rest_client.get(this.api_url + '/' + this.session.account._id + '/' + type + '?SESSIONTOKEN=' + this.session_key, function(err, response){
			
			if (!err)
			{
				console.log(response);
				
				if (response.status == 'OK')
				{
					done(null, response.data);
				}
				else
				{
					done(response);
				}
			}
			else
				done(err);
			
		});
		
	},
	getById:function(type, id, done)
	{
		this.validate(true, true);
		
		this.rest_client.get(this.api_url + '/' + this.session.account._id + '/' + type + '/' + id + '?SESSIONTOKEN=' + this.session_key, function(err, response){
			if (!err)
			{
				if (response.status == 'OK')
				{
					console.log('getById worked');
					done(null, response.data);
				}
				else
				{
					console.log('getById failed');
					console.log(response);
					console.log(JSON.parse(response).status);
					
					console.log(response.data);
					console.log(response.status);
					done(response);
				}
			}
			else
				done(err);
			
		});
	},
	create:function(type, obj, done)
	{
		this.validate(true,true);
		
		this.rest_client.post(this.api_url + '/' + this.session.account._id + '/' + type + '?SESSIONTOKEN=' + this.session_key, obj, function(err, response){
			
			if (!err)
			{
				console.log(response);
				
				if (response.status == 'OK')
				{
					done(null, response.data);
				}
				else
				{
					done(response);
				}
			}
			else
				done(err);
			
		});
		
	},
	update:function(type, obj, id, done)
	{
		this.validate(true,true);
		
		console.log('updating');
		
		this.rest_client.put(this.api_url + '/' + this.session.account._id + '/' + type + '?SESSIONTOKEN=' + this.session_key, obj, function(err, response){
			if (!err)
			{
				console.log(response);
				
				if (response.status == 'OK')
				{
					done(null, response.data);
				}
				else
				{
					done(response);
				}
			}
			else
				done(err);
			
		});
		
	},
	destroy:function(type, id, done)
	{
		this.validate(true,true);
		
	}
};

module.exports.client = restful_api_client;