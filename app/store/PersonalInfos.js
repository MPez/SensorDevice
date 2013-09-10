Ext.define('SensorDevice.store.PersonalInfos', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.Sql'
    ],
    
    config: {
        model: 'SensorDevice.model.PersonalInfo',
        storeId: 'PersonalInfos',
        
        proxy: {
            type: 'sql',
            database: 'SensorDeviceDb'
        }
    }
});