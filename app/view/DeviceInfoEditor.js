/**
 * DeviceInfoEditor rappresenta la vista che fornisce le informazione base del dispositivo
 * utili a identificarlo univocamente.
 */
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
            /*
             * Barra del titolo che contiene i pulsanti di ritorno alla pagina principale
             * e di salvataggio delle informazioni del dispositivo.
             */
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit device info',
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
                        itemId: 'saveDeviceButton',
                        iconCls: 'add',
                        align: 'right'
                    }
                ]
            },
            /*
             * Form contentente i campi informativi del dispositivo.
             */
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