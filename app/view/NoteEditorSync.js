/**
 * NoteEditorSync rappresenta la vista della form che contiene i campi propri
 * della nota selezionata tramite la lista presente in {@link MyNotes};
 * questi campi possono essere modificati e salvati.
 */
Ext.define('SensorDevice.view.NoteEditorSync', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.field.Select',
        'Ext.TitleBar'
    ],
    alias: 'widget.noteeditorsync',
    
    config: {
        
        items: [
            /*
             * Barra del titolo contenente i pulsanti di ritorno alla pagina principale,
             * di salvataggio ed eliminazione della nota corrente.
             */
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit note',
                defaults: {
                    xtype: 'button',
                    iconMask: true
                },
                items: [
                    {
                        itemId: 'backButton',
                        ui: 'back',
                        iconCls: 'arrow_left',
                        align: 'left'
                    },
                    {
                        iconCls: 'add',
                        itemId: 'saveNoteButton',
                        align: 'right'
                    },
                    {
                        iconCls: 'trash',
                        itemId: 'deleteNoteButton',
                        align: 'right'
                    }
                ]
            },
            /*
             * Form contenente i campi propri della nota modificabili dall'utente.
             */
            {
                xtype: 'fieldset',
                title: 'Note informations',
                instructions: 'Write or modify a note',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: 'Title',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        name: 'author',
                        label: 'Author',
                        store: 'Authors',
                        displayField: 'surname',
                        valueField: 'authorID'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'narrative',
                        label: 'Narrative'
                    }
                ]
            }
        ]
    }
});