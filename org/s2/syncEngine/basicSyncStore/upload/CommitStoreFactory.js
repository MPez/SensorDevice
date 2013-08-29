Ext.define('org.s2.syncEngine.basicSyncStore.upload.CommitStoreFactory',
{
	extend: 'Ext.Class',
	alias: 'CommitStoreFactory',
	
	config:
	{
		pathModel: 'null',
		nameCommitStore: 'null',
		dbName: 'null'
	},
	
	constructor: function(conf)
	{
		this.setPathModel(conf.pathModel);
		this.setNameCommitStore(conf.nameCommitStore);
		this.setDbName(conf.myDbName);
	},
	
	createCommitStore: function()
	{	
		return Ext.create('Ext.data.Store', 
		{
			model: Ext.define(this.getPathModel() + 'CommitModel', 
			{
				extend: this.getPathModel(),
				config: 
				{
					fields: [{ name: 'typeCommit', type: 'string', defaultValue: 'a'}]
				}
			}),
			
			storeId: this.getNameCommitStore(),
			autoLoad: false,

			proxy:
			{
				type: 'sql',
				table: this.getNameCommitStore(),
				database: this.getDbName()
			}
		});
	}
});