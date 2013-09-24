Ext.define('SensorDevice.store.Sensors', {
    extend: 'Ext.data.Store',
    
    config : {
        model: 'SensorDevice.model.Sensor',
        data: [
            { name: 'Camera', description: 'Permette di catturare un\'immagine tramite la fotocamera o la galleria del dispositivo'},
            { name: 'Contacts' , description: 'Permette di consultare e modificare la rubrica del dispositivo'},
            { name: 'Connection', description: 'Permette di visualizzare le informazioni riguardanti la connessione in atto'},
            { name: 'Geolocation', description: 'Permette di visualizzare la posizione corrente del dispositivo'}
        ]
    }
});