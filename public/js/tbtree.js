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
      leaf: 'icon-file'
    }
  };

  var updateTree = function (items, $parent, parentItemID, nameProperty, idProperty, modelType, done) {
	try
	{
		var $ul = null;
		var parentItem = null;
		
		if (parentItemID == null) // means this is a base collection
		{
			$parent.html('');
			$ul = $('<ul></ul>').appendTo($parent);
			console.log('parent is null');
		}
		else
		{
			$ul = $parent('ul');
			parentItem = $('#' + modelType + '_' + parentItemID);
			console.log('parent is not null');
		}
			
		
	    for (var itemIndex in items) {
	    
	      var itemInstance = items[itemIndex];
	      var itemName = itemInstance[nameProperty];
	      
	      if (itemName == null)
	    	  itemName = "Undefined";
	      
	      var itemId = itemInstance[idProperty];
	      
	      /*
	      if (!obj.hasOwnProperty(p)) {
	        continue;
	      }//huh?
	      */
	      
	      console.log(itemId);
	      
	      var $li = $('<li id=\'' + modelType + '_' + itemId + '\'></li>')
	        .append('<i></i>')
	        .append('<a></a>')
	        //.append('<i class="icon-lock"></i>')
	        .attr('data-path', modelType + '_' + itemId)
	        .attr('data-state', 'collapsed')
	        .appendTo($ul);
	      
	      /*
	      if (_.isObject(value)) {
	        $li.addClass('branch');
	        $li.find('a').text(p);
	        $li.find('i').first().addClass(config.icons.collapsed);
	        updateTree(value, $li);
	      } else {
	      */
	        $li.addClass('branch');
	        $li.find('a')
	          .append('<span class="label label-inverse">' + nameProperty + '</span>')
	          .find('span')
	          .after(itemName);
	        $li.find('i').first().addClass(config.icons.collapsed);
	      /*}*/
	      $li.find('> ul').hide();
	    }
	}
	catch(e)
	{
		console.log(e);
		 done(e);
	}
    
   done(null); 
   
  };

  var triggerPathEvent = function ($li, evt) {
    var segments = [];
    segments.push($li.attr('data-path'));
    $li.parents('li').each(function (i, li) {
      segments.push($(li).attr('data-path'));
    });
    var fullPath = segments.reverse().join('/');
    bus.publish(evt, {path: fullPath});
  };

  var toggleExpandState = function ($li) {
    var state = $li.attr('data-state');
    if (state === 'expanded') {
      $li.find('> ul').hide();
      $li.find('> .' + config.icons.expanded)
        .removeClass(config.icons.expanded)
        .addClass(config.icons.collapsed);
      $li.attr('data-state', 'collapsed');
    } else {
      $li.find('> ul').show();
      $li.find('> .' + config.icons.collapsed)
        .removeClass(config.icons.collapsed)
        .addClass(config.icons.expanded);
      $li.attr('data-state', 'expanded');
    }
  };

  var api = {
    update: function (data, parentItemID, nameProperty, idProperty, modelType, done) {
      var $E = $(config.selector).addClass('tbtree');

      console.log('updating tree');
      
      updateTree(data, $E, parentItemID, nameProperty, idProperty, modelType, function(e){
    	  
    	  console.log('updating tree done');
    	  
    	  $E.on('click', 'li', function (e) {
    	        var $li = $(this);
    	        setTimeout(function () {
    	          var dblclick = parseInt($li.data('double'), 10);
    	          if (dblclick > 0) {
    	            $li.data('double', dblclick - 1);
    	            return;
    	          }
    	          $E.find('li').removeClass('highlighted');
    	          $li.addClass('highlighted');
    	          triggerPathEvent($li, 'highlighted');
    	          toggleExpandState($li);
    	        }, 200);
    	        return false;
    	      });

    	      $E.on('dblclick', 'li', function (e) {
    	        var $li = $(this);
    	        $li.data('double', 2);
    	        triggerPathEvent($li, 'selected');
    	        return false;
    	      });

    	      $E.on('click', 'i.icon-lock, i.icon-unlock', function (e) {
    	        $(this).toggleClass('icon-lock', 'icon-unlock');
    	        e.stopPropagation();
    	        e.preventDefault();
    	        return false;
    	      });
    	      
    	      done(e);
      });
    },

    filter: function (query) {
      console.log(query);
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
    $.extend(config, options);
    return api;
  };

});


