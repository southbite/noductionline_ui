var settings = require('./settings');
var controller_cache = {};
var controller_helper = require('./controllers/helper');

exports.execute_controller = function(req, res, done){
	try
	{
		var controller = getController(req.params.controller_name, req.cookies);
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

function getController(controllerName, cookies)
{
	if (controller_cache[controllerName] == null)
	{
		var controllerInstance = require('./controllers/' + controllerName);
		var baseController = require('./controllers/base_controller');
		
		controllerInstance.api_url = settings.getSetting('api_url');
		controllerInstance.helper = controller_helper;
		controllerInstance.name = controllerName;
		controllerInstance.settings = settings;
		
		if (cookies['noductionline_session'] != null)
		{
			controllerInstance.session = JSON.parse(decodeURIComponent(cookies['noductionline_session']));
			console.log(controllerInstance.session);
			
			var controller_api = require('./controllers/api').client;
			var controller_adapter = require('./controllers/api_adapter').adapter;
			
			controller_api.initialize(controllerInstance.session, controller_adapter);
			controllerInstance.api = controller_api;
			
			console.log(controllerInstance.api);
		}
		else
			controllerInstance.session = null;
		
		console.log('cookies');
		console.log(cookies);
		
		for (var methodPointer in baseController)
		{
			if (baseController[methodPointer]['bind'])
				controllerInstance[methodPointer] = baseController[methodPointer].bind(controllerInstance);
			else
				controllerInstance[methodPointer] = baseController[methodPointer];
		}
			
		controllerInstance.default_render_parameters['api_url'] = settings.getSetting('api_url')
		
		controller_cache[controllerName] = controllerInstance;
	}
	
	
	console.log(controller_cache[controllerName]);
	
	return controller_cache[controllerName];
}