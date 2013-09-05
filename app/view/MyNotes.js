Ext.define('SensorDevice.view.MyNotes', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        
        'SensorDevice.view.AuthorsListSync'
    ],
    alias: 'widget.mynotes',
    
    config: {
        height: '100%',
        store: 'Notes',
        itemId: 'notesList',
        loadingText: 'Loading notes...',
        emptyText: '<div class="notes-list-empty-text">No notes found</div>',
        onItemDisclosure: true,
        grouped: true,
        itemTpl: '<pre><div class="list-item-title">{title} by {author}</div><div class="list-item-narrative">{narrative}</div></pre>',
        
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
                        itemId: 'uploadButton',
                        iconCls: 'arrow_up',
                        align: 'left'
                    },
                    {
                        //text: 'Down DB',
                        itemId: 'downloadButton',
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
                        align: 'right',
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
                        align: 'right',
                    }
                ]
            }
        ],
        
        listeners: [
            {
                disclose: 'onNotesListDisclose'
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
            }
        ]
    },
    
    onNewNoteButtonTap: function() {
        console.log('onNewNoteButtonTap');
        this.fireEvent('newNoteCommand', this);
    },
    
    onNotesListDisclose: function(list, record, target, index, evt, options) {
        console.log('onNotesListDisclose');
        this.fireEvent('editNoteCommand', this, record);
    },
    
    onDeviceInfoButton: function() {
        console.log('onDeviceInfoButton');
        this.fireEvent('deviceInfoCommand', this);
    },
    
    onNewAuthorButton: function() {
        console.log('onNewAuthorButton');
        this.fireEvent('newAuthorCommand', this);
    },
    
    onEditAuthorButton: function(scope, e, eOpts) {
        console.log('onEditAuthorButton');
        
        var authorsList = Ext.widget('authorslistsync');
        
        authorsList.showBy(scope);
    },
    
    onDownloadDbButton: function() {
        console.log('onDownloadDbButton');
        this.fireEvent('downloadDbCommand', this);
    },
    
    onUploadDbButton: function() {
        console.log('onUploadDbButton');
        this.fireEvent('uploadDbCommand', this);
    }
});