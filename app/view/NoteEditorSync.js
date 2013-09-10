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
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit note',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        ui: 'back',
                        iconCls: 'arrow_left',
                        iconMask: true,
                        align: 'left'
                    },
                    {
                        xtype: 'button',
                        //text: 'Save',
                        iconCls: 'add',
                        iconMask: true,
                        itemId: 'saveNoteButton',
                        align: 'right'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'trash',
                        iconMask: true,
                        itemId: 'deleteNoteButton',
                        align: 'right'
                    }
                ]
            },
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