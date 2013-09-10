Ext.define('SensorDevice.view.Home', {
    extend: 'Ext.Container',
    requires: [
        'SensorDevice.view.CameraDemo',
        'SensorDevice.view.FileDemo',
        'SensorDevice.view.MediaDemo',
        
        'Ext.dataview.List',
        'Ext.TitleBar',
        'Ext.Map'
    ],
    alias: 'widget.home',
    
    config: {
        //styleHtmlContent: true,
        height: '100%',
        layout: {
            type: 'card',
            animation: 'fade'
        },
        setScrollable: true,
        
        items: [
            {
                /*
                 * item 0
                 */
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
                        height: '100%',
                        onItemDisclosure: true
                    }
                ]
            },
            {
                /*
                 * item 1
                 * sensorList index 0
                 */
                items: 
                { xtype: 'filedemo' }
            },
            {
                /*
                 * item 2
                 * sensorList index 1
                 */
                items: 
                { xtype: 'camerademo' }
            },
            {
                /*
                 * item 3
                 * sensorList index 2
                 */
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Contacts Demo',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'backButton',
                                ui: 'back',
                                iconCls: 'arrow_left',
                                iconMask: true
                            },
                            {
                                xtype: 'button',
                                text: 'Load contacts',
                                itemId: 'loadContactsButton',
                                align: 'right'
                            },
                            {
                                xtype: 'button',
                                text: 'Delete all contacts',
                                itemId: 'deleteContactsButton',
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        itemTpl: '{First} {Last}',
                        itemId: 'contactsList',
                        height: '100%',
                        store: 'Contacts',
                        loadingText: 'Loading contacts...',
                        emptyText: 'No contacts found.',
                        grouped: true,
                        indexBar: true
                    }
                ]
            },
            {
                /*
                 * item 4
                 * sensorList index 3
                 */
                items:
                { xtype: 'mediademo' }
            },
            {
                /*
                 * item 5
                 * sensorList index 4
                 */
                items: [
                    {
                        xtype: 'titlebar',
                        title: 'Geolocation',
                        
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'backButton',
                                ui: 'back',
                                iconCls: 'arrow_left',
                                iconMask: true
                            },
                            {
                                xtype: 'button',
                                itemId: 'locationButton',
                                iconCls: 'locate',
                                iconMask: true,
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'map',
                        itemId: 'map',
                        height: '100%',
                        useCurrentLocation: false,
                        
                        mapOptions: {
                            center: new google.maps.LatLng(41.9, 12.483333),
                            zoom: 9
                        }            
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
                delegate: '#deleteContactsButton',
                event: 'tap',
                fn: 'onDeleteContactsButton'
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
            }
        ]
    },
    
    onItemDisclose: function(scope, record, target, index, e, eOpts) {
        console.log('onItemDisclose');
        
        this.fireEvent('itemDiscloseCommand', this, index);
    },
    
    onBackButtonTap: function(scope, e, eOpts) {
        console.log('onBackButtonTap');
        
        this.fireEvent('backButtonCommand', this);
    },
    
    onLoadContactsButton: function(scope, e, eOpts) {
        console.log('onLoadContactsButton');
        
        this.fireEvent('loadContactsCommand', this);
    },
    
    onDeleteContactsButton: function() {
        console.log('onDeleteContactsButton');
        
        this.fireEvent('deleteContactsCommand', this);        
    },
    
    onLocationButton: function() {
        console.log('onLocationButton');
        
        this.fireEvent('locationCommand', this);
    },
    
    onMapRender: function(scope, map, eOpts) {
        console.log('onMapRender');
        
        this.fireEvent('mapRenderCommand', this, map);
    }
});