Ext.define('SensorDevice.view.CameraDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar'
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
                itemId: 'cameraButtonSencha',
                text: 'Take a picture using Sencha\'s APIs',
                margin: '0 0 10 0',
                height: 40,
            },
            {
                xtype: 'button',
                itemId: 'galleryButtonSencha',
                text: 'Load from gallery using Sencha\'s APIs',
                margin: '0 0 50 0',
                height: 40,
            },
            {
                xtype: 'button',
                itemId: 'cameraButtonCordova',
                text: 'Take a picture using Cordova\'s APIs',
                margin: '0 0 10 0',
                height: 40,
            },
            {
                xtype: 'button',
                itemId: 'galleryButtonCordova',
                text: 'Load from gallery using Cordova\'s APIs',
                margin: '0 0 20 0',
                height: 40,
            }
        ],
        
        listeners: [
            {
                delegate: '#cameraButtonSencha',
                event: 'tap',
                fn: 'onCameraButtonTapSencha'
            },
            {
                delegate: '#galleryButtonSencha',
                event: 'tap',
                fn: 'onGalleryButtonTapSencha'
            },
            {
                delegate: '#cameraButtonCordova',
                event: 'tap',
                fn: 'onCameraButtonTapCordova'
            },
            {
                delegate: '#galleryButtonCordova',
                event: 'tap',
                fn: 'onGalleryButtonTapCordova'
            }
        ]
    },
    
    onCameraButtonTapSencha: function(scope, e, eOpts) {
        console.log('onCameraButtonTapSencha');
        
        this.fireEvent('cameraButtonCommandSencha', this);
    },
    
    onGalleryButtonTapSencha: function(scope, e, eOpts) {
        console.log('onGalleryButtonTapSencha');
        
        this.fireEvent('galleryButtonCommandSencha', this);
    },
    
    onCameraButtonTapCordova: function(scope, e, eOpts) {
        console.log('onCameraButtonTapCordova');
        
        this.fireEvent('cameraButtonCommandCordova', this);
    },
    
    onGalleryButtonTapCordova: function(scope, e, eOpts) {
        console.log('onGalleryButtonTapCordova');
        
        this.fireEvent('galleryButtonCommandCordova', this);
    }
});