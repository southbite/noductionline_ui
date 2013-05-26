(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {
	
	 // constructor
    var app = function () {
    };

    // prototype
    app.prototype = {
		showMessage:function(messageText, messageType, fadeDuration)
		{
			//console.log("flashing message");
			//console.log(parent.showMessage);
			
			//console.log(parent.parent);
			console.log('$(document).parent');
			console.log($(document).parent);
			console.log($(window));
			
			if (window.IsMessageContainerPage != null)
			{
				//console.log("flashing message");
				var $messageDiv = $("#inner_message_div");

				this.hideMessage(0, function(){
					
					$(".message_container_text").html(messageText);
					
					var messageColor = "#D9E2E1";
					
					if (messageType == "warning")
						messageColor = "#F6F4DA";
					
					if (messageType == "error")
						messageColor = "#DF9496";
					
					if (messageType == "success")
						messageColor = "#bfffbf";
					
					$messageDiv.css('left', '400px');
					$messageDiv.css('background-color', messageColor);
					
					$messageDiv.show();
					
					$messageDiv.animate({
					      left: parseInt($messageDiv.css('left'), 10) == 0 ?
					        -$messageDiv.outerWidth() :
					        0
					    }, function(){
					    	//$(this).delay(delayMilliseconds)
					    	if (fadeDuration > 0)
					    		$messageDiv.delay(fadeDuration).fadeOut(1000);
					    	
					    }.bind(this));
					
				}.bind(this));
			}
			else
				parent.showMessage(messageText, messageType, fadeDuration);
		},
		hideMessage:function(fadeDuration, done)
		{
			var messageDiv = $("#inner_message_div");
			messageDiv.hide(fadeDuration, done);
		},
		dynamicSort:function(property, direction) {
			
			//console.log('sorting: ' + property + ' ' + direction);
			
			if (direction == "ASC")
			{
				return function (a,b) {
					return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				}
			}
			else if (direction == "ASCTXT")
			{
				return function (a,b) {
					
					var aCompare = a[property];
					var bCompare = b[property];
					
					if (aCompare == null || typeof aCompare === 'undefined')
						aCompare = "";
					
					if (bCompare == null || typeof bCompare === 'undefined')
						bCompare = "";
					
					return (aCompare.toLowerCase() < bCompare.toLowerCase()) ? -1 : (aCompare.toLowerCase() > bCompare.toLowerCase()) ? 1 : 0;
				}
			}
			else if (direction == "DESCTXT")
			{
				return function (a,b) {
					
					var aCompare = a[property];
					var bCompare = b[property];
					
					if (aCompare == null || typeof aCompare === 'undefined')
						aCompare = "";
					
					if (bCompare == null || typeof bCompare === 'undefined')
						bCompare = "";
					
					return (aCompare.toLowerCase() > bCompare.toLowerCase()) ? -1 : (aCompare.toLowerCase() < bCompare.toLowerCase()) ? 1 : 0;
				}
			}
			else if (direction == "DESC")
			{
				return function (a,b) {
					return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
				}
			}
			else if (direction == "ASCNUM")
			{
				return function (a,b) {
					return (parseFloat(a[property]) < parseFloat(b[property])) ? -1 : (parseFloat(a[property]) > parseFloat(b[property])) ? 1 : 0;
				}
			}
			else if (direction == "DESCNUM")
			{
				return function (a,b) {
					return (parseFloat(a[property]) > parseFloat(b[property])) ? -1 : (parseFloat(a[property]) < parseFloat(b[property])) ? 1 : 0;
				}
			}
			else if (direction == "ASCDATE")
			{
				return function (a,b) {
					return (new Date(a[property]) < new Date(b[property])) ? -1 : (new Date(a[property]) > new Date(b[property])) ? 1 : 0;
				}
			}
			else if (direction == "DESCDATE")
			{
				return function (a,b) {
					return (new Date(a[property]) > new Date(b[property])) ? -1 : (new Date(a[property]) < new Date(b[property])) ? 1 : 0;
				}
			}
			else
			{
				return function (a,b) {
					return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				}
			}
		},
		safeEncodeMarkup:function(markup)
		{
			return encodeURIComponent(markup).replace(/'/g,"%27");
		},
		serializeJSON:function(obj)
		{
			return this.safeEncodeMarkup(JSON.stringify(obj));
		},
		deserializeJSON:function(json)
		{
			return JSON.parse(decodeURIComponent(json));
		},
		getQuerystring:function(key, defaultVal, URL) {
			if (defaultVal == null) {
				defaultVal = "";
			}
			
			if (URL == null)
				URL = window.location.href;
			
			key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
			var qs = regex.exec(URL);
			
			if (qs == null) {
				return defaultVal;
			}
			else {
				//////console.log("decoding " + qs[1]);
				//////console.log("decoded " + decodeURIComponent(qs[1]));
				return decodeURIComponent(qs[1]);
			}
		},
		renderOptionTags:function(items, textFieldName, idFieldName, selectedId, sort)
		{
			var optionTags = '';
			
			if (idFieldName == null)
				idFieldName = textFieldName;
			
			if (sort != null)
			{
				items.sort(this.dynamicSort(textFieldName, sort));
			}
			
			for (var itemIndex in items)
			{
				var itemInstance = items[itemIndex];
				
				var selected = '';
				//console.log('comparing ' + itemInstance[idFieldName] + ' selectedId' + selectedId)
				if (itemInstance[idFieldName] == selectedId)
					selected = 'selected';
				
				 optionTags += '<option value=\"' + itemInstance[idFieldName] + '\" ' + selected + '>' + itemInstance[textFieldName]  + '</option>\r\n';
			}
			
			return optionTags;
		},
		modalWindowHide:function()
		{
			$('#app_model_window').modal('hide');
		},
		modalWindow:function(header, url, width, height, okFunction, okButton, cancelButton)
		{
			if (!okButton)
				okButton = 'OK';
			
			
			if (!cancelButton)
				cancelButton = 'Cancel';
			
			var modalWindow = "";
			modalWindow = '<div id="app_modal_window" style="width:' + width.toString() + 'px;height:' + height.toString() + 'px" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
			modalWindow += '<div style="width:100%;height:100%;position:relative">';
			modalWindow += '<div class="modal-header">';
		    modalWindow += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
		    modalWindow += header;
			modalWindow += '</div>';
			modalWindow += '<div class="modal-body">';
			modalWindow += '<iframe id="modalWindow_frame" src="' + url + '" style="width:100%;height:' + (height - 120).toString() + 'px;border:none"></iframe>';
			modalWindow += '</div>';
			modalWindow += '<div class="modal-footer" style="position:absolute;bottom:0;width:' + (width - 30).toString() + 'px">';
			modalWindow += '<button class="btn" data-dismiss="modal" aria-hidden="true">' + cancelButton + '</button>';
			modalWindow += '<button class="btn btn-primary" onclick="document.getElementById(\'modalWindow_frame\').contentWindow.' + okFunction + '();">' + okButton + '</button>';
			modalWindow += '</div>';
			modalWindow += '</div>';
			modalWindow += '</div>';
			
			$('div').remove('#app_modal_window');
			$('body').append(modalWindow);
			
			$('#app_modal_window').modal();
		}
    };
    
    return new app();
	
}));