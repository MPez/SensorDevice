Ext.define('SensorDevice.controller.NotesSync', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.MessageBox',
        
        'SensorDevice.view.NoteEditorSync',
        'SensorDevice.view.AuthorEditorSync',
        'SensorDevice.view.DeviceInfoEditor',
        'SensorDevice.view.DeleteActionSheet'
    ],
    
    config: {
        manager: undefined,
        refs: {
            notesListView: 'mynotes',
            noteEditorView: 'noteeditorsync',
            deleteActionSheet: 'deleteactionsheet',
            authorEditorView: 'authoreditorsync',
            authorsListView: 'authorslistsync',
            deviceInfoEditor: 'deviceinfoeditor'
        },
        control: {
            notesListView: {
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand',
                newAuthorCommand: 'onNewAuthorCommand',
                downloadDbCommand: 'onDownloadDbCommand',
                uploadDbCommand: 'onUploadDbCommand',
                deviceInfoCommand: 'onDeviceInfoCommand'
            },
            
            noteEditorView: {
                saveNoteCommand: 'onSaveNoteCommand',
                backHomeCommand: 'onBackHomeCommand'
            },
            
            deleteActionSheet: {
                deleteSheetNoteCommand: 'onDeleteNoteCommand',
                deleteSheetAuthorCommand: 'onDeleteAuthorCommand'
            },
            
            authorEditorView: {
                saveAuthorCommand: 'onSaveAuthorCommand',
                backHomeCommand: 'onBackHomeCommand'
            },
            
            authorsListView: {
                editAuthorCommand: 'onEditAuthorCommand'
            },
            
            deviceInfoEditor: {
                saveDeviceInfoCommand: 'onSaveDeviceInfoCommand',
                backHomeCommand: 'onBackHomeCommand'
            }
        }
    },
    
    onNewNoteCommand: function() {
        console.log('onNewNoteCommand');
        
        var now = new Date();
        
        var newNote = Ext.create('SensorDevice.model.NoteSync', {
            author: '',
            dateCreated: now,
            title: '',
            narrative: ''
        });
        
        this.activateNoteEditor(newNote);
    },
    
    onEditNoteCommand: function(list, record) {
        console.log('onEditNoteCommand');
        
        this.activateNoteEditor(record);
    },
    
    onNewAuthorCommand: function() {
        console.log('onNewAuthorCommand');

        var newAuthor = Ext.create('SensorDevice.model.AuthorSync', {
            name: '',
            surname: ''
        });
        
        this.activateAuthorEditor(newAuthor);
    },
    
    onEditAuthorCommand: function(list, record) {
        console.log('onEditAuthorCommand');
        
        this.activateAuthorEditor(record);
    },
    
    onDownloadDbCommand: function() {
        console.log('onDownloadDbCommand');
        
        /*
         * codice che usa il syncManager
         */
        var manager = this.getManager();
        manager.downloadFromServer();
    },
    
    onUploadDbCommand: function() {
        console.log('onUploadDbCommand');
        
        /*
         * codice che usa il syncManager
         */
        var manager = this.getManager();
        manager.uploadToServer();
    },
    
    onDeviceInfoCommand: function() {
        console.log('onDeviceInfoCommand');
        
        var deviceStore = Ext.getStore('DevicesSync');
        if (deviceStore.getCount() == 0) {
            var newDevice = Ext.create('SensorDevice.model.Device', {
                deviceId: 1,
                name: '',
                description: ''
            });
        }
        else {
            var newDevice = deviceStore.getAt(0);
        }
        
        this.activateDeviceInfoEditor(newDevice);
    },
    
    onSaveNoteCommand: function() {
        console.log('onSaveNoteCommand');
        
        var noteEditor = this.getNoteEditorView();
        var currentNote = noteEditor.getRecord();
        var newValues = noteEditor.getValues();
        
        currentNote.set('title', newValues.title);
        currentNote.set('narrative', newValues.narrative);
        currentNote.set('author', newValues.author);
        
        var errors = currentNote.validate();
        
        if (!errors.isValid()) {
            errors.each(function(error) {
                Ext.Msg.alert('Wait!', error.getMessage(), Ext.emptyFn);
            });
            currentNote.reject();
            return;
        }
        
        /*
         * codice che usa il SyncManager
         */
        var manager = this.getManager();
        manager.addToStore('Notes', currentNote);

        this.activateNotesList();
    },
    
    onSaveAuthorCommand: function() {
        console.log('onSaveAuthorCommand');
        
        var authorEditor = this.getAuthorEditorView();
        var currentAuthor = authorEditor.getRecord();
        var newValues = authorEditor.getValues();
        
        currentAuthor.set('name', newValues.name);
        currentAuthor.set('surname', newValues.surname);
        
        var errors = currentAuthor.validate();
        
        if (!errors.isValid()) {
            errors.each(function(error) {
                Ext.Msg.alert('Wait!', error.getMessage(), Ext.emptyFn);    
            });
            currentAuthor.reject();
            return;
        }
        
        /*
         * codice che usa il SyncManager
         */
        var manager = this.getManager();
        manager.addToStore('Authors', currentAuthor);

        this.activateNotesList();
    },
    
    onSaveDeviceInfoCommand: function() {
        console.log('onSaveDeviceInfoCommand');
        
        var deviceInfoEditor = this.getDeviceInfoEditor();
        var currentDevice = deviceInfoEditor.getRecord();
        var newValues = deviceInfoEditor.getValues();
        
        currentDevice.set('name', newValues.name);
        currentDevice.set('description', newValues.description);
        
        var errors = currentDevice.validate();
        
        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField('name')[0].getMessage(), Ext.emptyFn);
            currentDevice.reject();
            return;
        }
        
        var deviceStore = Ext.getStore('DevicesSync');
        
        if (null == deviceStore.findRecord('deviceId', currentDevice.data.deviceId)) {
            console.log('New device added to the store');
            console.log(currentDevice.getData());
            
            deviceStore.add(currentDevice);
        }
        
        deviceStore.sync();
        
        this.activateNotesList();
    },
    
    onBackHomeCommand: function() {
        console.log('onBackHomeCommand');
        
        this.activateNotesList();
    },
    
    onDeleteNoteCommand: function() {
        console.log('onDeleteNoteCommand');
        
        var noteEditor = this.getNoteEditorView();
        var currentNote = noteEditor.getRecord();
        
        /*
         * codice che usa il SyncManager
         */
        var manager = this.getManager();
        manager.deleteFromStore('Notes', currentNote);
        
        this.activateNotesList();
    },
    
    onDeleteAuthorCommand: function() {
        console.log('onDeleteAuthorCommand');
        
        var authorEditor = this.getAuthorEditorView();
        var currentAuthor = authorEditor.getRecord();

        /*
         * codice che usa il SyncManager
         */
        var manager = this.getManager();
        manager.deleteFromStore('Author', currentAuthor);
        
        this.activateNotesList();
    },
    
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min +1)) + min;
    },
    
    activateNoteEditor: function(record) {
        var noteEditor = this.getNoteEditorView();
        noteEditor.setRecord(record);
        Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
    },
    
    activateAuthorEditor: function(record) {
        var authorEditor = this.getAuthorEditorView();
        authorEditor.setRecord(record);
        Ext.Viewport.animateActiveItem(authorEditor, this.slideLeftTransition);
    },
    
    activateDeviceInfoEditor: function(record) {
        var deviceInfoEditor = this.getDeviceInfoEditor();
        deviceInfoEditor.setRecord(record);
        Ext.Viewport.animateActiveItem(deviceInfoEditor, this.slideLeftTransition);
    },
    
    slideLeftTransition: {type: 'slide', direction: 'left'},
    
    activateNotesList: function() {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },
    
    slideRightTransition: {type: 'slide', direction: 'right'},
    
    launch: function() {
        this.callParent();
        
        Ext.getStore('DevicesSync').load(function(records, operation, success) {
            if(Ext.getStore('DevicesSync').getCount() == 0) {
                Ext.Msg.alert('Id device mancante',
                              'Si prega di inserire il nome del device e salvarlo per poter utilizzare l\'applicazione',
                              this.onDeviceInfoCommand());
            }
        }, this);
        
        /*
         * codice che usa il SyncManager
         */
        var manager = this.getManager();
        manager.loadDatabase();

        console.log('launch');
    },
    
    init: function() {
        this.callParent();
        
        console.log('init');
    }
});