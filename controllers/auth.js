exports.login = function(req, res, done)
{
	this.render(res, 'login', {api_url:this.api_url});
}.bind(this);
