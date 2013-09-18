/**
 * MyNotes rappresenta la pagina principale dell'app MyNotes che consente di creare autori
 * e salvare note di lavoro sul dispositivo mediante uno store di tipo webSQL.
 * Tale app utilizza il SyncEngine attraverso chiamate di metodi al SyncManager che si occupa
 * di creare dinamicamente gli store rischiesti e di gestire correttamente i dati salvati.
 */
Ext.define('SensorDevice.view.MyNotes', {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        
        'SensorDevice.view.AuthorsListSync',
        'SensorDevice.view.NoteEditorSync',
        'SensorDevice.view.AuthorEditorSync',
        'SensorDevice.view.DeviceInfoEditor'
    ],
    alias: 'widget.mynotes',
    
    config: {
        /**
         * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
         * da impostare a 100% per consentire la visualizzazione dei diversi componenti.
         */
        height: '100%',
        /**
         * @cfg
         * Layout di tipo card che permette di scorrere le diverse pagine.
         */
        layout: {
            type: 'card',
            animation: 'fade'
        },
        items: [
            /*
            * item 0
            * Pagina iniziale contenente la barra del titolo e la lista delle note presenti nello store.
            */
            {
                items: [
                    {
                        xtype: 'titlebar',
                        title: 'My Notes',
                        docekd: 'top',
                        itemId: 'notesTitleBar',
                        
                        defaults: {
                            xtype: 'button',
                            iconMask: true
                        },
                        
                        items: [
                            {
                                itemId: 'uploadDbButton',
                                iconCls: 'arrow_up',
                                align: 'left'
                            },
                            {
                                itemId: 'downloadDbButton',
                                iconCls: 'arrow_down',
                                align: 'left'
                            },
                            {
                                itemId: 'newNoteButton',
                                iconCls: 'compose',
                                align: 'right',
                                margin: '0 20 0 0'
                            },
                            {
                                itemId: 'newAuthorButton',
                                iconCls: 'user',
                                align: 'right'
                            },
                            {
                                itemId: 'editAuthorButton',
                                iconCls: 'team',
                                align: 'right',
                                margin: '0 20 0 0'
                            },
                            {
                                itemId: 'deviceInfoButton',
                                iconCls: 'info',
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        /**
                        * @cfg {String} height Proprietà CSS che identifica l'altezza del Container;
                        * da impostare a 100% per consentire la visualizzazione della lista.
                        */
                        height: '100%',
                        store: 'Notes',
                        itemId: 'notesList',
                        loadingText: 'Loading notes...',
                        emptyText: '<div class="notes-list-empty-text">No notes found</div>',
                        onItemDisclosure: true,
                        grouped: true,
                        itemTpl: '<pre><div class="list-item-title">{title} by {author}</div><div class="list-item-narrative">{narrative}</div></pre>'
                    }
                ]
            },
            /*
            * item 1
            * Pagina che visualizza la form che descrive il contenuto dei diversi campi di una nota.
            */
            {
                xtype: 'noteeditorsync'
            },
            /*
             * item 2
             * Pagina che visualizza la form che descrive il conenuto dei diversi campi di un autore.
             */
            {
                xtype: 'authoreditorsync'
            },
            /*
            * item 3
            * Pagina che visualizza la form che descrive il conenuto dei diversi campi informativi del dispositivo.
            */
            {
                xtype: 'deviceinfoeditor'
            }
        ],
        
        listeners: [
            {
                delegate: '#notesList',
                event: 'disclose',
                fn: 'onNotesListDisclose'
            },
            {
                delegate: '#newNoteButton',
                event: 'tap',
                fn: 'onNewNoteButtonTap'
            },
            {
                delegate: '#deviceInfoButton',
                event: 'tap',
                fn: 'onDeviceInfoButton'
            },
            {
                delegate: '#newAuthorButton',
                event: 'tap',
                fn: 'onNewAuthorButton'
            },
            {
                delegate: '#editAuthorButton',
                event: 'tap',
                fn: 'onEditAuthorButton'
            },
            {
                delegate: '#downloadDbButton',
                event: 'tap',
                fn: 'onDownloadDbButton'
            },
            {
                delegate: '#uploadDbButton',
                event: 'tap',
                fn: 'onUploadDbButton'
            },
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            },
            {
                delegate: '#saveNoteButton',
                event: 'tap',
                fn: 'onSaveNoteButtonTap'
            },
            {
                delegate: '#deleteNoteButton',
                event: 'tap',
                fn: 'onDeleteNoteButtonTap'
            },
            {
                delegate: '#saveAuthorButton',
                event: 'tap',
                fn: 'onSaveAuthorButtonTap'
            },
            {
                delegate: '#deleteAuthorButton',
                event: 'tap',
                fn: 'onDeleteAuthorButtonTap'
            },
            {
                delegate: '#saveDeviceButton',
                event: 'tap',
                fn: 'onSaveDeviceButtonTap'
            }
        ]
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che crea una nuova nota;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onNewNoteButtonTap: function(scope, e, eOpts) {
        console.log('onNewNoteButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante che crea una nuova nota.
         * @param {Ext.Component} this
         */
        this.fireEvent('newNoteCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che visualizza una nota;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onNotesListDisclose: function(scope, record, target, index, evt, options) {
        console.log('onNotesListDisclose');
        /**
         * @event
         * Lanciato alla pressione del pulsante che visualizza una nota.
         * @param {Ext.Component} this
         */
        this.fireEvent('editNoteCommand', this, record);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che visualizza le informazioni sul dispositivo;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onDeviceInfoButton: function(scope, e, eOpts) {
        console.log('onDeviceInfoButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante che visualizza le informazioni sul dispositivo.
         * @param {Ext.Component} this
         */
        this.fireEvent('deviceInfoCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che crea un nuovo autore;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onNewAuthorButton: function(scope, e, eOpts) {
        console.log('onNewAuthorButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante che crea un nuovo autore.
         * @param {Ext.Component} this
         */
        this.fireEvent('newAuthorCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che visualizza un autore;
     * crea la vista authorsListSync e la visualizza.
     */
    onEditAuthorButton: function(scope, e, eOpts) {
        console.log('onEditAuthorButton');
        var authorsList = Ext.widget('authorslistsync');
        authorsList.showBy(scope);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che scarica i database di note ed autori dal server;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onDownloadDbButton: function(scope, e, eOpts) {
        console.log('onDownloadDbButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante che scarica i database di note ed autori dal server.
         * @param {Ext.Component} this
         */
        this.fireEvent('downloadDbCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che carica i databse di note ed autori sul server;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onUploadDbButton: function(scope, e, eOpts) {
        console.log('onUploadDbButton');
        /**
         * @event
         * Lanciato alla pressione del pulsante che carica i database di note ed autori sul server.
         * @param {Ext.Component} this
         */
        this.fireEvent('uploadDbCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che salva una nota;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onSaveNoteButtonTap: function(scope, e, eOpts) {
        console.log('onSaveNoteButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante che salva una nota.
         * @param {Ext.Component} this
         */
        this.fireEvent('saveNoteCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che elimina una nota;
     * crea e visualizza la vista deleteActionSheet che chiede conferma di eliminazione della nota selezionata.
     */
    onDeleteNoteButtonTap: function(scope, e, eOpts) {
        console.log('onDeleteNoteButtonTap');
        var deleteNoteSheet = Ext.widget('deleteactionsheet');
        deleteNoteSheet.setType('note');
        Ext.Viewport.add(deleteNoteSheet);
        deleteNoteSheet.show();
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che salva un autore;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onSaveAuthorButtonTap: function(scope, e, eOpts) {
        console.log('saveAuthorCommand');
        /**
         * @event
         * Lanciato alla pressione del pulsante che salva un autore.
         * @param {Ext.Component} this
         */
        this.fireEvent('saveAuthorCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che elimina un autore;
     * crea e visualizza la vista deleteActionSheet che chiede conferma di eliminazione dell'autore selezionato.
     */
    onDeleteAuthorButtonTap: function(scope, e, eOpts) {
        console.log('deleteAuthorCommand', this);
        var deleteAuthorSheet = Ext.widget('deleteactionsheet');
        deleteAuthorSheet.setType('author');
        Ext.Viewport.add(deleteAuthorSheet);
        deleteAuthorSheet.show();
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante di ritorno alla pagina principale;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onBackButtonTap: function(scope, e, eOpts) {
        console.log('onBackButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante di ritorno alla pagina principale.
         * @param {Ext.Component} this
         */
        this.fireEvent('backHomeCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante che salva le informazioni del dispositivo;
     * rilancia l'evento che verrà catturato dal controller.
     */
    onSaveDeviceButtonTap: function() {
        console.log('saveDeviceButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante che salva le informazioni del dispositivo.
         * @param {Ext.Component} this
         */
        this.fireEvent('saveDeviceInfoCommand', this);
    }
});