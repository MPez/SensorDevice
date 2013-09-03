Ext.define('SensorDevice.view.PictureItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: [
        'Ext.Img'
    ],
    alias: 'widget.pictureitem',
    
    config: {
        cls: 'picture-list-item',
        
        dataMap: {
            getImage: {
                setSrc: 'uri'
            }
        },
        
        image: true,
        
        layout: {
            type: 'hbox',
            align: 'center'
        }
    },
    
    applyImage: function(config) {
        //console.log('onApplyImage');
        
        return Ext.factory(config, Ext.Img, this.getImage());
    },

    updateImage: function(newImage, oldImage) {
        //console.log('onUpdateImage');
        
        if (newImage) {
            this.add(newImage);
        }

        if (oldImage) {
            this.remove(oldImage);
        }
    },
});