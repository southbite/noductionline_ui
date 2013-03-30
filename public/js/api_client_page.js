var onReadyAPIEvent = null;
var onDocumentReadyEvent = null;

$(document).ready(function() {
	try
	{
		var session = getSession();

		if (onReadyAPIEvent != null)
		{
			var api_client = new noductionline_api_client();
			api_client.api_url = api_url;
			api_client.rest_client = new jquery_rest_client();
			api_client.session_key = getSession().key;
			
			onReadyAPIEvent(api_client);	
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