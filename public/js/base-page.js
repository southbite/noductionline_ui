define(['jquery','restful_jquery_adapter','restful_api_client','app', 'bootstrap'], function ($, rest, api, app, bootstrap) {
	
	 // constructor
    var basePage = function () {
    };

    // prototype
    basePage.prototype = {
    	app:null,
    	api:null,
    	initialize:function()
		{
			console.log('rest');
			console.log(rest);
			
			console.log('api');
			console.log(api);
			
			this.app = app;
			$(document).ready(function() {
				try
				{
					
					if (window.onReadyAPIEvent != null)
					{
						this.getSession(function(session){
							api.initialize(session, rest);
							this.api = api;
							window.onReadyAPIEvent(api, session, app);	
						}.bind(this));
					}
					
					if (window.onDocumentReadyEvent != null)
					{
						window.onDocumentReadyEvent();
					}
				}
				catch(err)
				{
					console.log(err.toString());
				}
			 }.bind(this)); 
    			
		},
		setSession:function(sessionObj)
		{
			require(['jquery','app', 'jquery-cookie'], function($, app){
				var serialized = app.serializeJSON(sessionObj);
				console.log(serialized);//, 1, { path : "/" }
				$.cookie('noductionline_session', serialized, { path : "/" });
			});
		},
		getSession:function(done) {
			
			require(['jquery', 'app', 'jquery-cookie'], function($, app){
				console.log('session obj');
				console.log($.cookie('noductionline_session'));
				done(app.deserializeJSON($.cookie('noductionline_session')));
			});
		}
    };
    
    return new basePage();
	
});