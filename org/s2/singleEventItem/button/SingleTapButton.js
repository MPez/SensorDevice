Ext.define('org.s2.singleEventItem.button.SingleTapButton', 
{
    extend : 'Ext.Button',
    xtype  : 'stbutton',

    initialize : function() {
        var me = this;

        me.element.on({
            scope     : me,
            singletap : 'onSingleTap',
            doubletap : 'onDoubleTap'
        });

        me.callParent();
    },

    onSingleTap : function () {
        this.fireEvent('singletap', this);
    },

    onDoubleTap : function () {
        this.fireEvent('doubletap', this);
    }
});