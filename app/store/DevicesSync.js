Ext.define('SensorDevice.store.DevicesSync', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'SensorDevice.model.Device',
        storeId: 'DevicesSync',
        //autoLoad: true,
        //autoSync: true
        
        proxy: {
            /*
            type: 'localstorage',
            id: 'device-app-store'
            */
            
            type: 'sql',
            database: 'SensorDeviceDb'
            
        }
    }
});