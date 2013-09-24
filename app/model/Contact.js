/**
 * Contact rappresenta il modello per la lettura dei contatti presenti nel dispositivo
 */
Ext.define('SensorDevice.model.Contact', {
    extend: 'Ext.data.Model',
    
    config: {
        /**
         * @cfg
         * Tipo di indentificatore per i record.
         */
        identifier: 'uuid',
        /**
         * @cfg
         * Campi dati.
         */
        fields: [
            {name: 'name', type: 'string'},
            {name: 'surname' , type:'string'},
            {name: 'email' , type:'string'},
            {name: 'address', type: 'string'},
            {name: 'phoneNumber', type: 'string'}
        ]
    }
});