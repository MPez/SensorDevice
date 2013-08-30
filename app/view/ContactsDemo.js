Ext.define('SensorDevice.view.ContactsDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar'
    ],
    alias: 'widget.contactsdemo',
    
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Contacts Demo',
                items: [
                    {
                        xtype: 'backbutton'
                    }
                ]
            }
        ]
    }
});