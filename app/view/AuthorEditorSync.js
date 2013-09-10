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
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit author',
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
                        itemId: 'saveAuthorButton',
                        iconCls: 'add',
                        iconMask: true,
                        align: 'right'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'trash',
                        iconMask: true,
                        itemId: 'deleteAuthorButton',
                        align: 'right'
                    }
                ]
            },
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