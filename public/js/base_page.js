var onReadyAPIEvent = null;
var onDocumentReadyEvent = null;

function initializeRequirements()
{
	
	require.config({
		baseUrl:'/js',
		paths:{'jquery':'jquery-min'},
		shim: {
			'jquery': {
			      exports: '$'
			 },
			 'jquery-cookie': {     //<-- cookie depends on Jquery and exports nothing
			        deps: ['jquery']
			 },
			 'underscore': {     //<-- cookie depends on Jquery and exports nothing
			       
			 },
			 'mustache': {  
			        deps: ['jquery'],
			        exports:'Mustache'
			 },
			 'app': {   
			        deps: ['jquery']
			 },
			 'app-vertical-menu': {     //<-- cookie depends on Jquery and exports nothing
			        deps: ['jquery', 'mustache']
			 }
	    }
	});
	
	require(['jquery','restful_jquery_adapter','restful_api_client','app'], function($, rest, api, app){
		
		console.log('rest');
		console.log(rest);
		
		console.log('api');
		console.log(api);
		
		$(document).ready(function() {
			try
			{
				if (window.onReadyAPIEvent != null)
				{
					getSession(function(session){
						api.initialize(session, rest);
						
						window.onReadyAPIEvent(api, session, app);	
					});
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
		 }); 
		
	});
}

function setSession(sessionObj)
{	
	require(['jquery','app', 'jquery-cookie'], function($, app){
		var serialized = app.serializeJSON(sessionObj);
		console.log(serialized);//, 1, { path : "/" }
		$.cookie('noductionline_session', serialized, { path : "/" });
	});
}

function getSession(done)
{
	require(['jquery', 'app', 'jquery-cookie'], function($, app){
		console.log('session obj');
		console.log($.cookie('noductionline_session'));
		done(app.deserializeJSON($.cookie('noductionline_session')));
	});
}