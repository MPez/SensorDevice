Ext.define('SensorDevice.controller.SensorDevices', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.device.Camera',
        'Ext.device.Orientation',
        'Ext.device.Connection',
    ],
    
    config: {
        refs: {
            homeView: 'home',
            cameraDemoView: 'camerademo',
            galleryDemoView: 'gallerydemo'
        },
        control: {
            homeView: {
                itemDiscloseCommand: 'onItemDiscloseCommand',
                backButtonCommand: 'onBackButtonCommand'
            },
            cameraDemoView: {
                cameraButtonCommandSencha: 'onCameraButtonCommandSencha',
                galleryButtonCommandSencha: 'onGalleryButtonCommandSencha',
                cameraButtonCommandCordova: 'onCameraButtonCommandCordova',
                galleryButtonCommandCordova: 'onGalleryButtonCommandCordova'
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
    
    /*
     * Sencha Touch
     */ 
    onCameraButtonCommandSencha: function() {
        console.log('onCameraButtonCommandSencha');
        
        var scope = this;
        
        Ext.device.Camera.capture({
            success: scope.onCaptureSuccess(),
            quality: 85,
            source: 'camera',
            destination: 'file',
            encoding: 'jpg',
            //height: 288,
            //width: 288
        });
    },
    
    onGalleryButtonCommandSencha: function() {
        console.log('onGalleryButtonCommandSencha');
        
        var scope = this;
        
        Ext.device.Camera.capture({
            scope: this,
            success: scope.onCaptureSuccess(),
            failure: scope.onCaptureFailure(),
            quality: 85,
            source: 'library',
            destination: 'file',
        });
    },
    
    onCaptureSuccess: function(uri) {
        console.log('onCaptureSuccess');
        
        var now = new Date();
        var newPicture = Ext.create('SensorDevice.model.Picture', {
            uri: uri,
            timestamp: now
        });
        
        var pictureStore = Ext.getStore('Pictures');
        pictureStore.add(newPicture);
        pictureStore.sync();
        
        
        
        var galleryView = this.getGalleryDemoView();
        
        var image = galleryView.getComponent('galleryImg');
        
        var url = 'http://www.superedo.it/sfondi/sfondi/Cani/Cuccioli%20Di%20Cane/cuccioli_di_cane_5.jpg';
        
        image.setSrc(/*'data:image/jpeg;base64,' + */uri);
        
    },
    
    onCaptureFailure: function() {
        console.log('onCaptureFailure');
        
        Ext.Msg.alert('Error', 'There was an error when acquiring the picture.');
    },
    
    /*
     * Cordova
     */
    onCameraButtonCommandCordova: function() {
        console.log('onCameraButtonCommandCordova');
        
        var scope = this;
        
        navigator.camera.getPicture(scope.onSuccess, scope.onFail, {
            quality: 50,
            destinationType: camera.destinationType.FILE_URI
        });
        
    },
    
    onGalleryButtonCommandCordova: function() {
        console.log('onGalleryButtonCommandCordova');
        
        var scope = this;
        

    },
    
    onSuccess: function(imageUri) {
        console.log('onSuccess');
        
        var galleryView = this.getGalleryDemoView();
        
        var image = galleryView.getComponent('galleryImg');
        
        image.setSrc(imageUri);
    },
    
    onFail: function(message) {
        console.log('onFail');
        
        Ext.Msg.alert('Error', message);
    },
    
    init: function() {
        console.log('init');
        /*
        var now = new Date();
        var store = Ext.getStore('Pictures');
        var newPicture = Ext.create('SensorDevice.model.Picture', {
            uri: 'http://upload.wikimedia.org/wikipedia/it/b/bd/TulipanoJPEG100.jpg',
            timestamp: now
        });
        
        store.add(newPicture);
        
        store.sync();
        */
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log('launch');
        
        Ext.getStore('Pictures').load();
    }
});
