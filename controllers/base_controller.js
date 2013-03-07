exports.render = function(res, view, parameters, layout)
{
	console.log('parameters');
	console.log(parameters);
	
	if (parameters == null)
		parameters = {};
	
	if (layout == null)
		layout = '../views/layout.ejs';
	
	parameters['layout'] = layout;
	
	view = '../views/' + this.name + '/' + view + '.ejs';
	
	//console.log(res);
	
	res.render(view, parameters);
	
};