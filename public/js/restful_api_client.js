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

define(function () {
    // private variables and functions

    // constructor
    var restful_api_client = function () {
    };

    // prototype
    restful_api_client.prototype = { api_url:'',
    		session_key:'',
    		rest_client:null,
    		account_id:null,
    		session:null,
    		initialize:function(sess, client){
    			this.api_url = sess.api_url;
    			this.session_key = sess.key;
    			this.rest_client = client;
    			this.session = sess;
    			
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
    			
    			this.rest_client.get(this.api_url + '/' + this.account_id + '/' + type + '/model?SESSIONTOKEN=' + this.session_key, function(err, response){
    						
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
    			
    		},
    		getAll:function(type, done)
    		{
    			this.validate(true,true);
    			
    		},
    		getById:function(type, id, done)
    		{
    			this.validate(true,true);
    			
    		},
    		create:function(type, obj, done)
    		{
    			this.validate(true,true);
    			
    		},
    		update:function(type, obj, id, done)
    		{
    			this.validate(true,true);
    			
    		},
    		destroy:function(type, id, done)
    		{
    			this.validate(true,true);
    			
    		}
    	};

    // return module
    return new restful_api_client();
});
