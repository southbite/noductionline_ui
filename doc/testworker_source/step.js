
function Step()
{
	
}

Step.prototype = {
	currentStepIndex : -1,
	previousStepIndex : -1,
	initialize: function(_currentStepIndex, _previousStepIndex)
	{
		this.currentStepIndex = _currentStepIndex;
		this.previousStepIndex = _previousStepIndex;
	},
	executeCall: function(process, data)
	{
		try
		{
			console.log("executing step " + this.currentStepIndex, "previous index: " + this.previousStepIndex);
			
			this.execute(process, data, function (doneProcess, donedata)
			{
				if (this.currentStepIndex < (doneProcess.steps.length - 1))
				{
					var next = doneProcess.steps[this.currentStepIndex + 1];
					next.executeCall(doneProcess, this.getPreviousStepData(doneProcess, donedata));
				}
				else
					doneProcess.processComplete();
			}.bind(this));
		}
		catch(e)
		{
			this.fail(process, data, e);
		}
	},
	execute: function(process, data, done)
	{
		var robotExecute = function()
		{
			var currentData = {message:"Step " + this.currentStepIndex + "'s data"};
			
			if (data != null)
				currentData = {message:"Step " + this.currentStepIndex + "'s data, the previous data message: " + data.message};
			
			/*
			 Robot code goes in here
			 */
			
			this.logStep(process, currentData, function(){
				done(process, currentData);
			});
			
		}.bind(this);
		
		this.log(process, "Step " + this.currentStepIndex + " started", "info", robotExecute);
	},
	fail: function(process, data, e)
	{
		this.log(process, "Failure occurred:" + e, "error", function(){
			throw e;
		}.bind(this));
	},
	log: function(process, logmessage, logtype, done)
	{
		var currIndex = this.currentStepIndex;
		process.log.push({time:new Date().toString(), type: logtype, message: logmessage, step: currIndex});
		
		done();
	},
	logStep: function(process, stepdata, done)
	{
		process.completedSteps.push({step: this.currentStepIndex, data: stepdata});
		this.log(process, "Step " + this.currentStepIndex + " completed, message " + stepdata.message, "info", done);
	},
	getPreviousStepData: function(process, data)
	{
		if (this.previousStepIndex == (this.currentStepIndex - 1))
			return data;
		else
		{
			for (var completedStepIndex in process.completedSteps)
			{
				var completedStepInstance = process.completedSteps[completedStepIndex];
				if (completedStepInstance.step == this.previousStepIndex)
					return completedStepInstance.data;
			}
		}
	}
}

module.exports.Step = Step;
