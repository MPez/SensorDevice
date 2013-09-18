/**
 * SensorDevice rappresenta il controller che si occupa di gestire tutti gli eventi generati
 * dalle diverse pagine disponibili nell'app, dimostrative dell'utilizzo dei diversi sensori
 * disponibili sul dispositivo.
 */
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
        /**
         * @cfg
         * Riferimenti alle pagine controllate.
         */
        refs: {
            homeView: 'home',
            cameraDemoView: 'camerademo',
            galleryDemoView: 'gallerydemo'
        },
        /**
         * @cfg
         * Metodi di controllo degli eventi lanciati dalle diverse pagine.
         */
        control: {
            homeView: {
                itemDiscloseCommand: 'onItemDiscloseCommand',
                backButtonCommand: 'onBackButtonCommand',
                loadContactsCommand: 'onLoadContactsCommand',
                trashContactsCommand: 'onTrashContactsCommand',
                locationCommand: 'onLocationCommand',
                mapRenderCommand: 'onMapRenderCommand',
                positionCommand: 'onPositionCommand',
                backGeolocationCommand: 'onBackGeolocationCommand',
            },
            cameraDemoView: {
                cameraButtonCommand: 'onCameraButtonCommand',
                galleryButtonCommand: 'onGalleryButtonCommand'
            }
        }
    },
    
    /**
     * Metodo che cattura l'evento disclose della lista delle funzionalità disponibili.
     * Se la funzionalità selezionata è FileDemo e non sono presenti record nello store,
     * viene creato un record fittizio da inserire nella form.
     * A seconda dell'indice passato come parametro viene visualizzata la pagina corrispondente.
     * 
     * @param {Ext.Component} home Scope di riferimento della pagina principale.
     * @param {Number} index Indice del record selezionato dalla lista.
     */
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
    
    /**
     * Metodo che cattura l'evento di ritorno alla pagina principale visualizzando la pagina corretta.
     */
    onBackButtonCommand: function(home) {
        console.log('onBackButtonCommand');
        home.setActiveItem(0);
    },
    
    //------------------------------------------------------//
    //               Sencha Touch Device Camera             //
    //------------------------------------------------------//
    
    /**
     * Metodo che cattura l'evento di apertura della fotocamera del dispositivo; agisce effettuando
     * una chiamata al metodo capture passando un oggetto di configurazione con le impostazioni desiderate
     * per la catturae le funzioni da chiamare in caso di successo o fallimento.
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
                encoding: 'jpeg',
                width: '400',
                height: '400'
            }
        );
    },
    
    /**
     * Metodo che cattura l'evento di apertura della galleria del dispositivo; agisce effettuando
     * una chiamata al metodo capture passando un oggetto di configurazione con le impostazioni desiderate
     * per la catturae le funzioni da chiamare in caso di successo o fallimento.
     */
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
                encoding: 'jpeg',
                width: '400',
                height: '400'
            }
        );
    },
    
    /**
     * Metodo che gestisce il successo dell'operazione di cattura dell'immagine tramite fotocamera
     * o galleria. Agisce creando un nuovo record e impostando i valori della nuova immagine.
     * In seguito recupera lo store corretto e registra il nuovo record.
     *
     * @param {String} image Uri della nuova immagine catturata.
     */
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
    
    /**
     * Metodo che gestisce il fallimento dell'operazione di cattura dell'immagine visualizzando
     * un messaggio di allerta per l'utente.
     */
    onCaptureFailure: function() {
        console.log('onCaptureFailure');
        Ext.Msg.alert('Error', 'There was an error when acquiring the picture.');
    },
    
    //------------------------------------------------------//
    //             Sencha Touch Device Contacts             //
    //------------------------------------------------------//
    
    /**
     * Metodo che cattura l'evento di caricamento dei contatti del dispositivo;
     * agisce effettuando una chiamata al metodo getContacts che ritorna l'elenco dei contatti
     * presenti nel dispositivo; una volta recuperati i contatti vengono salvati sullo store dedicato.
     */
    onLoadContactsCommand: function() {
        console.log('onLoadContactsCommand');
        
        var contactsStore = Ext.getStore('Contacts');
        var contacts = Ext.device.Contacts.getContacts(true);
        contactsStore.add(contacts);
        contactsStore.sync();
    },
    
    /**
     * Metodo che cattura l'evento di cancellazione dei record dallo store dei contatti.
     */
    onTrashContactsCommand: function() {
        console.log('onTrashContactsCommand');
        var contactsStore = Ext.getStore('Contacts');
        contactsStore.removeAll();
        contactsStore.sync();
    },
    
    //------------------------------------------------------//
    //               Sencha Touch Geolocation               //
    //                   Google Maps API                    //
    //------------------------------------------------------//
    
    /**
     * Metodo che cattura l'evento di localizzazione del dispositivo; agisce effettuando
     * una chiamata al metodo getCurrentPosition passando come parametro un oggetto di configurazione
     * con le opzioni desiderate e le funzioni da chiamare in caso di successo o fallimento.
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
    
    /**
     * Metodo che gestisce il successo dell'operazione di localizzazione del dispositivo; agisce
     * creando un record per salvare nello store la posizione corrente e imposta il nuovo centro
     * sulla mappa con il relativo marker per visualizzare nella stessa la posizione attuale.
     *
     * @param {Object} position Oggetto che rappresenta la posizione corrente, contiene le coordinate.
     */
    onLocationSuccess: function(position) {
        console.log('onLocationSuccess');
        console.log(position);
        
        var positionStore = Ext.getStore('Positions');
        var newPosition = Ext.create('SensorDevice.model.Position', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            accuracy: position.coords.accuracy,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
        });
        positionStore.add(newPosition);
        positionStore.sync();
        
        var mapCmp = this.getHomeView().getAt(3).getComponent('map');
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
    
    /**
     * Metodo che gestisce il fallimento dell'operazione di localizzazione avvisando l'utente con un messaggio.
     */
    onLocationFailure: function() {
        console.log('onLocationFailure');
        Ext.Msg.alert('Error retrieving position', 'Something went wrong!');
    },
    
    /**
     * Metodo che cattura l'evento di renderizzazione della mappa.
     */
    onMapRenderCommand: function(scope, map) {
        console.log('onMapRenderCommand');
        
    },
    
    /**
     * Metodo che catura l'evento di visualizzazione della lista delle posizioni salvate.
     */
    onPositionCommand: function(home) {
        console.log('onPositionCommand');
        home.setActiveItem(4);
    },
    
    /**
     * Metodo che cattura l'evento di ritorno alla mappa.
     */
    onBackGeolocationCommand: function(home) {
        console.log('onBackGeolocationCommand');
        home.setActiveItem(3);
    },
    
    /**
     * Metodo chiamato all'inizializzazione dell'app.
     */
    init: function() {
        console.log('init SensorDevices');
    },
    
    /**
     * Metodo chiamato al lancio dell'app; si occupa di caricare gli store utilizzati.
     *
     * @param {Ext.app.Application} app
     */
    launch: function(app) {
        console.log('launch SensorDevices');
        
        Ext.getStore('Pictures').load();
        Ext.getStore('Positions').load();
    }
});
