/**
 * DeleteActionSheet rappresenta una ActionSheet personalizzata che consente
 * di eliminare dal giusto store il record selezionato a seconda che sia una nota
 * oppure un autore.
 */
Ext.define('SensorDevice.view.DeleteActionSheet', {
    extend: 'Ext.ActionSheet',
    alias: 'widget.deleteactionsheet',
    
    config: {
        /**
         * @cfg {String} type Proprietà che identifica una nota (note) o un autore (author),
         * da settare alla creazione dell'oggetto .
         */
        type: 'undefined',
        
        items: [
            {
                text: 'Delete',
                ui: 'decline',
                itemId: 'deleteButtonSheet'
            },
            {
                text: 'Cancel',
                itemId: 'cancelButtonSheet'
            }
        ],
        
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

    /**
     * Metodo che cattura l'evento tap del pulsante Delete e rilancia l'evento
     * corretto per eliminare un autore o una nota.
     */
    onDeleteButtonSheetTap: function() {
        console.log('onDeleteButtonSheetTap', this);
        
        if ('note' == this.getType()) {
            /**
             * @event
             * Lanciato alla pressione del pulsante Delete per la cancellazione di una nota.
             * @param {Ext.Component} this
             */
            this.fireEvent('deleteSheetNoteCommand', this);
        } else {
            /**
             * @event
             * Lanciato alla pressione del pulsante Delete per la cancellazione di un autore.
             * @param {Ext.Component} this
             */
            this.fireEvent('deleteSheetAuthorCommand', this);
        }
        this.hide();
    },

    /**
     * Metodo che cattura l'evento tap del pulsante Cancel e chiude l'ActionSheet
     * senza effettuare alcuna operazione.
     */
    onCancelButtonSheetTap: function() {
        console.log('cancelSheetNoteCommand', this);
        this.hide();
    }
});