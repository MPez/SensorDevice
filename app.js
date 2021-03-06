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
    //'org': 'org'
});
//</debug>

Ext.application({
    name: 'SensorDevice',
    requires: [
        'Ext.MessageBox'
        
        //'org.s2.syncEngine.SyncManager'
    ],
    
    models: [
        'Sensor',
        'Picture',
        'Contact',
        'Position'
        //'NoteSync',
        //'AuthorSync',
        //'Device'
    ],
    
    stores: [
        'Sensors',
        'Pictures',
        'Contacts',
        'Positions'
        //'DevicesSync'
    ],
    
    controllers: [
        'SensorDevices'
        //'NotesSync'
    ],

    views: [
        'Main',
        'GalleryDemo'
        //'MyNotes',
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
        
        /*
         * creazione dello storeManager da utilizzarsi per la gestione degli store
         *
        var storeManager = Ext.create('SyncManager', {
            dbName: 'SensorDeviceDb',
            appName: this.getName(),
            deviceID: 'Marco'
        });
        
        /*
         * creazione dello store relativo agli autori
         *
        storeManager.createSyncStore({
            model: 'SensorDevice.model.AuthorSync',
            tableID: 'authorID',
            remoteURL: 'http://srv1.soluzioni-sw.it/NotesWeb/Author.aspx',
            storeId: 'Authors'
        });
        
        /*
         * impostazione dei sorter e grouper degli autori
         *
        var authorsStore = Ext.getStore('Authors');
        authorsStore.setSorters({
            property: 'surname',
            direction: 'ASC'
        });
        authorsStore.setGrouper({
            sortProperty: 'surname',
            direction: 'ASC',
            groupFn: function(record) {
                if (record && record.data.surname) {
                    return record.data.surname.substr(0,1).toUpperCase();
                } else {
                    return '';
                }
            }
        });
        
        /*
         * creazione dello store relativo alle note
         *
        storeManager.createSyncStore({
            model: 'SensorDevice.model.NoteSync',
            tableID: 'noteID',
            remoteURL: 'http://srv1.soluzioni-sw.it/NotesWeb/Note.aspx',
            storeId: 'Notes'
        });
        
        /*
         * impostazione dei sorter e grouper delle note
         *
        var notesStore = Ext.getStore('Notes');
        notesStore.setSorters({
            property: 'dateCreated',
            direction: 'DESC'
        });
        notesStore.setGrouper({
            sortProperty: 'dateCreated',
            direction: 'DESC',
            groupFn: function(record) {
                if (record && record.data.dateCreated) {
                    var dataString = record.data.dateCreated;
                    var data = new Date(dataString);
                    return data.toDateString();
                } else {
                    return '';
                }
            }
        });
        
        /*
         * impostazione dello storeManager come proprietà del controller
         *
        var controller = this.getController('NotesSync');
        controller.setManager(storeManager);
        */
        
        // Initialize the main view
        Ext.Viewport.add([
            Ext.create('SensorDevice.view.Main')
        ]);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            'Application Update',
            'This application has just successfully been updated to the latest version. Reload now?',
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
