/**
 * Sensor rappresenta il modello utilizzato per gestire l'elenco delle funzionalità
 * implementate nell'app e visualizzate nella lista della pagina principale
 */
Ext.define('SensorDevice.model.Sensor', {
    extend: 'Ext.data.Model',
    
    config: {
        /**
         * @cfg
         * Campi dati.
         */
        fields: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string'}
        ]
    }
});
