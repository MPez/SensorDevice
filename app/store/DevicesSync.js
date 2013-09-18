/**
 * DevicesSync rappresenta lo store webSQL utilizzato per salvare
 * le informazioni di base del dispositivo mobile
 */
Ext.define('SensorDevice.store.DevicesSync', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.Sql'
    ],
    
    config: {
        model: 'SensorDevice.model.Device',
        storeId: 'DevicesSync',
        
        proxy: {
            type: 'sql',
            database: 'SensorDeviceDb'
            
        }
    }
});