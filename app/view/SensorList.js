Ext.define('SensorDevice.view.SensorList', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.dataview.List',
        'SensorDevice.view.BackButton'
    ],
    alias: 'widget.sensorlist',
    
    config: {
        height: '100%',
        layout: {
            type: 'card',
            animation: 'fade'
        },
        
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
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'File Demo',
                        items: [
                            {
                                xtype: 'backbutton'
                            }
                        ]
                    },
                ]
            },
            {
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
                ]
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
                            }
                        ]
                    },
                ]
            },
            {
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Media Demo',
                        items: [
                            {
                                xtype: 'backbutton'
                            }
                        ]
                    },
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
    }
});