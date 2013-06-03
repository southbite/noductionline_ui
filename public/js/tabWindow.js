define(['jquery', 'underscore'], function ($, _) {
  'use strict';
  
  var container = null;
  
  var config = {
   
  };
  
  var activateTab = function(key)
  {
	  console.log('activate clicked: ' + key);
	  
	  container.find('li').attr('class','inactive');
	  container.find('#li' + key).attr('class','active');
		
      container.find('.content-container').find('iframe').css('display','none');
	  container.find('.content-container').find('#frm_' + key).css('display','block');
  }
  
  var api = {
	onBeforeTabAdded:null,
	onTabAdded:null,
	onTabClicked:null,
	onTabClickedInternal:function()
	{
		
	},
	tabs:{},
	selectTab:function(key, name, url, done)
	{
		try
		{
			console.log(key);
			console.log(name);
			console.log(url);

			console.log('container');
			console.log(container);
			
			if (this.tabs[key] != null)
			{
				activateTab(key);
			}
			else
			{
				
				console.log('appending to ul');
				
				var $li = $('<li id=li' + key + ' class="active"></li>')
				.append('<a href="#">' + name + '<button class="close closeTab">X</button>' + '</a>');
				
				console.log('appending to ul closeTab');
				
				$li.find('a').data('tab-key', key);
				
				console.log('appending to ul a');
				
				this.tabs[key] = {'name':name, 'url':url};
				container.find('li').attr('class','inactive');
				
				console.log(container.find('ul'));
				
				container.find('ul').append($li);
				
				container.find('.content-container').find('iframe').css('display','none');
				container.find('.content-container').append('<iframe id="frm_' + key + '" src="' + url + '" class="content-frame"></iframe>');

			}
			
			done();
		}
		catch(e)
		{
			console.log('error on tab select: ' + e);
			done(e);
		}
	},
	initialize: function(key, url)
	{
		container = $(config.selector);
		
		if (container.length == 0)
			throw "The container identified by selector: " + config.selector + ", does not exist.";
		
		container.html('');//clear the container
		
		var containerBaseHtml =  '<div class="content-tabheaders">';
		containerBaseHtml +=  '<ul class="nav nav-tabs">';
		
		/*
		containerBaseHtml +=  '    <li class="active">';
		containerBaseHtml +=  '    <a href="#">Dashboard</a>';
		containerBaseHtml +=  '  </li>';	
		 */			
		containerBaseHtml +=  ' </ul>';

		
		containerBaseHtml +=  ' </div>';

		containerBaseHtml +=  ' <div class="content-container"></div>';
		
		container.html(containerBaseHtml);
		
		container.on("click", ".closeTab", function (e) {
	        e.preventDefault();
	
	        console.log('close tab clicked');
	    });
		
		container.on("click", "a", function (e) {
	        e.preventDefault();
	
	        console.log('activate tab clicked');
	        activateTab($(this).data('tab-key'));
	    });
		
	}
  };
  //onBeforeTabAdded, onTabAdded, onTabClicked
  return function (options) {
	    if (typeof options === 'string') {
	      options = {selector: options};
	    }
	    if (!options.hasOwnProperty('selector')) {
	      throw new Error('A selector must be specified');
	    }
	    if (options.hasOwnProperty('onBeforeTabAdded')) {
	    	api.onBeforeTabAdded = options.onBeforeTabAdded;
	      }
	    if (options.hasOwnProperty('onTabAdded')) {
	    	api.onTabAdded = options.onTabAdded;
	      }
	    if (options.hasOwnProperty('onTabClicked')) {
	    	api.onTabClicked = options.onTabClicked;
	      }
	    
	    $.extend(config, options);
	    
	    return api;
	  };
  
});
