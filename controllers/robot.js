exports.create = function(req, res, done){
	console.log('rendering');
	var account_id = req.query['account'];
	var default_instruction_code = this.settings.getSetting('defaultInstructionsJavascript');
	var default_controls_code = this.settings.getSetting('defaultControlsJavascript');
	var default_components_code = this.settings.getSetting('defaultComponentJavascript');
	
	this.render(res, 'create', {'account_id':account_id, 'default_instruction_code':default_instruction_code,'default_controls_code':default_controls_code,'default_components_code':default_components_code}, 'layout_modal');
}.bind(this);