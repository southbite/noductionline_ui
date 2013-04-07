define(['jquery', 'mustache'], function ($, Mustache) {
	 // constructor
    var menu = function () {
    };

    // prototype
    menu.prototype = {
    		containerInternal:null,
    		onItemClickedEvent:null,
    		itemsInternal:null,
    		itemImageInternal:null,
    		itemHeadingInternal:null,
    		itemDescriptionInternal:null,
    		itemIdInternal:null,
    		orientationInternal:'vertical',
    		populate:function(container, items, onItemClicked, itemText, itemId, orientation)
    		{
    			this.containerInternal = container;
    			this.onItemClickedEvent = onItemClicked;
    			this.itemsInternal  = items;
    			this.itemTextInternal = itemText;
    			this.containerInternal = container;
    			this.itemIdInternal = itemId;
    			
    			if (orientation != null)
    				this.orientationInternal = orientation.toLowerCase();
    			
    			this.refresh();
    		},
    		refresh:function()
    		{
    			
    			var containerHtml = '<ul class="nav nav-tabs nav-stacked vertical-list">';
    			
    			if (this.orientationInternal == 'horizontal')
    				containerHtml = '<ul class="nav nav-tabs">';
    			
    			for (var itemIndex in this.itemsInternal)
    			{
    				var itemInstance = this.itemsInternal[itemIndex];
    				
    				containerHtml += '<li class="vertical-list-item" onclick="' + this.onItemClickedEvent + '(\'' + itemInstance[this.itemIdInternal] + '\');">';
    				
    				containerHtml += Mustache.render(this.itemTextInternal, itemInstance);
    				
    				containerHtml += '</li>';
    				
    			}
    			
    			containerHtml += '</ul>';
    			
    			console.log(containerHtml);
    			
    			$('#' + this.containerInternal).html(containerHtml);
    		}
    };
    
    return new menu();
});
