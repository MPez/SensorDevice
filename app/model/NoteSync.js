/**
 * NotesSync rappresenta il modello di una nota utilizzata nella pagina MyNotes
 */
Ext.define('SensorDevice.model.NoteSync', {
    extend: 'Ext.data.Model',
    
    config: {
        /**
         * @cfg
         * Campi dati.
         */
        fields: [
            {name: 'noteID', type: 'string'},
            {name: 'author', type: 'string'},
            {name: 'dateCreated', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'narrative', type: 'string'}
        ],
        /**
         * @cfg
         * Validazioni per i campi dati.
         */
        validations: [
            {type: 'presence', field: 'author'},
            {type: 'presence', field: 'dateCreated'},
            {type: 'presence', field: 'title', message: 'Please enter a title for this note.'}
        ]
    }
});