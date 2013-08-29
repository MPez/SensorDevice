Ext.define("SensorDevice.view.NotesListSync", {
    extend: "Ext.Container",
    requires: [
        "Ext.dataview.List",
        "Ext.Toolbar"
    ],
    alias: "widget.noteslistsync",
    
    config: {
        layout: {
            type: "fit"
        },
        
        items: [{
            xtype: "toolbar",
            title: "My Notes",
            docked: "top",
            itemId: "noteTopToolbar",
            items: [{
                xtype: "button",
                text: "Upload DB",
                ui: "action",
                itemId: "uploadDbButton"
            }, {
                xtype: "button",
                text: "Download DB",
                ui: "action",
                itemId: "downloadDbButton"
            }, {
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Device info",
                ui: "action",
                itemId: "deviceInfoButton"
            }]
        }, {
            xtype: "list",
            store: "Notes",
            itemId: "notesList",
            loadingText: "Loading notes...",
            emptyText: '<div class="notes-list-empty-text">No notes found</div>',
            onItemDisclosure: true,
            //grouped: true,
            itemTpl: '<pre><div class="list-item-title">{title} by {author}</div><div class="list-item-narrative">{narrative}</div></pre>'
        }, {
            xtype: "toolbar",
            docked: "bottom",
            itemId: "noteBottomToolbar",
            items: [{
                xtype: "button",
                text: "New note",
                ui: "action",
                itemId: "newNoteButton"
            }, {
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "New author",
                ui: "action",
                itemId: "newAuthorButton"
            }, {
                xtype: "button",
                text: "Edit author",
                ui: "action",
                itemId: "editAuthorButton"
            }]
        }],
        
        listeners: [{
            delegate: "#newNoteButton",
            event: "tap",
            fn: "onNewNoteButtonTap"
        }, {
            delegate: "#notesList",
            event: "disclose",
            fn: "onNotesListDisclose"
        }, {
            delegate: "#deviceInfoButton",
            event: "tap",
            fn: "onDeviceInfoButton"
        }, {
            delegate: "#newAuthorButton",
            event: "tap",
            fn: "onNewAuthorButton"
        }, {
            delegate: "#editAuthorButton",
            event: "tap",
            fn: "onEditAuthorButton"
        }, {
            delegate: "#downloadDbButton",
            event: "tap",
            fn: "onDownloadDbButton"
        }, {
            delegate: "#uploadDbButton",
            event: "tap",
            fn: "onUploadDbButton"
        }]
    },
    
    onNewNoteButtonTap: function() {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    
    onNotesListDisclose: function(list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent("editNoteCommand", this, record);
    },
    
    onDeviceInfoButton: function() {
        console.log("deviceInfoCommand");
        this.fireEvent("deviceInfoCommand", this);
    },
    
    onNewAuthorButton: function() {
        console.log("newAuthorCommand");
        this.fireEvent("newAuthorCommand", this);
    },
    
    onEditAuthorButton: function() {
        console.log("editAuthorCommand");
        
        var authorsList = Ext.widget("authorslistsync");
        
        var button = this.getComponent("noteBottomToolbar").getComponent("editAuthorButton");
        
        authorsList.showBy(button);
    },
    
    onDownloadDbButton: function() {
        console.log("downloadDbCommand");
        this.fireEvent("downloadDbCommand", this);
    },
    
    onUploadDbButton: function() {
        console.log("uploadDbCommand");
        this.fireEvent("uploadDbCommand", this);
    }
});