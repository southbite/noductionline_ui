var client = {
			request:require('request'),
    		post:function(pURL, pBody, onResponse)
    		{
    			/*
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
    			*/
    			
    			this.request.post({url:pURL, body:pBody}, function(e, response, body){
    				if (e)
    				{
    					onResponse(e, response);
    				}
    				else
    				{
    					onResponse(null, body);
    				}
    			});
    		},
    		get:function(pURL, onResponse)
    		{
    			/*
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
    			*/
    			
    			this.request.get({url:pURL}, function(e, response, body){
    				if (e)
    				{
    					onResponse(e, response);
    				}
    				else
    				{
    					onResponse(null, body);
    				}
    			});
    		},
    		put:function(pURL, pBody, onResponse)
    		{
    		    /*
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
    			*/
    			
    			this.request.put({url:pURL, body:pBody}, function(e, response, body){
    				if (e)
    				{
    					onResponse(e, response);
    				}
    				else
    				{
    					onResponse(null, body);
    				}
    			});
    		},
    		'delete':function(pURL, pBody, response)
    		{
    			/*
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
    			*/
    			
    			this.request.del({url:pURL, body:pBody}, function(e, response, body){
    				if (e)
    				{
    					onResponse(e, response);
    				}
    				else
    				{
    					onResponse(null, body);
    				}
    			});
    		}
    	};

module.exports.adapter = client;