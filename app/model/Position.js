/**
 * Position rappresenta il modello per il salvataggio della posizione del dispositivo
 * rilevata tramite il GPS e/o la rete Wi-Fi o 3G
 */
Ext.define('SensorDevice.model.Position', {
    extend: 'Ext.data.Model',
    
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'latitude', type: 'string'},
            {name: 'longitude', type: 'string'},
            {name: 'altitude', type: 'string'},
            {name: 'accuracy', type: 'string'},
            {name: 'altitudeAccuracy', type: 'string'},
            {name: 'heading', type: 'string'},
            {name: 'speed', type: 'string'},
            {name: 'timestamp', type: 'string'}
        ]
    }
});