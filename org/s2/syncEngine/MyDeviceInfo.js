Ext.define('org.s2.syncEngine.MyDeviceInfo',
{
	extend: 'Ext.Class',
	alias: 'MyDeviceInfo',
	
	require:
	[
		'Ext.device.Connection'
	],
	
	config:
	{
		deviceID: 'null'
	},
	
	constructor: function(conf)
	{
		this.setDeviceID(conf.deviceID);
		this.callParent(arguments);
	},
	
	isOnline: function()
	{
		return Ext.device.Connection.isOnline();
	}
});