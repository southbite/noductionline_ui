exports.render = function(res, view, parameters, layout)
{
	parameters['helper'] = this.helper;
	
	if (layout == null)
		layout = '../views/layout.ejs';
	
	parameters['layout'] = layout;
	
	view = '../views/' + this.name + '/' + view + '.ejs';
	
	//console.log(res);
	
	res.render(view, parameters);
	
};