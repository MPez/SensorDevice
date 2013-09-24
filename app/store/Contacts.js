Ext.define('SensorDevice.store.Contacts', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.Sql'
    ],
    
    config: {
        model: 'SensorDevice.model.Contact',
        storeId: 'Contacts',
        
        proxy: {
            type: 'sql',
            database: 'SensorDeviceDb'
        },
        
        sorters: [
            {property: 'surname', direction: 'ASC'}
        ],
        
        grouper: {
            sortProperty: 'surname',
            direction: 'ASC',
            groupFn: function(record) {
                if (record && record.data.surname) {
                    return record.data.surname.substr(0,1).toUpperCase();
                } else {
                    return '';
                }
            }
        }
    }
});