/**
 * Main rappresenta la vista che gestisce la visualizzazione di tutte le pagine
 * presenti nell'app e selezionabili tramite la tab bar posizionata in basso.
 */
Ext.define('SensorDevice.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'SensorDevice.view.Home',
        'SensorDevice.view.GalleryDemo'
    ],
    config: {
        /**
         * @cfg
         * Posizione della tab bar dalla quale è possibile selezionare le diverse pagine presenti nell'app.
         */
        tabBarPosition: 'bottom',

        items: [
            /*
             * Pagina principale dalla quale è possibile selezionare le diverse funzionalità offerte.
             */
            {
                title: 'Home',
                iconCls: 'home',

                items:
                { xtype: 'home' }
            },
            /*
             * Pagina che rappresenta la galleria immagini.
             */
            {
                title: 'Gallery',
                iconCls: 'star',
                
                items:
                { xtype: 'gallerydemo' }
            },
            /*
             * Pagina che visualizza l'app MyNotes che utilizza il SyncEngine
             *
            {
                title: 'MyNotes',
                iconCls: 'star',
                
                items:
                { xtype: 'mynotes' }
            }
            */
        ]
    }
});
