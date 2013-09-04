Ext.define('SensorDevice.view.ContactsDemo', {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List'
    ],
    alias: 'widget.contactsdemo',
    
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Contacts Demo',
                items: [
                    {
                        xtype: 'backbutton'
                    },
                    {
                        xtype: 'button',
                        text: 'Load contacts',
                        itemId: 'loadContactsButton',
                        align: 'right'
                    },
                    {
                        xtype: 'button',
                        text: 'Delete all contacts',
                        itemId: 'deleteContactsButton',
                        align: 'right'
                    }
                ]
            },
            {
                xtype: 'list',
                itemTpl: '{First} {Last}',
                itemId: 'contactsList',
                height: '100%',
                store: {
                    storeId: 'Contacts',
                    fields: [
                        'First',
                        'Last'
                    ]
                }
            }
        ],
        
        listeners: [
            {
                delegate: '#loadContactsButton',
                event: 'tap',
                fn: 'onLoadContactsButton'
            },
            {
                delegate: '#deleteContactsButton',
                event: 'tap',
                fn: 'onDeleteContactsButton'
            }
        ]
    },
    
    onLoadContactsButton: function(scope, e, eOpts) {
        console.log('onLoadContactsButton');
        
        this.fireEvent('loadContactsCommand', this);
    },
    
    onDeleteContactsButton: function() {
        console.log('onDeleteContactsButton');
        
        this.fireEvent('deleteContactsCommand', this);        
    }
});