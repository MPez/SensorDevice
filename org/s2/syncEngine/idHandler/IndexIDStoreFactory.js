Ext.define('org.s2.syncEngine.idHandler.IndexIDStoreFactory',
{
	extend: 'Ext.Class',
	alias: 'IndexIDStoreFactory',
	
	config:
	{
		storeName: 'IndexIDStore',
		customProxy: null
	},
	
	constructor: function(conf) 
	{
		this.setCustomProxy(
		{
			type: 'sql',
			database: conf.dbName
		});
	},
	
	createIndexIDStore: function()
	{	
		var myIndexIDStore = Ext.create('IndexIDStore', 
		{
			storeId: this.getStoreName(),
			proxy: this.getCustomProxy()
		});
		return myIndexIDStore;
	}
});