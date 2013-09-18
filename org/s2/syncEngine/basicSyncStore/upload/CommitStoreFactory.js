/**
 * CommitStoreFactory rappresenta la classe factory usata per definire e creare
 * lo store {@link CommitStore}.
 */
Ext.define('org.s2.syncEngine.basicSyncStore.upload.CommitStoreFactory',
{
	extend: 'Ext.Class',
	alias: 'CommitStoreFactory',
	
	config:
	{
		/**
		 * @cfg
		 * Nome completo del modello.
		 */
		pathModel: 'null',
		/**
		 * @cfg
		 * Nome da usare per la creazione dello store.
		 */
		nameCommitStore: 'null',
		/**
		 * @cfg
		 * Nome del database di riferimento.
		 */
		dbName: 'null'
	},
	/**
	 * Costruttore ridefinito.
	 *
	 * @param {String} conf.pathModel Nome completo del modello.
	 * @param {String} conf.nameCommitStore Nome da usare per la creazione dello store.
	 * @param {String} conf.dbName Nome del database di riferimento.
	 */
	constructor: function(conf)
	{
		this.setPathModel(conf.pathModel);
		this.setNameCommitStore(conf.nameCommitStore);
		this.setDbName(conf.myDbName);
	},
	/**
	 * Metodo usato per creare un'istanza di CommitStore con le configurazioni desiderate.
	 */
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