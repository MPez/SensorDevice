Ext.define('SensorDevice.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'SensorDevice.view.Home'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Home',
                iconCls: 'home',

                items:
                { xtype: 'home' }
            },
            {
                title: 'MyNotes',
                iconCls: 'star',
                
                items:
                { xtype: 'mynotes' }
            }
        ]
    }
});
