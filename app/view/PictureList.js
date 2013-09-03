Ext.define('SensorDevice.view.PictureList', {
    extend: 'Ext.dataview.DataView',
    requires: [
        'SensorDevice.view.PictureItem'
    ],
    alias: 'widget.picturelist',
    
    config: {
        useComponents: true,
        cls: 'picture-list',
        store: 'Pictures',
        defaultType: 'pictureitem',
        height: '100%'
    }
});