function requireConfig()
{
	return {
		baseUrl:'/js',
		paths:{'jquery':'jquery-min'},
		shim: {
			'jquery': {
			      exports: '$'
			 },
			 'bootstrap': {
				 deps: ['jquery']
			 },
			 'jquery-cookie': {     //<-- cookie depends on Jquery and exports nothing
			        deps: ['jquery']
			 },
			 'underscore': {     //<-- cookie depends on Jquery and exports nothing
			       exports:'_'
			 },
			 'mustache': {  
			        deps: ['jquery'],
			        exports:'Mustache'
			 },
			 'app': {   
			        deps: ['jquery'],
			        exports:'app'
			 },
			 'app-vertical-menu': {     //<-- cookie depends on Jquery and exports nothing
			        deps: ['jquery', 'mustache']
			 },
			 'tbtree': {
			      deps: ['jquery', 'underscore'],
			      exports: 'tbtree'
			    }
	    }
	}
}