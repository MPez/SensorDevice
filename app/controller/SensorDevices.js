Ext.define('SensorDevice.controller.SensorDevices', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            sensorlistview: 'sensorlist'
        },
        control: {
            sensorlistview: {
                itemDiscloseCommand: 'onItemDiscloseCommand',
                backButtonCommand: 'onBackButtonCommand'
            }
        }
    },
    
    onItemDiscloseCommand: function(list, index) {
        console.log('onItemTapCommand');
        
        list.setActiveItem(index+1);
    },
    
    onBackButtonCommand: function(list) {
        console.log('onBackButtonCommand');
        
        list.setActiveItem(0);
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    }
});
