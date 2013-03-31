var onReadyAPIEvent = null;
var onDocumentReadyEvent = null;

$(document).ready(function() {
	try
	{
		var session = getSession();

		console.log('sess');
		console.log(session);
		
		if (onReadyAPIEvent != null)
		{
			console.log('sess');
			console.log(session);
			
			var api_client = new noductionline_api_client();
			api_client.initialize(session, new jquery_rest_client());
			
			onReadyAPIEvent(api_client, session);	
		}
		
		if (onDocumentReadyEvent != null)
		{
			onDocumentReadyEvent();
		}
	}
	catch(err)
	{
		console.log(err.toString());
	}
 }); 

/*
  info,error,warning,success
 */
function flash(message,type,fadeDuration)
{
	showMessage(message, type, fadeDuration);
}

function setSession(sessionObj)
{
	var serialized = serializeJSON(sessionObj);
	console.log(serialized);//, 1, { path : "/" }
	$.cookie('noductionline_session', serialized, { path : "/" });
}

function getSession()
{
	console.log('session obj');
	console.log($.cookie('noductionline_session'));
	return deserializeJSON($.cookie('noductionline_session'));
}