Ext.define('SensorDevice.view.FileDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar'
    ],
    alias: 'widget.filedemo',
    
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'File Demo',
                items: [
                    {
                        xtype: 'backbutton'
                    }
                ]
            }
        ]
    }
});