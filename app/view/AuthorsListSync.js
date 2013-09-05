Ext.define('SensorDevice.view.AuthorsListSync', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.dataview.List'
    ],
    alias: 'widget.authorslistsync',
    
    config: {
        layout: 'card',
        modal: true,
        hideOnMaskTap: true,
        width: 200,
        height: 300,
        
        items: [{
            xtype: 'list',
            store: 'Authors',
            itemId: 'authorsList',
            loadingText: 'Loading authors...',
            emptyText: '<div class="author-list-empty-text">No authors found</div>',
            grouped: true,
            itemTpl: '{name} {surname}'
        }],
        
        listeners: [{
            delegate: '#authorsList',
            event: 'itemtap',
            fn: 'onAuthorsListItemSingleTap'
        }]
    },
    
    onAuthorsListItemSingleTap: function(list, index, target, record, evt, options) {
        console.log('editAuthorCommand');
        
        this.fireEvent('editAuthorCommand', this, record);
        
        this.hide();
    }
});