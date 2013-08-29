Ext.define("SensorDevice.view.DeviceInfoEditor", {
    extend: "Ext.form.Panel",
    requires: [
        "Ext.form.FieldSet",
        "Ext.field.Text"
    ],
    alias: "widget.deviceinfoeditor",
    
    config: {
        items: [{
            xtype: "toolbar",
            docked: "top",
            title: "Edit device info",
            items: [{
                xtype: "button",
                ui: "back",
                text: "Home",
                itemId: "backButton"
            }, {
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Save",
                ui: "action",
                itemId: "saveButton"
            }]
        }, {
            xtype: "toolbar",
            docked: "bottom"
        }, {
            xtype: "fieldset",
            title: "Device informations",
            instructions: "Write or modify the information about the device",
            items: [{
                xtype: "textfield",
                name: "name",
                label: "Device name",
                required: true
            }, {
                xtype: "textfield",
                name: "description",
                label: "Description"
            }]
        }],
        
        listeners: [{
            delegate: "#backButton",
            event: "tap",
            fn: "onBackButtonTap"
        }, {
            delegate: "#saveButton",
            event: "tap",
            fn: "onSaveButtonTap"
        }]
    },
    
    onSaveButtonTap: function() {
        console.log("saveDeviceInfoCommand");
        this.fireEvent("saveDeviceInfoCommand", this);
    },
    
    onBackButtonTap: function() {
        console.log("backHomeCommand");
        this.fireEvent("backHomeCommand", this);
    }
});