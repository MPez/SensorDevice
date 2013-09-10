Ext.define('SensorDevice.view.FileDemo', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.field.Radio'
    ],
    alias: 'widget.filedemo',
    
    config: {
        height: '100%',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'File Demo',
                defaults: {
                    xtype: 'button',
                    iconMask: true
                },
                items: [
                    {
                        itemId: 'backButton',
                        ui: 'back',
                        iconCls: 'arrow_left'
                    },
                    {
                        itemId: 'saveFormButton',
                        iconCls: 'action',
                        align: 'right'
                    },
                    {
                        itemId: 'deleteFormButton',
                        iconCls: 'delete',
                        align: 'right'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'About you',
                instructions: 'Tell us about yourself',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Name',
                        value: ''
                    },
                    {
                        xtype: 'textfield',
                        name: 'surname',
                        label: 'Surname',
                        value: ''
                    },
                    {
                        xtype: 'textfield',
                        name: 'address',
                        label: 'Address',
                        value: ''
                    },
                    {
                        xtype: 'radiofield',
                        name: 'sex',
                        label: 'Male',
                        value: 'male',
                        checked: true
                    },
                    {
                        xtype: 'radiofield',
                        name: 'sex',
                        label: 'Female',
                        value: 'female'
                    },
                    {
                        xtype: 'selectfield',
                        name: 'color',
                        label: 'Favourite color',
                        placeHolder: 'Select a color',
                        autoSelect: false,
                        value: null,
                        usePicker: true,
                        options: [
                            { text: 'Red', value: 'red' },
                            { text: 'Orange', value: 'orange' },
                            { text: 'Yellow', value: 'yellow' },
                            { text: 'Green', value: 'green' },
                            { text: 'Blue', value: 'blue' },
                            { text: 'Violet', value: 'violet' }
                        ]
                    }
                ]
            }
        ],
        
        listeners: [
            {
                delegate: '#saveFormButton',
                event: 'tap',
                fn: 'onSaveFormButton'
            },
            {
                delegate: '#deleteFormButton',
                event: 'tap',
                fn: 'onDeleteFormButton'
            }
        ]
    },
    
    onSaveFormButton: function() {
        console.log('onSaveFormButton');
        
        this.fireEvent('saveFormCommand', this);
    },
    
    onDeleteFormButton: function() {
        console.log('onDeleteFormButton');
        
        this.fireEvent('deleteFormCommand', this);
    }
});