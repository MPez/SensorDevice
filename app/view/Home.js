Ext.define('SensorDevice.view.Home', {
    extend: 'Ext.Container',
    requires: [
        'SensorDevice.view.BackButton',
        'SensorDevice.view.CameraDemo',
        'SensorDevice.view.FileDemo',
        'SensorDevice.view.ContactsDemo',
        'SensorDevice.view.MediaDemo',
        
        'Ext.dataview.List',
        'Ext.TitleBar'
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
                items: 
                { xtype: 'filedemo' }
            },
            {
                items: 
                { xtype: 'camerademo' }
            },
            {
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Contacts Demo',
                        items: [
                            {
                                xtype: 'backbutton'
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
                        empyText: '<div>No contacts found.</div>',
                        grouped: true,
                        indexBar: true
                    }
                ]
            },
            {
                items:
                { xtype: 'mediademo' }
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
    }
});