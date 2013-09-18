/**
 * DownloadStoreFactory rappresenta la classe factory usata per definire e creare
 * lo store {@link DownloadStore}.
 */
Ext.define('org.s2.syncEngine.basicSyncStore.download.DownloadStoreFactory',
{
	extend: 'Ext.Class',
	alias: 'DownloadStoreFactory',
	
	config:
	{
		/**
		 * @cfg
		 * Indirizzo del server.
		 */
		url: 'null',
		/**
		 * @cfg
		 * Nome dell'applicazione.
		 */
		appName: 'null',
		/**
		 * @cfg
		 * Nome del modello.
		 */
		modelName: 'null',
		/**
		 * @cfg
		 * Nome completo del modello.
		 */
		pathModel: 'null',
		/**
		 * @cfg
		 * Nome da usare per la creazione dello store.
		 */
		nameDownloadStore: 'null'
	},
	/**
	 * Costruttore ridefinito.
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {String} conf.url Indirizzo del server.
	 * @param {String} conf.appName Nome dell'applicazione.
	 * @param {String} conf.modelName Nome del modello.
	 * @param {String} conf.pathModel Nome completo del modello.
	 * @param {String} conf.nameDownloadStore Nome da usare per la creazione dello store.
	 */
	constructor: function(conf)
	{
		this.setUrl(conf.url);
		this.setAppName(conf.appName);
		this.setModelName(conf.modelName);
		this.setPathModel(conf.pathModel);
		this.setNameDownloadStore(conf.nameDownloadStore);
	},
	/**
	 * Metodo usato per creare un'istanza di DownloadStore con le configurazioni desiderate.
	 *
	 * @param {String} patherID 
	 * @return {Ext.data.Store} Riferimento allo store creato.
	 */
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