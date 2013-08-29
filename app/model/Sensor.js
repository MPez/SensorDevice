Ext.define('SensorDevice.model.Sensor', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string'}
        ]
    }
});
