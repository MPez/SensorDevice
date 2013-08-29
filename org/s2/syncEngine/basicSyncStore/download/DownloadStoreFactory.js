Ext.define('org.s2.syncEngine.basicSyncStore.download.DownloadStoreFactory',
{
	extend: 'Ext.Class',
	alias: 'DownloadStoreFactory',
	
	config:
	{
		url: 'null',
		appName: 'null',
		modelName: 'null',
		pathModel: 'null',
		nameDownloadStore: 'null'
	},
	
	constructor: function(conf)
	{
		this.setUrl(conf.url);
		this.setAppName(conf.appName);
		this.setModelName(conf.modelName);
		this.setPathModel(conf.pathModel);
		this.setNameDownloadStore(conf.nameDownloadStore);
	},
	
	createDownloadStore: function(patherID)
	{	
		var myDownloadStore = Ext.create('Ext.data.Store', 
		{
			model: this.getPathModel(),
			storeId: this.getNameDownloadStore(),
			autoLoad: false,
			proxy:
			{
				type: 'jsonp',
				
				url: this.getUrl(),
				model: this.getAppName() + '.model.' + this.getModelName(),
				
				reader: 
				{
					type: 'json'
				}
			},
			listeners:
			{
				load: function(scope, records, successful, operation, eOpts )
				{
					Ext.getStore(patherID).fireEvent('downloadComplete', this);
				}
			}
		});
		
		return myDownloadStore;
	}
});