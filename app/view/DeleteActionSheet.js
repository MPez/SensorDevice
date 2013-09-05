Ext.define('SensorDevice.view.DeleteActionSheet', {
    extend: 'Ext.ActionSheet',
    alias: 'widget.deleteactionsheet',
    
    config: {
        /*
         * proprietà che identifica una nota o un autore, da settare alla creazione dell'oggetto
         */
        type: 'undefined',
        
        items: [{
            text: 'Delete',
            ui: 'decline',
            itemId: 'deleteButtonSheet'
        }, {
            text: 'Cancel',
            itemId: 'cancelButtonSheet'
        }],
        
        listeners: [{
            delegate: '#deleteButtonSheet',
            event: 'tap',
            fn: 'onDeleteButtonSheetTap'
        }, {
            delegate: '#cancelButtonSheet',
            event: 'tap',
            fn: 'onCancelButtonSheetTap'
        }]
    },

    onDeleteButtonSheetTap: function() {
        console.log('onDeleteButtonSheetTap', this);
        
        if ('note' == this.getType()) {
            this.fireEvent('deleteSheetNoteCommand', this);
        } else {
            this.fireEvent('deleteSheetAuthorCommand', this);
        }
        this.hide();
    },

    onCancelButtonSheetTap: function() {
        console.log('cancelSheetNoteCommand', this);
        this.hide();
    }
});