/*global define:true*/

define(['jquery', 'underscore'], function ($, _) {
  'use strict';

  var bus = (function () {
    var subscriptions = {};

    return {
      subscribe: function (event, callback) {
        if (!subscriptions.hasOwnProperty(event)) {
          subscriptions[event] = [];
        }
        subscriptions[event].push(callback);
      },
      unsubscribe: function (event, callback) {
        if (!this.hasSubscriptions(event)) {
          return;
        }
        subscriptions[event] = _.without(subscriptions[event], callback);
      },
      unsubscribeAll: function (callback) {
        var _this = this;
        this.subscribedEvents(callback).forEach(function (e) {
          _this.unsubscribe(e, callback);
        });
      },
      hasSubscriptions: function (event) {
        if (!event) {
          return Object.keys(subscriptions).length > 0;
        }
        return subscriptions.hasOwnProperty(event) &&
          subscriptions[event].length > 0;
      },
      subscribedEvents: function (callback) {
        var subscribedEvents = [];
        Object.keys(subscriptions).forEach(function (key) {
          if (subscriptions[key].indexOf(callback) > -1) {
            subscribedEvents.push(key);
          }
        });
        return _.uniq(subscribedEvents).sort();
      },
      publish: function (event, context) {
        if (!this.hasSubscriptions(event)) {
          return;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        subscriptions[event].forEach(function (e) {
          e.apply(context || null, args);
        });
      }
    }
  }());

  $.fn.toggleClass = function (a, b) {
    this.each(function () {
      var $this = $(this);
      if ($this.hasClass(a)) {
        $this.removeClass(a).addClass(b);
      } else if ($this.hasClass(b)) {
        $this.removeClass(b).addClass(a);
      } else {
        $this.addClass(a);
      }
    });
  };

  var config = {
    icons: {
      expanded: 'icon-chevron-down',
      collapsed: 'icon-chevron-right',
      leaf: 'icon-file',
      loading: 'ico-loading'
    }
  };

  /*
  
  
  
  $("#insert").on('click', function() {
    var newLi = $("<li><a href='#'>"+$("#fruit").val()+"</a></li>").hide();
    $('li', 'ul').add(newLi.fadeIn(800)).sort(sortAlpha).appendTo('ul');
  });
  
 
  
  */
  
  
  
  var updateTree = function ($container, tree, items, parentItemID, nameProperty, idProperty, modelType, sort, done) {
	try
	{
		var sortAlpha = function(a,b){  
			
			////console.log('sorting');
			////console.log(a.innerText);
			////console.log(b.innerText);
			
			if (a.innerText.toLowerCase() == b.innerText.toLowerCase())
				return 0;
			
		    return a.innerText.toLowerCase() > b.innerText.toLowerCase() ? 1 : -1;  
		};
		
		var parentItem = null;
		
		if (parentItemID == null) // means this is a base collection
		{
			//$container.html(''); umm, no cannot do this - as this is an update
			
			var containerUL = $container.find('ul:first-child');
			
			////console.log('containerUL');
			////console.log(containerUL);
			
			if (containerUL.length == 0)
				parentItem = $('<ul></ul>').appendTo($container);
			else
				parentItem = containerUL;
			
			//console.log('parentItem');
			//console.log(parentItem);
			
			console.log('parent is null');
		}
		else
		{
			parentItem = $('#' + parentItemID);
			
			if (parentItem.length == 0)
				throw "The parent item with id: " + parentItemID + ", does not exist.";
			
			console.log('parent is not null');
			console.log(parentItem);
			
			var parentItemUL = parentItem.find('ul:first-child');
			
			if (parentItemUL.length == 0)
				parentItem.append('<ul id=\'ul' + parentItemID + '\'></ul>');
			
			console.log('appended ul');
			
			parentItem = parentItem.find('#ul' + parentItemID);
			//console.log(parentItem);
		}
			
	    for (var itemIndex in items.list) {
	    
	      var itemInstance = items.list[itemIndex];
	      
	      ////console.log('itemInstance');
	      ////console.log(itemInstance);
	      
	      ////console.log('nameProperty');
	      ////console.log(nameProperty);
	      
	      var itemName = itemInstance[nameProperty];
	      
	      if (itemName == null)
	    	  itemName = "No name";
	      
	      var itemId = itemInstance[idProperty];
	      
	      /*
	      if (!obj.hasOwnProperty(p)) {
	        continue;
	      }//huh?
	      */
	      
	      ////console.log(itemId);
	      
	      var $li = $('<li id=\'' + modelType + '_' + itemId + '\'></li>')
	        .append('<i></i>')
	        .append('<a></a>')
	        .attr('data-path', modelType + '_' + itemId)
	        .attr('data-state', 'collapsed')
	        .attr('model-type', modelType)
	        .attr('object-id', itemId)
	        .addClass('branch')
	        .data('item-data', itemInstance)
	        .data('parent-data', items.parent)
	        .hide();
	        
	      $li.find('a').append(itemName);
	      $li.find('i').first().addClass(config.icons.collapsed);
	      
	      tree.beforeItemAdd($li, tree, function(addItem){
	    	  
	    	  if (addItem)
	    	  {
	    		  //console.log('beforeItemAddEvent true');
	    		  if (sort)
	    			  $(parentItem.find('li'), parentItem).add($li.fadeIn(800)).sort(sortAlpha).appendTo(parentItem);
	    		  else
	    			  $(parentItem.find('li'), parentItem).add($li.fadeIn(800)).appendTo(parentItem);
	    		  
	    		  tree.itemAdded($li, tree);
	    	  }
	    	  
	      });
	      
	     
	      
	     // $(parentItem).add($li.fadeIn(800)).sort(sortAlpha);
	        
	      //.appendTo(parentItem);
	      
	      /*
	      if (_.isObject(value)) {
	        $li.addClass('branch');
	        $li.find('a').text(p);
	        $li.find('i').first().addClass(config.icons.collapsed);
	        updateTree(value, $li);
	      } else {
	      */
	        
	      /*}*/
	        
	      
	    }
	    
	    //parentItem.find('li').sort(sortAlpha);
	    //parentItem.find('li').fadeIn(800);
	}
	catch(e)
	{
		//console.log('update failed');
		//console.log(e);
		done(e);
	}
    
   done(null); 
   
  };

  /*
  var triggerPathEvent = function ($li, evt) {
    var segments = [];
    segments.push($li.attr('data-path'));
    $li.parents('li').each(function (i, li) {
      segments.push($(li).attr('data-path'));
    });
    var fullPath = segments.reverse().join('/');
    bus.publish(evt, {path: fullPath});
  };
   */
  
  var setLeafState = function ($li, state) {
	  
	  //[myc="blue"],[myid="1"],[myid="3"]
	  
	  if (state == 'expand')
	  {
		  $li.find('> ul').show();
		  
	      $li.find('.' + config.icons.collapsed + ',' + '.' + config.icons.loading)
	        .removeClass(config.icons.collapsed)
	        .removeClass(config.icons.loading)
	        .addClass(config.icons.expanded);
	      
	      $li.attr('data-state', 'expanded');
	      //$li.addClass('highlighted');
	  }
	  
	  if (state == 'collapse')
	  {
		  $li.find('> ul').hide();
		  
		  $li.find('.' + config.icons.expanded + ',' + '.' + config.icons.loading)
	        .removeClass(config.icons.expanded)
	        .removeClass(config.icons.loading)
	        .addClass(config.icons.collapsed);
		  
	      $li.attr('data-state', 'collapsed');
	      //$li.addClass('highlighted');
	  }
	  
	  if (state == 'busy')
	  {

		  $li.find('.' + config.icons.collapsed + ',' + '.' + config.icons.expanded)
	        .removeClass(config.icons.collapsed)
	        .removeClass(config.icons.expanded)
	        .addClass(config.icons.loading);
		  
	      //console.log('prev data state ' + $li.attr('prev-data-state'));
		  
		  $li.attr('prev-data-state',  $li.attr('data-state'));
	      $li.attr('data-state', 'expanded');
	  }
	  
  };

  var api = {
	beforeItemAdd:function(item, tree, done){
		done(true);
	},
	itemAdded:function(item, tree, done){
		
	},
	itemClicked:function(item, tree, done){
		
	},
	itemExpanded:function(item, tree, done){
		
	},
	treeMenu:null,
	initialize: function (done){
	
		try
		{
			this.treeMenu = $(config.selector).addClass('tbtree');
			 var itemClickedEvent = this.itemClicked;
			 var itemExpandedEvent = this.itemExpanded;
			 var $tree = this.treeMenu;
			 var $treeAPI = this;
			 
			 $tree.on('click', 'a', function (e) {
				 
					console.log('item clicked: ');
					  
			        var $li = $(this).parent('li');
			        
			        console.log($li);
			        
			        setLeafState($li, 'busy');
			        
			        $tree.find('li').removeClass('highlighted');
			          	
			          	// triggerPathEvent($li, 'highlighted');
			          	//toggleExpandState($li);
			        
			        itemClickedEvent($li, $treeAPI , function(){
			        	 setLeafState($li, 'collapse');
			        	 $li.addClass('highlighted');
		  	        }.bind(this));
			        
			        return false;
				 
			 });
			 
			 $tree.on('click', 'i', function (e) {
			  
			  	console.log('item expanded: ');
			  
		        var $li = $(this).parent('li');
		        
		        console.log($li);
		        
		        setLeafState($li, 'busy');
		        
		        if ($li.attr('prev-data-state') == 'expanded')
		        		setLeafState($li, 'collapse');
		        else
		        {
		        	itemExpandedEvent($li, $treeAPI , function(){
		  	        	setLeafState($li, 'expand');
		  	        }.bind(this));
		        }

		        return false;
		      }); 
			 done();
		}
		catch(e)
		{
			done(e);
		}
	},
    update: function (data, parentItemID, nameProperty, idProperty, modelType, sort, done) {
    	
      updateTree(this.treeMenu, this, data, parentItemID, nameProperty, idProperty, modelType, sort, function(e){
    	      done(e);
      }.bind(this));
    },

    filter: function (query) {
      ////console.log(query);
      return this;
    },

    on: function (evt, callback) {
      bus.subscribe(evt, callback);
      return this;
    }
  };

  return function (options) {
    if (typeof options === 'string') {
      options = {selector: options};
    }
    if (!options.hasOwnProperty('selector')) {
      throw new Error('A selector must be specified');
    }
    if (options.hasOwnProperty('beforeItemAdd')) {
    	api.beforeItemAdd = options.beforeItemAdd;
      }
    if (options.hasOwnProperty('itemAdded')) {
    	api.itemAdded = options.itemAdded;
      }
    if (options.hasOwnProperty('itemClicked')) {
    	api.itemClicked = options.itemClicked;
      }
    
    $.extend(config, options);
    return api;
  };

});


