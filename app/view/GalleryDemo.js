Ext.define('SensorDevice.view.GalleryDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.Img',
        //'SensorDevice.view.PictureList'
    ],
    alias: 'widget.gallerydemo',
    
    config: {
        
        styleHtmlContent: true,
        height: '100%',
        layout: {
            type: 'fit'
        },
        
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Gallery'
            },
            {
                //xtype: 'picturelist',
                
                xtype: 'img',
                itemId: 'galleryImg',
                mode: 'image',
                //store: 'Pictures',
                src: 'http://upload.wikimedia.org/wikipedia/it/b/bd/TulipanoJPEG100.jpg',
                margin: '10',
                height: 288,
                width: 288
                
            }
        ]
    }
});