Ext.define('org.s2.syncEngine.idHandler.IndexIDModel',
{
	extend: 'Ext.data.Model',
	alias: 'IndexIDModel',
	
	config:
	{
		fields:
		[
			{ name: 'storeID', type: 'string' },
			{ name: 'indexCount', type: 'int', defaultValue: 0 }
		]
	}
});