Ext.define('SensorDevice.store.Pictures', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    
    config: {
        model: 'SensorDevice.model.Picture',
        storeId: 'Pictures',
        
        proxy: {
            type: 'localstorage',
            id: 'SensorDevice-picture-store'
        },
        
        sorters: [
            {property: 'timestamp', direction: 'ASC'}
        ],
        
        grouper: {
            sortProperty: 'timestamp',
            direction: 'ASC',
            groupFn: function(record) {
                if (record && record.data.timestamp) {
                    return Ext.Date.format(record.data.timestamp, 'Y F');
                } else {
                    return '';
                }
            }
        }
    }
});