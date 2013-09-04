Ext.define('SensorDevice.model.Contact', {
    extend: 'Ext.data.Model',
    
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'First', type: 'string'},
            {name: 'Last' , type:'string'}
        ]
    }
});