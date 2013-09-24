/**
 * Home rappresenta la vista della pagina principale dell'app; avendo un layout di tipo card,
 * i suoi item sono le pagine che visualizzano le diverse funzionalità offerte dall'app.
 */
Ext.define('SensorDevice.view.Home', {
    extend: 'Ext.Container',
    requires: [
        'SensorDevice.view.CameraDemo',
        
        'Ext.dataview.List',
        'Ext.TitleBar',
        'Ext.Map'
    ],
    alias: 'widget.home',
    
    config: {
        /**
         * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
         * da impostare a 100% per consentire la visualizzazione dei diversi componenti.
         */
        height: '100%',
        /**
         * @cfg
         * Layout di tipo card che permette di scorrere le diverse pagine.
         */
        layout: {
            type: 'card',
            animation: 'fade'
        },
        
        items: [
            /*
             * item 0
             * Pagina principale dell'app, contiene la barra del titolo e la lista
             * che descrive e permette di selezionare le diverse funzionalità implementate.
             */
            {
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Sensor Device List'
                    },
                    {
                        xtype: 'list',
                        itemId: 'sensorList',
                        store: 'Sensors',
                        itemTpl: '{name}: {description}',
                        /**
                        * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
                        * da impostare a 100% per consentire la visualizzazione della lista.
                        */
                        height: '100%',
                        onItemDisclosure: true
                    }
                ]
            },
            /*
             * item 1
             * sensorList index 0
             * Pagina dimostrativa delle funzionalità di cattura immagine da fotocamera o da galleria.
             */
            {
                items: 
                { xtype: 'camerademo' }
            },
            /*
             * item 2
             * sensorList index 1
             * Pagina dimostrativa che permette di recuperare l'elenco dei contatti dal dispositivo
             * e di visualizzarli in una lista ordinata.
             */
            {
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Contacts Demo',
                        defaults: {
                            xtype: 'button',
                            iconMask: true
                        },
                        items: [
                            {
                                itemId: 'backButton',
                                ui: 'back',
                                iconCls: 'arrow_left'
                            },
                            {
                                iconCls: 'arrow_up',
                                itemId: 'loadContactsButton',
                                align: 'right'
                            },
                            {
                                iconCls: 'trash',
                                itemId: 'trashContactsButton',
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        itemTpl: '{name} {surname}',
                        itemId: 'contactsList',
                        /**
                        * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
                        * da impostare a 100% per consentire la visualizzazione della lista.
                        */
                        height: '100%',
                        store: 'Contacts',
                        loadingText: 'Loading contacts...',
                        emptyText: 'No contacts found.',
                        grouped: true,
                        indexBar: true
                    }
                ]
            },
            /*
             * item 3
             * sensorList index 2
             * Pagina che visualizza le informazioni riguardanti la connessione in atto del dispositivo.
             */
            {
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Connection',
                        defaults: {
                            xtype: 'button',
                            iconMask: true
                        },
                        items: [
                            {
                                itemId: 'backButton',
                                ui: 'back',
                                iconCls: 'arrow_left'
                            },
                            {
                                itemId: 'connectionButton',
                                iconCls: 'refresh',
                                align: 'right'
                            }
                        ]
                    }
                ]
            },
            /*
             * item 4
             * sensorList index 3
             * Pagina che visualizza una mappa tramite le Google Maps API e permette di individuare
             * la posizione attuale del dispositivo e di salvarla in uno store.
             */
            {
                items: [
                    {
                        xtype: 'titlebar',
                        title: 'Geolocation',
                        defaults: {
                            xtype: 'button',
                            iconMask: true
                        },
                        items: [
                            {
                                itemId: 'backButton',
                                ui: 'back',
                                iconCls: 'arrow_left'
                            },
                            {
                                itemId: 'locationButton',
                                iconCls: 'locate',
                                align: 'right'
                            },
                            {
                                itemId: 'positionButton',
                                iconCls: 'search',
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'map',
                        itemId: 'map',
                        /**
                        * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
                        * da impostare a 100% per consentire la visualizzazione della mappa.
                        */
                        height: '100%',
                        /**
                         * @cfg {Object} mapOptions Opzioni per la mappa come da specifiche Google Maps API
                         */
                        mapOptions: {
                            center: new google.maps.LatLng(41.9, 12.483333),
                            zoom: 9
                        }            
                    }
                ]
            },
            /*
             * item 5
             * Pagina relativa alle posizioni salvate tramite la geolocalizzazione del dispositivo,
             * tali informazioni vengono visualizzate su una lista.
             */
            {
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Positions',
                        defaults: {
                            xtype: 'button',
                            iconMask: true
                        },
                        
                        items: [
                            {
                                itemId: 'backGeolocationButton',
                                ui: 'back',
                                iconCls: 'arrow_left'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        itemTpl: 'Latitude: {latitude}, Longitude: {longitude}, Timestamp: {timestamp}',
                        itemId: 'positionsList',
                        /**
                        * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
                        * da impostare a 100% per consentire la visualizzazione della lista.
                        */
                        height: '100%',
                        store: 'Positions',
                        loadingText: 'Loading positions...',
                        emptyText: 'No positions found.'
                    }
                ]
            }
        ],
        
        listeners: [
            {
                delegate: '#sensorList',
                event: 'disclose',
                fn: 'onItemDisclose'
            },
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            },
            {
                delegate: '#loadContactsButton',
                event: 'tap',
                fn: 'onLoadContactsButton'
            },
            {
                delegate: '#trashContactsButton',
                event: 'tap',
                fn: 'onTrashContactsButton'
            },
            {
                delegate: '#connectionButton',
                event: 'tap',
                fn: 'onConnectionButton'
            },
            {
                delegate: '#locationButton',
                event: 'tap',
                fn: 'onLocationButton'
            },
            {
                delegate: '#map',
                event: 'maprender',
                fn: 'onMapRender'
            },
            {
                delegate: '#positionButton',
                event: 'tap',
                fn: 'onPositionButton'
            },
            {
                delegate: '#backGeolocationButton',
                event: 'tap',
                fn: 'onBackGeolocationButton'
            }
        ]
    },
    
    /**
     * Metodo che cattura l'evento disclose della lista senorList;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onItemDisclose: function(scope, record, target, index, e, eOpts) {
        console.log('onItemDisclose');
        /**
         * @event
         * Lanciato alla pressione del pulsante disclose del record selezionato.
         * @param {Ext.Component} this
         * @param {Number} Indice del record all'interno della lista.
         */
        this.fireEvent('itemDiscloseCommand', this, index);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante di ritorno alla pagina principale;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onBackButtonTap: function(scope, e, eOpts) {
        console.log('onBackButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante di ritorno alla pagina principale.
         * @param {Ext.Component} this
         */
        this.fireEvent('backButtonCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante di caricamento dei contatti
     * dalla rubrica del dispositivo; rilancia l'evento che verrà catturato dal controller.
     */
    onLoadContactsButton: function(scope, e, eOpts) {
        console.log('onLoadContactsButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante di caricamento dei contatti.
         * @param {Ext.Component} this
         */
        this.fireEvent('loadContactsCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante di recupero informazioni sulla connessione
     * del dispositivo; rilancia l'evento che verrà catturato dal controller.
     */
    onConnectionButton: function() {
        console.log('onConnectionButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante di recupero informazioni sulla connessione.
         * @param {Ext.Component} this
         */
        this.fireEvent('connectionCommand', this);  
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante di eliminazione dei contatti dal relativo store;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onTrashContactsButton: function() {
        console.log('onTrashContactsButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante di eliminazione dei contatti.
         * @param {Ext.Component} this
         */
        this.fireEvent('trashContactsCommand', this);        
    },
    /**
     * Metodo che cattura l'evento tap del pulsante di localizzazione posizione del dispositivo;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onLocationButton: function() {
        console.log('onLocationButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante di localizzazione posizione.
         * @param {Ext.Component} this
         */
        this.fireEvent('locationCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento maprender della mappa visualizzata;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onMapRender: function(scope, map, eOpts) {
        console.log('onMapRender');
        /**
         * @event
         * Lanciato alla renderizzazione della mappa a schermo.
         * @param {Ext.Component} this
         * @param {google.maps.Map} map
         */
        this.fireEvent('mapRenderCommand', this, map);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che visualizza la lista delle posizioni trovate;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onPositionButton: function(scope, e, eOpts) {
        console.log('onPositionButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante di visualizzazione posizioni trovate.
         * @param {Ext.Component} this
         */
        this.fireEvent('positionCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante di ritorno alla pagina contenente la mappa;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onBackGeolocationButton: function(scope, e, eOpts) {
        console.log('onBackGeolocationButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante di ritorno alla mappa.
         * @param {Ext.Component} this
         */
        this.fireEvent('backGeolocationCommand', this);
    }
});