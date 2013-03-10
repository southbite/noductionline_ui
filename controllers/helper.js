
exports.tag = function(type, commaSeparated)
{
	var commaSeparatedSplit = commaSeparated.split(',');
	var renderedHtml = '';
	for (var i in commaSeparatedSplit)
	{
		var resourceName = commaSeparatedSplit[i].toLowerCase().replace('.js','').replace('.css','');
		
		if (type.toLowerCase()=='js')
		{
			renderedHtml += "<script src=\"../js/" + resourceName + ".js\"></script>\r\n";
		}
		
		if (type.toLowerCase()=='css')
		{
			renderedHtml += "<link href=\"../css/" + resourceName + ".css\" rel=\"stylesheet\">\r\n";
		}
	}
	
	return renderedHtml;
}

exports.tryParseJSON = function(jsonString)
{
	try
	{
		return JSON.parse(jsonString);
	}
	catch(e)
	{
		return {result:'err',message:e};
	}
	
}