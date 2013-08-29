Ext.define('SensorDevice.view.SensorList', {
    extend: 'Ext.navigation.View',
    requires: [
        'Ext.dataview.List'
    ],
    alias: 'widget.sensorlist',
    
    config: {
        height: '100%',
        
        items: [
            {
                title: 'Sensor Device List',
                items: [
                    {
                        xtype: 'list',
                        itemId: 'sensorList',
                        store: 'Sensors',
                        itemTpl: '{name}: {description}',
                        height: '100%',
                        onItemDisclosure: true
                    }
                ]
            }
        ],
        
        listeners: [
            {
                delegate: '#sensorList',
                event: 'disclose',
                fn: 'onItemDisclose'
            }
        ]
    },
    
    onItemDisclose: function(scope, record, target, index, e, eOpts) {
        console.log('onItemDisclose');
        
        this.fireEvent('itemDiscloseCommand', this, index);
    }
});