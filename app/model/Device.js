Ext.define("SensorDevice.model.Device", {
    extend: "Ext.data.Model",
    requires: [
        "Ext.data.proxy.LocalStorage",
        "Ext.data.proxy.Sql"
    ],
    
    config: {
        //idProperty: 'deviceId',
        fields: [
            {name: 'deviceId', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'description', type: 'string'}
        ],

        validations: [
            {type: 'presence', field: 'deviceId'},
            {type: 'presence', field: 'name', message: 'Please enter a name for this device.'}
        ]
    }
});