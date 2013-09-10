Ext.define('SensorDevice.view.DeviceInfoEditor', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.TitleBar'
    ],
    alias: 'widget.deviceinfoeditor',
    
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit device info',
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
                        itemId: 'saveDeviceButton',
                        iconCls: 'add',
                        iconMask: true,
                        align: 'right'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Device informations',
                instructions: 'Write or modify the information about the device',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Device name',
                        required: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'description',
                        label: 'Description'
                    }
                ]
            }
        ]
    }
});