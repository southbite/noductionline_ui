exports.login = function(req, res, done)
{
	this.render(res, 'login', {api_url:this.api_url}, 'layout_studio');
}.bind(this);

exports.logout = function(req, res, done)
{
	//TODO - some kind of killing if the session
	res.redirect('/site/home');
	
}.bind(this);
