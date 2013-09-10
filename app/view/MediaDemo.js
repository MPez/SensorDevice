Ext.define('SensorDevice.view.MediaDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar'
    ],
    alias: 'widget.mediademo',
    
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Media Demo',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        ui: 'back',
                        iconCls: 'arrow_left',
                        iconMask: true
                    }
                ]
            }
        ]
    }
});