Ext.define('SensorDevice.controller.SensorDevices', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            sensorlistview: 'sensorlist'
        },
        control: {
            sensorlistview: {
                itemDiscloseCommand: 'onItemDiscloseCommand'
            }
        }
    },
    
    onItemDiscloseCommand: function(list, index) {
        console.log('onItemTapCommand');
        if (index == 0) {
            //code
        }
        else if (index == 1) {
            //code
        }
        else if (index == 2) {
            //code
        }
        else if (index == 3) {
            //code
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    }
});
