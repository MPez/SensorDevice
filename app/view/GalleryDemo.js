Ext.define('SensorDevice.view.GalleryDemo', {
    extend: 'Ext.dataview.DataView',
    requires: [
        'Ext.TitleBar'
    ],
    alias: 'widget.gallerydemo',
    
    config: {
        height: '100%',
        store: 'Pictures',
        loadingText: 'Loading images...',
        emptyText: 'No images found.',
        itemTpl: '<div><img src="{uri}"/>{timestamp}</div>',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Gallery'
            }
        ]
    }
});