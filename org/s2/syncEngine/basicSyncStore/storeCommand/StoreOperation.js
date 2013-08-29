Ext.define('org.s2.syncEngine.basicSyncStore.storeCommand.StoreOperation',
{
	extend: 'Ext.Class',
	alias: 'StoreOperation',
	
	config:
	{
		recordToUse: 'null',
		tableID: 'null',
		deviceId: 'null',
		commitModel: 'null',
		commitStore: 'null',
		syncStore: 'null'
	},
	
	constructor: function(conf)
	{
		this.setRecordToUse(conf.recordToUse);
		this.setTableID(conf.tableID);
		this.setDeviceId(conf.deviceId);
		this.setCommitModel(conf.commitModel);
		this.setCommitStore(conf.commitStore);
		this.setSyncStore(conf.scope);
	}
});