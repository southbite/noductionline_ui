define(['jquery', 'underscore'], function ($, _) {
  'use strict';
  
  var config = {
   
  };
  
  var api = {
	onBeforeTabAdded:null,
	onTabAdded:null,
	onTabClicked:null,
	onTabClickedInternal:function()
	{
		
		
	},
	activateTab:function(key)
	{
		this.container.find('li').attr('class','inactive');
		this.container.find('li #li' + key).attr('class','active');
		
		this.container.find('.content-container').find('iframe').css('display','none');
		this.container.find('.content-container').find('#frm_' + key).css('display','block');
	},
	container:null,
	tabs:{},
	selectTab:function(key, name, url, done)
	{
		try
		{
			console.log(key);
			console.log(name);
			console.log(url);

			
			if (this.tabs[key] != null)
			{
				this.activateTab(key);
			}
			else
			{
				
				console.log('appending to ul');
				
				var $li = $('<li id=li' + key + ' class="active"></li>')
				.append('<a href="#">' + name + '<button class="close closeTab">X</button>' + '</a>');
				
				
				this.tabs[key] = {'name':name, 'url':url};
				this.container.find('li').attr('class','inactive');
				
				console.log(this.container.find('ul'));
				
				this.container.find('ul').append($li);
				
				this.container.find('.content-container').find('iframe').css('display','none');
				this.container.find('.content-container').append('<iframe src="' + url + '" class="content-frame"></iframe>');
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
		var container = $(config.selector);
		
		if (container.length == 0)
			throw "The container identified by selector: " + config.selector + ", does not exist.";
		
		this.container = container;
		this.container.html('');//clear the container
		
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
		
		this.container.html(containerBaseHtml);
		
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
