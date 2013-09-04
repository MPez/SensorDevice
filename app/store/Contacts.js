Ext.define('SensorDevice.store.Contacts', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    
    config: {
        model: 'SensorDevice.model.Contact',
        storeId: 'Contacts',
        
        proxy: {
            type: 'localstorage',
            id: 'SensorDevice-contacts-store'
        },
        
        sorters: [
            {property: 'Last', direction: 'ASC'}
        ],
        
        grouper: {
            sortProperty: 'Last',
            direction: 'ASC',
            groupFn: function(record) {
                if (record && record.data.Last) {
                    return record.data.Last.substr(0,1).toUpperCase();
                } else {
                    return '';
                }
            }
        }
    }
});