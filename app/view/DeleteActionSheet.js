Ext.define("SensorDevice.view.DeleteActionSheet", {
    extend: "Ext.ActionSheet",
    alias: "widget.deleteactionsheet",
    
    config: {
        //proprietà che identifica una nota o un autore, da settare alla creazione dell'oggetto
        type: "undefined",
        
        items: [{
            text: "Delete",
            ui: "decline",
            itemId: "deleteButtonSheet"
        }, {
            text: "Cancel",
            itemId: "cancelButtonSheet"
        }],
        
        listeners: [{
            delegate: "#deleteButtonSheet",
            event: "tap",
            fn: "onDeleteButtonSheetTap"
        }, {
            delegate: "#cancelButtonSheet",
            event: "tap",
            fn: "onCancelButtonSheetTap"
        }]
    },

    onDeleteButtonSheetTap: function() {
        if ("note" == this.getType()) {
            console.log("deleteSheetNoteCommand", this);
            
            this.fireEvent("deleteSheetNoteCommand", this);
        } else {
            console.log("deleteSheetAuthorCommand", this);
            
            this.fireEvent("deleteSheetAuthorCommand", this);
        }
        this.hide();
    },

    onCancelButtonSheetTap: function() {
        console.log("cancelSheetNoteCommand", this);
        this.hide();
    }
});