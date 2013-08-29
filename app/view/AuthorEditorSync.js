Ext.define("SensorDevice.view.AuthorEditorSync", {
    extend: "Ext.form.Panel",
    requires: [
        "Ext.form.FieldSet",
        "Ext.field.Text",
        "Ext.field.TextArea"
    ],
    alias: "widget.authoreditorsync",

    config: {
        scrollable: "vertical",
        
        items: [{
            xtype: "toolbar",
            docked: "top",
            title: "Edit author",
            items: [{
                xtype: "button",
                ui: "back",
                text: "Home",
                itemId: "backButton"
            }, {
                xtype: "spacer"
            }, {
                xtype: "button",
                ui: "action",
                text: "Save",
                itemId: "saveButton"
            }]
        }, {
            xtype: "toolbar",
            docked: "bottom",
            items: [{
                xtype: "button",
                iconCls: "trash",
                iconMask: true,
                itemId: "deleteButton"
            }]
        }, {
            xtype: "fieldset",
            title: "Author informations",
            instructions: "Write or modify an author",
            items: [{
                xtype: "textfield",
                name: "name",
                label: "Name",
                required: true
            }, {
                xtype: "textfield",
                name: "surname",
                label: "Surname",
                required: true
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
        }, {
            delegate: "#deleteButton",
            event: "tap",
            fn: "onDeleteButtonTap"
        }]
    },
    
    onSaveButtonTap: function() {
        console.log("saveAuthorCommand");
        this.fireEvent("saveAuthorCommand", this);
    },
    
    onBackButtonTap: function() {
        console.log("backHomeCommand");
        this.fireEvent("backHomeCommand", this);
    },
    
    onDeleteButtonTap: function() {
        console.log("deleteAuthorCommand", this);
        
        var deleteAuthorSheet = Ext.widget("deleteactionsheet");
        deleteAuthorSheet.setType("author");
        
        Ext.Viewport.add(deleteAuthorSheet);
        
        deleteAuthorSheet.show();
    }
});