Ext.define('SensorDevice.controller.SensorDevices', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.device.Camera'
    ],
    
    config: {
        refs: {
            homeView: 'home',
            cameraDemoView: 'camerademo'
        },
        control: {
            homeView: {
                itemDiscloseCommand: 'onItemDiscloseCommand',
                backButtonCommand: 'onBackButtonCommand'
            },
            cameraDemoView: {
                cameraButtonCommand: 'onCameraButtonCommand',
                galleryButtonCommand: 'onGalleryButtonCommand'
            }
        }
    },
    
    onItemDiscloseCommand: function(home, index) {
        console.log('onItemDIscloseCommand');
        
        home.setActiveItem(index+1);
    },
    
    onBackButtonCommand: function(home) {
        console.log('onBackButtonCommand');
        
        home.setActiveItem(0);
    },
    
    onCameraButtonCommand: function() {
        console.log('onCameraButtonCommand');
        
        var scope = this;
        
        Ext.device.Camera.capture({
            success: scope.onCaptureSuccess(),
            quality: 85,
            source: 'camera',
            destination: 'file'
        });
    },
    
    onGalleryButtonCommand: function() {
        console.log('onGalleryButtonCommand');
        
        
    },
    
    onCaptureSuccess: function() {
        console.log('onCaptureSuccess');
        
        
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    }
});
