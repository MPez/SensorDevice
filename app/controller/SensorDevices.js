Ext.define('SensorDevice.controller.SensorDevices', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.device.Camera',
        'Ext.device.Orientation',
        'Ext.device.Connection',
        'Ext.device.Contacts',
        'Ext.device.Geolocation'
    ],
    
    config: {
        refs: {
            homeView: 'home',
            cameraDemoView: 'camerademo',
            galleryDemoView: 'gallerydemo',
            fileDemoView: 'filedemo'
        },
        control: {
            homeView: {
                itemDiscloseCommand: 'onItemDiscloseCommand',
                backButtonCommand: 'onBackButtonCommand',
                loadContactsCommand: 'onLoadContactsCommand',
                deleteContactsCommand: 'onDeleteContactsCommand',
                locationCommand: 'onLocationCommand',
                mapRenderCommand: 'onMapRenderCommand'
            },
            cameraDemoView: {
                cameraButtonCommand: 'onCameraButtonCommand',
                galleryButtonCommand: 'onGalleryButtonCommand'
            },
            fileDemoView: {
                saveFormCommand: 'onSaveFormCommand',
                deleteFormCommand: 'onDeleteFormCommand'
            }
        }
    },
    
    onItemDiscloseCommand: function(home, index) {
        console.log('onItemDIscloseCommand');
        
        if (index == 0) {
            console.log('onFileDemoForm');
            
            var personalInfoStore = Ext.getStore('PersonalInfos');
            
            if (personalInfoStore.getCount() == 0) {
                var newInfo = Ext.create('SensorDevice.model.PersonalInfo', {
                    name: 'Soluzioni',
                    surname: 'Software',
                    address: 'Via dei Ronchi 21',
                    sex: 'male',
                    color: 'blue' 
                });
            }
            else {
                var newInfo = personalInfoStore.getAt(0);
            }
            
            var fileDemo = this.getFileDemoView();
            fileDemo.setRecord(newInfo);
        }
        
        home.setActiveItem(index+1);
    },
    
    onSaveFormCommand: function() {
        console.log('onSaveFormCommand');
        
        var fileDemo = this.getFileDemoView();
        var currentInfo = fileDemo.getRecord();
        var newValues = fileDemo.getValues();
        
        currentInfo.set('name', newValues.name);
        currentInfo.set('surname', newValues.surname);
        currentInfo.set('address', newValues.address);
        currentInfo.set('sex', newValues.sex);
        currentInfo.set('color', newValues.color);
        
        var errors = currentInfo.validate();
        
        if (!errors.isValid()) {
            errors.each(function(error) {
                Ext.Msg.alert('Wait!', error.getMessage(), Ext.emptyFn);
            })
            currentInfo.reject();
            return;
        }
        
        var personalInfoStore = Ext.getStore('PersonalInfos');
        personalInfoStore.add(currentInfo);
        personalInfoStore.sync();
        
        
    },
    
    onDeleteFormCommand: function(){
        console.log('onDeleteFormCommand');
        
        var fileDemo = this.getFileDemoView();
        fileDemo.reset();
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
                quality: '100',
                source: 'camera',
                scope: me,
                destination: 'file',
                encoding: 'jpeg'
                //width: '400',
                //height: '400'
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
                quality: '100',
                source: 'library',
                scope: me,
                destination: 'file',
                encoding: 'jpeg'
                //width: '400',
                //height: '400'
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
        var contacts = Ext.device.Contacts.getContacts(true);
        contactsStore.setData(contacts);
        //contactsStore.setData(data);
    },
    
    onDeleteContactsCommand: function() {
        console.log('onDeleteContactsCommand');
        
        var contactsStore = Ext.getStore('Contacts');
        contactsStore.removeAll();
    },
    
    /*
     * Sencha Touch geolocation
     */
    onLocationCommand: function() {
        console.log('onLocationCommand');
        
        var me = this;
        
        Ext.device.Geolocation.getCurrentPosition(
            {
                success: me.onLocationSuccess,
                failure: me.onLocationFailure,
                scope: me,
                allowHighAccuracy: true
            }
        );
    },
    
    onLocationSuccess: function(position) {
        console.log('onLocationSuccess');
        
        var mapCmp = this.getHomeView().getAt(5).getComponent('map');
        mapCmp.setMapCenter(position.coords);
        mapCmp.setMapOptions({
            zoom: 15
        });
        
        var marker = new google.maps.Marker({
            map: mapCmp.getMap(),
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            icon: 'resources/icons/maps-32.png',
            animation: google.maps.Animation.DROP
        });
    },
    
    onLocationFailure: function() {
        console.log('onLocationFailure');
        
        Ext.Msg.alert('Error retrieving position', 'Something went wrong!');
    },
    
    onMapRenderCommand: function(scope, map) {
        console.log('onMapRenderCommand');
        
    },
    
    //called when the Application is initialized
    init: function() {
        console.log('init SensorDevices');
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log('launch SensorDevices');
        
        Ext.getStore('Pictures').load();
        Ext.getStore('PersonalInfos').load();
    }
});
