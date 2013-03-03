var settings = require('./settings');
var controller_cache = {};
var controller_helper = require('./controllers/helper');

exports.execute_controller = function(req, res, done){
	try
	{
		var controller = getController(req.params.controller_name);
		var controllerMethod = controller[req.params.controller_method];
		
		controllerMethod(req, res, function(e, result){
			
			if (!done)
			{
				if (e)
					res.send(getResponse('FAILED', e.toString(), null));
				else
					res.send(getResponse('OK', '', result));
			}
			else
				done(e, result);
			
		});
	}
	catch(e)
	{
		res.send(getResponse('FAILED', e.toString(), null));
	}
}

exports.get_response = function(status, message, data)
{
	return getResponse(status, message, data);
}

function getResponse(status, message, data)
{
	return {'status':status, 'message':message, 'data':data};
}

function getController(controllerName)
{
	if (controller_cache[controllerName] == null)
	{
		var controllerInstance = require('./controllers/' + controllerName);
		var baseController = require('./controllers/base_controller');
		
		controllerInstance.api_url = settings.getSetting('api_url');
		controllerInstance.helper = controller_helper;
		controllerInstance.name = controllerName;
		
		for (var methodPointer in baseController)
		{
			controllerInstance[methodPointer] = baseController[methodPointer].bind(controllerInstance);
		}
			
		controller_cache[controllerName] = controllerInstance;
	}
	
	
	console.log(controller_cache[controllerName]);
	
	return controller_cache[controllerName];
}

function bindHelperMethods(controllerInstance, helper_methods)
{
	for (var methodName in helper_methods)
	{
		controllerInstance['helper'] = helper;
	}
}