exports.default_render_parameters = [];

exports.render = function(res, view, parameters, layout)
{
	console.log('parameters');
	console.log(parameters);
	
	if (parameters == null)
		parameters = {};
	
	for (var default_param in this.default_render_parameters)
	{
		if (parameters[default_param] == null)
			parameters[default_param] = this.default_render_parameters[default_param];
	}
	
	if (layout == null)
		layout = '../views/layout.ejs';
	else
		layout = '../views/' + layout + '.ejs';
	
	parameters['layout'] = layout;
	
	view = '../views/' + this.name + '/' + view + '.ejs';
	
	//console.log(res);
	
	res.render(view, parameters);
	
};