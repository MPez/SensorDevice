/**
 * StoreOperation rappresenta la classe base per le operazioni di add, update e commit.
 */
Ext.define('org.s2.syncEngine.basicSyncStore.storeCommand.StoreOperation',
{
	extend: 'Ext.Class',
	alias: 'StoreOperation',
	
	config:
	{
		/**
		 * @cfg {Ext.data.Model}
		 * Record sul quale effettuare l'operazione.
		 */
		recordToUse: 'null',
		/**
		 * @cfg
		 * Nome identificativo della tabella del database.
		 */
		tableID: 'null',
		/**
		 * @cfg
		 * Nome identificativo del dispositivo.
		 */
		deviceId: 'null',
		/**
		 * @cfg {Ext.data.Model}
		 * Modello dei dati di riferimento dello store di commit.
		 */
		commitModel: 'null',
		/**
		 * @cfg
		 * Nome identificativo dello store di commit.
		 */
		commitStore: 'null',
		/**
		 * @cfg {Object}
		 * Riferimento allo store sul quale viene eseguita l'operazione.
		 */
		syncStore: 'null'
	},
	/**
	 * COstruttore ridefinito.
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {Ext.data.Model} conf.recordToUse Record sul quale effettuare l'operazione.
	 * @param {String} conf.tableID Nome identificativo della tabella del database.
	 * @param {String} conf.deviceId Nome identificativo del dispositivo.
	 * @param {String} conf.commitModel Modello dei dati di riferimento dello store di commit.
	 * @param {String} conf.commitStore Nome identificativo dello store di commit.
	 * @param {String} conf.scope Riferimento allo store sul quale viene eseguita l'operazione.
	 */
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