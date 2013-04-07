define(['jquery'], function () {
    // private variables and functions
   
    // constructor
    var jquery_rest_adapter = function () {
    };

    jquery_rest_adapter.prototype = {
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
    return new jquery_rest_adapter();
});