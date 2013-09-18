/**
 * AuthorEditorSync rappresenta la vista della form che contiene i campi propri
 * dell'autore selezionato tramite la lista {@link AuthorsListSync} visualizzata
 * tramite la vista {@link MyNotes}; questi campi possono essere modificati e salvati.
 */
Ext.define('SensorDevice.view.AuthorEditorSync', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.TitleBar'
    ],
    alias: 'widget.authoreditorsync',

    config: {
        
        items: [
            /*
             * Barra del titolo contenente i pulsanti di ritorno alla pagina principale,
             * di salvataggio ed eliminazione dell'autore
             */
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit author',
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
                        itemId: 'saveAuthorButton',
                        iconCls: 'add',
                        align: 'right'
                    },
                    {
                        iconCls: 'trash',
                        itemId: 'deleteAuthorButton',
                        align: 'right'
                    }
                ]
            },
            /*
             * Form contenente i campi dell'autore modificabili dall'utente
             */
            {
                xtype: 'fieldset',
                title: 'Author informations',
                instructions: 'Write or modify an author',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Name',
                        required: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'surname',
                        label: 'Surname',
                        required: true
                    }
                ]
            }
        ]
    }
});