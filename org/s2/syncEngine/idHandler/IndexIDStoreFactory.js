/**
 * IndexIDStoreFactory rappresenta la classe factory per la creazione dell'IndexIDStore.
 */
Ext.define('org.s2.syncEngine.idHandler.IndexIDStoreFactory',
{
	extend: 'Ext.Class',
	alias: 'IndexIDStoreFactory',
	
	config:
	{
		/**
		 * @cfg
		 * Nome identificativo dello store da creare.
		 */
		storeName: 'IndexIDStore',
		/**
		 * @cfg
		 * Riferimento al proxy da utilizzare.
		 */
		customProxy: null
	},
	/**
	 * Costruttore ridefinito
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {String} conf.dbName Nome del database di riferimento.
	 */
	constructor: function(conf) 
	{
		this.setCustomProxy(
		{
			type: 'sql',
			database: conf.dbName
		});
	},
	/**
	 * Metodo utilizzato per creare un'istanza di IndexIDStore con le configurazioni desiderate.
	 *
	 * @return {org.s2.syncEngine.idHandler.IndexIDStore} Riferimento allo store creato.
	 */
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