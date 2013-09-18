/**
 * Device rappresenta il modello delle informazioni base del dispositivo, da utilizzare come identificativo
 * all'interno della pagina MyNotes per rendere univoco nel sistema ogni dispositivo utilizzato
 */
Ext.define('SensorDevice.model.Device', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.LocalStorage',
        'Ext.data.proxy.Sql'
    ],
    
    config: {
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