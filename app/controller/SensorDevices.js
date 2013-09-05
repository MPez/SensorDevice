Ext.define('SensorDevice.controller.SensorDevices', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.device.Camera',
        'Ext.device.Orientation',
        'Ext.device.Connection',
        'Ext.device.Contacts'
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
                backButtonCommand: 'onBackButtonCommand',
                loadContactsCommand: 'onLoadContactsCommand',
                deleteContactsCommand: 'onDeleteContactsCommand'
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
    
    /*
     * Sencha Touch camera capture
     */ 
    onCameraButtonCommand: function() {
        console.log('onCameraButtonCommand');
        
        var me = this;
        
        Ext.device.Camera.capture(
            {
                success: me.onCaptureSuccess,
                failure: me.onCaptureFailure,
                quality: 85,
                source: 'camera',
                scope: me,
                destination: 'file',
                encoding: 'jpeg'
            }
        );
    },
    
    onGalleryButtonCommand: function() {
        console.log('onGalleryButtonCommand');
        
        var me = this;
        
        Ext.device.Camera.capture(
            {
                success: me.onCaptureSuccess,
                failure: me.onCaptureFailure,
                quality: 85,
                source: 'library',
                scope: me,
                destination: 'file',
                encoding: 'jpeg'
            }
        );
    },
    
    onCaptureSuccess: function(image) {
        console.log('onCaptureSuccess');
        
        var now = new Date();
        var newPicture = Ext.create('SensorDevice.model.Picture', {
            uri: image,
            timestamp: now
        });
        
        var pictureStore = Ext.getStore('Pictures');
        pictureStore.add(newPicture);
        pictureStore.sync();
    },
    
    onCaptureFailure: function() {
        console.log('onCaptureFailure');
        
        Ext.Msg.alert('Error', 'There was an error when acquiring the picture.');
    },
    
    /*
     * Sencha Touch contacts
     */
    onLoadContactsCommand: function() {
        console.log('onLoadContactsCommand');
        
        var data = [
            { First: 'toni', Last: 'ciccione'},
            { First: 'paolino', Last: 'paperino'},
            { First: 'lupo', Last: 'arturo'}
        ];
        
        var contactsStore = Ext.getStore('Contacts');
        contacsStore.setData(Ext.device.Contacts.getContacts());
        //contactsStore.setData(data);
    },
    
    onDeleteContactsCommand: function() {
        console.log('onDeleteContactsCommand');
        
        var contactsStore = Ext.getStore('Contacts');
        contactsStore.removeAll();
    },
    
    init: function() {
        console.log('init');

    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log('launch');
        
        Ext.getStore('Pictures').load();
    }
});
