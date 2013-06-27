define(['jquery', 'ace'], function ($, ace) {
	
	var config = {
			   
	  };
	
	 var api = {
		editor:null,
		setSource:function(content, deserialize)
		{
			var deserializedContent = content;
			if (deserialize)
				deserializedContent = decodeURIComponent(content);
			
			this.editor.setValue(deserializedContent);
		},
		getSource:function(serialize)
		{
			var returnSource = this.editor.getValue();
			
			if (serialize)
				returnSource = encodeURIComponent(returnSource).replace(/'/g,"%27");
			
			return returnSource;
		},
		initialize:function(source, mode, deserialize, done){
			try
			{
				
				
				this.editor = ace.edit(config.selector);
				
				if (source == null)
					source = '/*ADD CODE HERE*/';
				
				if (mode == null)
					mode = 'javascript';
				
				if (deserialize == null)
					deserialize = false;
				
				/*
				editor.setTheme("ace/theme/mono_industrial");
				editor.getSession().setMode("ace/mode/javascript");
				*/
				//editor.renderer.setTheme("ace/theme/mono_industrial");
				this.editor.getSession().setMode("ace/mode/" + mode);
				
				console.log('setting source');
				
				console.log(this);
				
				this.setSource(source, deserialize);
				
				console.log('source set');
				
				//editor.resize(true);
				
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