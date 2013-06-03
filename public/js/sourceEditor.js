define(['jquery', 'ace'], function ($, ace) {
	
	var config = {
			   
	  };
	
	 var api = {
		editor:null,
		initialize:function(done){
			try
			{
				editor = ace.edit(config.selector);
				/*
				editor.setTheme("ace/theme/mono_industrial");
				editor.getSession().setMode("ace/mode/javascript");
				*/
				//editor.renderer.setTheme("ace/theme/mono_industrial");
				editor.getSession().setMode("ace/mode/javascript");
				
				editor.resize(true);
				
				done();
			}
			catch(e)
			{
				console.log('source editor init error: ' + e);
				done(e);
			}
		}
	 }
	 
	 return function (options) {
		    if (typeof options === 'string') {
		      options = {selector: options};
		    }
		    if (!options.hasOwnProperty('selector')) {
		      throw new Error('A selector must be specified');
		    }
		    
		    $.extend(config, options);
		    
		    return api;
		  };
	
});