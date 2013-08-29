Ext.define("SensorDevice.view.NoteEditorSync", {
    extend: "Ext.form.Panel",
    requires: [
        "Ext.form.FieldSet",
        "Ext.field.Text",
        "Ext.field.TextArea",
        "Ext.field.Select"
    ],
    alias: "widget.noteeditorsync",
    
    config: {
        scrollable: "vertical",
        
        items: [{
            xtype: "toolbar",
            docked: "top",
            title: "Edit note",
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
            title: "Note informations",
            instructions: "Write or modify a note",
            items: [{
                xtype: "textfield",
                name: "title",
                label: "Title",
                required: true
            }, {
                xtype: "selectfield",
                name: "author",
                label: "Author",
                store: "Authors",
                displayField: "surname",
                valueField: "authorID"
            }, {
                xtype: "textareafield",
                name: "narrative",
                label: "Narrative"
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
        console.log("saveNoteCommand");
        this.fireEvent("saveNoteCommand", this);
    },
    
    onBackButtonTap: function() {
        console.log("backHomeCommand");
        this.fireEvent("backHomeCommand", this);
    },
    
    onDeleteButtonTap: function() {
        console.log("deleteNoteCommand", this);
        
        var deleteNoteSheet = Ext.widget("deleteactionsheet");
        deleteNoteSheet.setType("note");
        
        Ext.Viewport.add(deleteNoteSheet);
        
        deleteNoteSheet.show();
    }
});