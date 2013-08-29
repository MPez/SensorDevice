Ext.define('SensorDevice.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'SensorDevice.view.SensorList'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Home',
                iconCls: 'home',
                
                //styleHtmlContent: true,
                //scrollable: true,

                items: [
                    {
                        xtype: 'sensorlist'
                    }
                ]
            },
            {
                title: 'MyNotes',
                iconCls: 'star',
                
                items: [
                    {
                        xtype: 'mynotes'
                    }
                ]
            }
        ]
    }
});
