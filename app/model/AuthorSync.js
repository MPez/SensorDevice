/**
 * AuthorSync rappresenta il modello di un autore di una nota utilizzato nella pagina MyNotes
 */
Ext.define("SensorDevice.model.AuthorSync", {
    extend: "Ext.data.Model",
    
    config: {
        /**
         * @cfg
         * Campi dati.
         */
        fields: [
            {name: 'authorID', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'surname', type: 'string'}
        ],
        /**
         * @cfg
         * Validazioni per i campi dati.
         */
        validations: [
            {type: 'presence', field: 'name', message: 'Please enter the name of the author.'},
            {type: 'presence', field: 'surname', message: 'Please enter the surname of the author.'}
        ]
    }
});