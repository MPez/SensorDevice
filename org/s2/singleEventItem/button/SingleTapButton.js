/**
 * SingleTapButton specializza un pulsante aggiungendo due eventi che specificano
 * se il pulsante è stato premuto una sola volta oppure due.
 * Necessario per evitare il lancio di troppi eventi asincroni con relative chiamate verso
 * un server.
 */
Ext.define('org.s2.singleEventItem.button.SingleTapButton', 
{
    extend : 'Ext.Button',
    xtype  : 'stbutton',

    /**
     * Metodo di inizializzazione della classe.
     */
    initialize : function() {
        var me = this;

        me.element.on({
            scope     : me,
            singletap : 'onSingleTap',
            doubletap : 'onDoubleTap'
        });

        me.callParent();
    },

    /**
     * Metodo che cattura l'evento di tap singolo e rilancia l'evento.
     */
    onSingleTap : function () {
        /**
         * @event
         * Lanciato ad ogni tap singolo.
         *
         * @param {Ext.Component} this
         */
        this.fireEvent('singletap', this);
    },

    /**
     * Metodo che cattura l'evento di tap doppio e rilancia l'evento.
     */
    onDoubleTap : function () {
        /**
         * @event
         * Lanciato ad ogni tap doppio.
         *
         * @param {Ext.Component} this
         */
        this.fireEvent('doubletap', this);
    }
});