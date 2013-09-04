/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src'
});
//</debug>

Ext.application({
    name: 'SensorDevice',
    requires: [
        'Ext.MessageBox',
        //'org.s2.syncEngine.SyncManager',
        //'org.s2.syncEngine.basicSyncStore.SyncStore'
    ],
    
    models: [
        'Sensor',
        'Picture',
        //'AuthorSync',
        //'NoteSync',
        //'Device'
    ],
    
    stores: [
        'Sensors',
        'Pictures',
        //'DevicesSync'
    ],
    
    controllers: [
        'SensorDevices',
        //'NotesSync'
    ],

    views: [
        'Main',
        'MyNotes',
        'GalleryDemo',
        //'NotesListSync',
        //'NoteEditorSync',
        ///'AuthorsListSync',
        //'AuthorEditorSync',
        //'DeleteActionSheet',
        //'DeviceInfoEditor'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        
        this.launched = true;
        this.mainLaunch();
        
    },
    
    mainLaunch: function() {
        /*
         * necessario per controllare l'evento deviceready al caricamento di cordova
         *
        if (!device || !this.launched) {
            return;
        }
        */
        console.log('mainLaunch');
        
        
        /*
        var notesListSync = {
            xtype: "noteslistsync"
        };
        
        var noteEditorSync = {
            xtype: "noteeditorsync"
        };
        
        var authorEditorSync = {
            xtype: "authoreditorsync"
        };
        
        var deviceInfoEditor = {
            xtype: "deviceinfoeditor"
        };
        
        /*
         * creazione dello storeManager da utilizzarsi per la gestione degli store
         *
        var storeManager = Ext.create("SyncManager", {
            dbName: "MyDb",
            appName: this.getName(),
            deviceID: "Marco"
        });
        
        /*
         * creazione dello store relativo agli autori
         *
        storeManager.createSyncStore({
            model: "SensorDevice.model.AuthorSync",
            tableID: "authorID",
            remoteURL: 'http://srv1.soluzioni-sw.it/NotesWeb/Author.aspx',
            storeId: "Authors"
        });
        
        /*
         * creazione dello store relativo alle note
         *
        storeManager.createSyncStore({
            model: "SensorDevice.model.NoteSync",
            tableID: "noteID",
            remoteURL: 'http://srv1.soluzioni-sw.it/NotesWeb/Note.aspx',
            storeId: "Notes"
        });
        
        /*
         * impostazione dello storeManager come proprietà del controller
         *
        var controller = this.getController("NotesSync");
        controller.setManager(storeManager);
        */
        
        // Initialize the main view
        Ext.Viewport.add([
            Ext.create('SensorDevice.view.Main'),
            //notesListSync,
            //noteEditorSync,
            //authorEditorSync,
            //deviceInfoEditor
            
        ]);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
