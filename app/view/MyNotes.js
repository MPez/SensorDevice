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
        height: '100%',
        layout: {
            type: 'card',
            animation: 'fade'
        },
        setScrollable: true,
        items: [
            {
                /*
                * item #0
                */
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
                                //text: 'Up DB',
                                itemId: 'uploadDbButton',
                                iconCls: 'arrow_up',
                                align: 'left'
                            },
                            {
                                //text: 'Down DB',
                                itemId: 'downloadDbButton',
                                iconCls: 'arrow_down',
                                align: 'left'
                            },
                            {
                                //text: 'New Note',
                                itemId: 'newNoteButton',
                                iconCls: 'compose',
                                align: 'right',
                                margin: '0 20 0 0'
                            },
                            {
                                //text: 'New Author',
                                itemId: 'newAuthorButton',
                                iconCls: 'user',
                                align: 'right'
                            },
                            {
                                //text: 'Edit Author',
                                itemId: 'editAuthorButton',
                                iconCls: 'team',
                                align: 'right',
                                margin: '0 20 0 0'
                            },
                            {
                                //text: 'Device Info',
                                itemId: 'deviceInfoButton',
                                iconCls: 'info',
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
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
            {
                /*
                 * item #1
                 */
                xtype: 'noteeditorsync'
            },
            {
                /*
                 * item #2
                 */
                xtype: 'authoreditorsync'
            },
            {
                /*
                 * item #3
                 */
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
    
    onNewNoteButtonTap: function(scope, e, eOpts) {
        console.log('onNewNoteButtonTap');
        this.fireEvent('newNoteCommand', this);
    },
    
    onNotesListDisclose: function(scope, record, target, index, evt, options) {
        console.log('onNotesListDisclose');
        this.fireEvent('editNoteCommand', this, record);
    },
    
    onDeviceInfoButton: function(scope, e, eOpts) {
        console.log('onDeviceInfoButton');
        this.fireEvent('deviceInfoCommand', this);
    },
    
    onNewAuthorButton: function(scope, e, eOpts) {
        console.log('onNewAuthorButton');
        this.fireEvent('newAuthorCommand', this);
    },
    
    onEditAuthorButton: function(scope, e, eOpts) {
        console.log('onEditAuthorButton');
        
        var authorsList = Ext.widget('authorslistsync');
        
        authorsList.showBy(scope);
    },
    
    onDownloadDbButton: function(scope, e, eOpts) {
        console.log('onDownloadDbButton');
        
        this.fireEvent('downloadDbCommand', this);
    },
    
    onUploadDbButton: function(scope, e, eOpts) {
        console.log('onUploadDbButton');
        
        this.fireEvent('uploadDbCommand', this);
    },
    
    onSaveNoteButtonTap: function(scope, e, eOpts) {
        console.log('onSaveNoteButtonTap');
        
        this.fireEvent('saveNoteCommand', this);
    },
    
    onDeleteNoteButtonTap: function(scope, e, eOpts) {
        console.log('onDeleteNoteButtonTap');
        
        var deleteNoteSheet = Ext.widget('deleteactionsheet');
        deleteNoteSheet.setType('note');
        
        Ext.Viewport.add(deleteNoteSheet);
        
        deleteNoteSheet.show();
    },
    
    onSaveAuthorButtonTap: function(scope, e, eOpts) {
        console.log('saveAuthorCommand');
        
        this.fireEvent('saveAuthorCommand', this);
    },
    
    onDeleteAuthorButtonTap: function(scope, e, eOpts) {
        console.log('deleteAuthorCommand', this);
        
        var deleteAuthorSheet = Ext.widget('deleteactionsheet');
        deleteAuthorSheet.setType('author');
        
        Ext.Viewport.add(deleteAuthorSheet);
        
        deleteAuthorSheet.show();
    },
    
    onBackButtonTap: function(scope, e, eOpts) {
        console.log('onBackButtonTap');
        
        this.fireEvent('backHomeCommand', this);
    },
    
    onSaveDeviceButtonTap: function() {
        console.log('saveDeviceButtonTap');
        this.fireEvent('saveDeviceInfoCommand', this);
    }
});