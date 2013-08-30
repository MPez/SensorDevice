Ext.define('SensorDevice.view.CameraDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.Img'
    ],
    alias: 'widget.camerademo',
    
    config: {
        styleHtmlContent: true,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Camera Demo',
                items: [
                    {
                        xtype: 'backbutton'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'cameraButton',
                text: 'Take a picture',
                margin: '0 0 10 0',
                height: 40,
            },
            {
                xtype: 'button',
                itemId: 'galleryButton',
                text: 'Load from gallery',
                height: 40,
            },
            {
                xtype: 'img',
                itemId: 'cameraImage',
                height: 144,
                width: 144
            }
        ],
        
        listeners: [
            {
                delegate: '#cameraButton',
                event: 'tap',
                fn: 'onCameraButtonTap'
            },
            {
                delegate: '#galleryButton',
                event: 'tap',
                fn: 'onGalleryButtonTap'
            }
        ]
    },
    
    onCameraButtonTap: function(scope, e, eOpts) {
        console.log('onCameraButtonTap');
        
        this.fireEvent('cameraButtonCommand', this);
    },
    
    onGalleryButtonTap: function(scope, e, eOpts) {
        console.log('onGalleryButtonTap');
        
        this.fireEvent('galleryButtonCommand', this);
    }
});