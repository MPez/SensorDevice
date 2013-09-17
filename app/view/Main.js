Ext.define('SensorDevice.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'SensorDevice.view.Home',
        'SensorDevice.view.GalleryDemo'
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
                title: 'Gallery',
                iconCls: 'star',
                
                items:
                { xtype: 'gallerydemo' }
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
