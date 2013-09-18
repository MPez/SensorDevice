/**
 * CameraDemo rappresenta la vista dove sono presenti i pulsanti da utilizzare
 * per la cattura di immagini dalla fotocamera o dalla galleria del dispositivo.
 */
Ext.define('SensorDevice.view.CameraDemo', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar'
    ],
    alias: 'widget.camerademo',
    
    config: {
        styleHtmlContent: true,
        items: [
            /*
            * Barra del titolo che contiene il pulsante per tornare alla pagina principale
            */
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Camera Demo',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        ui: 'back',
                        iconCls: 'arrow_left',
                        iconMask: true
                    }
                ]
            },
            /*
             * Pulsante per la cattura di un'immagine tramite la fotocamera
             */
            {
                xtype: 'button',
                itemId: 'cameraButton',
                text: 'Take a picture',
                margin: '0 0 10 0',
                height: 40
            },
            /*
             * Pulsante per il caricamento di un'immagine dalla galleria
             */
            {
                xtype: 'button',
                itemId: 'galleryButton',
                text: 'Load from gallery',
                margin: '0 0 50 0',
                height: 40
            }
        ],
        
        listeners: [
            {
                delegate: '#cameraButton',
                event: 'tap',
                fn: 'onCameraButtonTap'
            },
            {
                delegate: '#galleryButton',
                event: 'tap',
                fn: 'onGalleryButtonTap'
            }
        ]
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante cameraButton e rilancia l'evento
     * che verrà catturato dal controller
     */
    onCameraButtonTap: function(scope, e, eOpts) {
        console.log('onCameraButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante cameraButton
         * @param {Ext.Component} this
         */
        this.fireEvent('cameraButtonCommand', this);
    },
    
    /**
     * Metodo che cattura l'evento tap del pulsante galleryButton e rilancia l'evento
     * che verrà catturato dal controller
     */
    onGalleryButtonTap: function(scope, e, eOpts) {
        console.log('onGalleryButtonTap');
        /**
         * @event
         * Lanciato alla pressione del pulsante galleryButton
         * @param {Ext.Component} this
         */
        this.fireEvent('galleryButtonCommand', this);
    }
});