
var settings = {
	api_url:'http://localhost:3001'
};

exports.getSetting = function(key)
{
	return settings[key];
}