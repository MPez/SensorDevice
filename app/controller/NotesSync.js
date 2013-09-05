Ext.define('SensorDevice.controller.NotesSync', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.MessageBox',
        
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
                deviceInfoCommand: 'onDeviceInfoCommand',
                saveNoteCommand: 'onSaveNoteCommand',
                backHomeCommand: 'onBackHomeCommand',
                saveAuthorCommand: 'onSaveAuthorCommand',
                saveDeviceInfoCommand: 'onSaveDeviceInfoCommand'
            },
            
            deleteActionSheet: {
                deleteSheetNoteCommand: 'onDeleteNoteCommand',
                deleteSheetAuthorCommand: 'onDeleteAuthorCommand'
            },
            
            authorsListView: {
                editAuthorCommand: 'onEditAuthorCommand'
            }
        }
    },
    
    onNewNoteCommand: function(mynotes) {
        console.log('onNewNoteCommand');
        
        var now = new Date();
        
        var newNote = Ext.create('SensorDevice.model.NoteSync', {
            author: '',
            dateCreated: now,
            title: '',
            narrative: ''
        });
        
        this.activateNoteEditor(newNote);
        
        mynotes.setActiveItem(1);
    },
    
    onEditNoteCommand: function(mynotes, record) {
        console.log('onEditNoteCommand');
        
        this.activateNoteEditor(record);
        
        mynotes.setActiveItem(1);
    },
    
    activateNoteEditor: function(record) {
        var noteEditor = this.getNoteEditorView();
        noteEditor.setRecord(record);
    },
    
    onNewAuthorCommand: function(mynotes) {
        console.log('onNewAuthorCommand');

        var newAuthor = Ext.create('SensorDevice.model.AuthorSync', {
            name: '',
            surname: ''
        });
        
        this.activateAuthorEditor(newAuthor);
        
        mynotes.setActiveItem(2);
    },
    
    onEditAuthorCommand: function(authorslistview, record) {
        console.log('onEditAuthorCommand');
        
        this.activateAuthorEditor(record);
        
        this.getNotesListView().setActiveItem(2);
    },
    
    activateAuthorEditor: function(record) {
        var authorEditor = this.getAuthorEditorView();
        authorEditor.setRecord(record);
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
        
        this.getNotesListView().setActiveItem(3);
    },
    
    activateDeviceInfoEditor: function(record) {
        var deviceInfoEditor = this.getDeviceInfoEditor();
        deviceInfoEditor.setRecord(record);
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

        this.getNotesListView().setActiveItem(0);
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

        this.getNotesListView().setActiveItem(0);
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
        
        this.getNotesListView().setActiveItem(0);
    },
    
    onBackHomeCommand: function(mynotes) {
        console.log('onBackHomeCommand');
        
        mynotes.setActiveItem(0);
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
        
        this.getNotesListView().setActiveItem(0);
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
        
        this.getNotesListView().setActiveItem(0);
    },
    
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min +1)) + min;
    },
    
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

        console.log('launch NotesSync');
    },
    
    init: function() {
        this.callParent();
        
        console.log('init NotesSync');
    }
});