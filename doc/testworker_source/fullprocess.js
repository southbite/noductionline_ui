var stepContainer = require('./step');

var step1 = new stepContainer.Step();
var step2 = new stepContainer.Step();
var step3 = new stepContainer.Step();

step1.initialize(0, -1);
step2.initialize(1, 0);
step3.initialize(2, 1);

var emitProcessLog = function(log)
{
	//console.log(log);
	for (var logItemIndex in log)
	{
		var logItemInstance = log[logItemIndex];
		console.log(logItemInstance);
	}
}

var process = {steps:[step1, step2, step3],
				log:[], 
				completedSteps:[],
				processComplete: function()
				{
					console.log("complete");
					emitProcessLog(this.log);
				}, 
				processFailed:function()
				{
					console.log("failed");
					emitProcessLog(this.log);
				}};

console.log(step1.currentStepIndex);

step1.executeCall(process, null);