/**
 * AuthorsListSync rappresenta la vista che visualizza l'elenco degli autori disponibili.
 */
Ext.define('SensorDevice.view.AuthorsListSync', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.dataview.List'
    ],
    alias: 'widget.authorslistsync',
    
    config: {
        layout: 'card',
        modal: true,
        hideOnMaskTap: true,
        width: 200,
        height: 300,
        
        items: [{
            xtype: 'list',
            store: 'Authors',
            itemId: 'authorsList',
            loadingText: 'Loading authors...',
            emptyText: '<div class="author-list-empty-text">No authors found</div>',
            grouped: true,
            itemTpl: '{name} {surname}'
        }],
        
        listeners: [{
            delegate: '#authorsList',
            event: 'itemtap',
            fn: 'onAuthorsListItemSingleTap'
        }]
    },
    
    /**
     * Metodo che cattura l'evento tap relativo all'autore selezionato dalla lista;
     * rilancia l'evento che viene catturato dal controller e nasconde la lista stessa.
     */
    onAuthorsListItemSingleTap: function(list, index, target, record, evt, options) {
        console.log('editAuthorCommand');
        /**
         * @event
         * Lanciato alla selezione di un record sulla lista.
         * @param {Ext.Component} this
         * @param {Ext.data.model} record Istanza dell'autore selezionato
         */
        this.fireEvent('editAuthorCommand', this, record);
        this.hide();
    }
});