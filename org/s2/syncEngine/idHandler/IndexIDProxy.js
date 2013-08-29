Ext.define('org.s2.syncEngine.idHandler.IndexIDProxy',
{
	extend: 'Ext.data.proxy.Sql',
	alias: 'IndexIDProxy',
	
	costructor: function(conf)
	{
		this.setDatabase(conf.dbName);
		this.callParent(arguments);
	}
});