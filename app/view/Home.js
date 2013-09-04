Ext.define('SensorDevice.view.Home', {
    extend: 'Ext.Panel',
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
                items:
                { xtype: 'contactsdemo' }
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