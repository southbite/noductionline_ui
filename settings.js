
var settings = {
	api_url:'http://localhost:3001',
	account_confirm_url:'http://localhost:3000/account/confirm'
};

exports.getSetting = function(key)
{
	return settings[key];
}