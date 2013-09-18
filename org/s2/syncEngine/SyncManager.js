/**
 * SyncManager rappresenta il gestore del SyncEngine.
 * Attraverso di esso è possibile creare gli store desiderati ed effettuare
 * tutte le operazioni CRUD necessarie.
 */
Ext.define('org.s2.syncEngine.SyncManager',
{
	extend: 'Ext.Class',
	alias: 'SyncManager',
	requires: 
	[
		'org.s2.syncEngine.MyDeviceInfo',
		'org.s2.syncEngine.idHandler.IndexIDStore',
		'org.s2.syncEngine.idHandler.IndexIDStoreFactory',
		'org.s2.syncEngine.basicSyncStore.SyncStore',
		
		'Ext.data.proxy.JsonP'
	],
	
	config:
	{
		/**
		 * @cfg
		 * Nome del database di riferimento.
		 */
		dbName: 'null',
		/**
		 * @cfg
		 * Nome dell'applicazione.
		 */
		appName: 'null',
		/**
		 * @cfg {Array}
		 * Registro presso il quale vengono registrati gli store creati.
		 */
		registry: 'null',
		/**
		 * @cfg {org.s2.syncEngine.MyDeviceInfo}
		 * Riferimento alle informazione del dispositivo in uso.
		 */
		deviceInfo: 'null',
		/**
		 * @cfg
		 * Nome identificativo dello IDstore usato per la gestione degli id.
		 */
		indexStore: 'null'
	},
	
	/**
	 * Costruttore ridefinito.
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {String} conf.appName Nome dell'applicazione.
	 * @param {String} conf.deviceID Nome identificativo del dispositivo in uso.
	 * @param {String} conf.dbName Nome del database di riferimento.
	 */
	constructor: function(conf) 
	{
		this.setDbName(conf.dbName);
		this.setAppName(conf.appName);
		this.setRegistry(new Array());
		this.setDeviceInfo(Ext.create('MyDeviceInfo',{deviceID: conf.deviceID}));
		this.callParent(arguments);
		//creo e carico l'indexIDStore
		this.createIndexStore(conf.dbName);	
	},
	
	/**
	 * Metodo che restituisce lo store richiesto.
	 *
	 * @param {String} storeID Nome dello store.
	 * @return {Ext.data.Store} Riferimento dello store.
	 */
	getStore: function(storeID)
	{
		return Ext.getStore(storeID);
	},
	
	/**
	 * Metodo che restituisce il nome identificativo del dispositivo in uso.
	 *
	 * @return {String} Nome del dispositivo in uso.
	 */
	getDeviceID: function()
	{
		return this.getDeviceInfo().getDeviceID();
	},
	
	/**
	 * Metodo che si occupa di creare un IndexIDStore che verrà usato per la gestione degli id.
	 *
	 * @param {String} dbName Nome del database di riferimento.
	 */
	createIndexStore: function(dbName)
	{
		var myFactory = Ext.create('org.s2.syncEngine.idHandler.IndexIDStoreFactory',
		{
			dbName: this.getDbName()
		});
		
		this.setIndexStore(myFactory.createIndexIDStore());
		this.getIndexStore().load();
	},
	
	/**
	 * Metodo usato per creare un nuovo store da utilizzare nell'applicazione.
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {Ext.data.Model} conf.model Modello dei dati di riferimento.
	 * @param {String} conf.tableID Nome Identificativo della tabella.
	 * @param {String} conf.remoteURL Indirizzo del server.
	 * @param {String} conf.storeId Nome identificativo dello store.
	 *
	 * @return {org.s2.syncEngine.basicSyncStore.SyncStore} Riferimento allo store creato.
	 */
	createSyncStore: function(conf)
	{
		var myStore = Ext.create('SyncStore',
		{
			costructorRid: true,
			model: conf.model,
			modelName: conf.model.substring(conf.model.lastIndexOf('.')+1),
			tableID: conf.tableID,
			remoteURL: conf.remoteURL,
			storeId: conf.storeId,
			deviceId: this.getDeviceID(),
			appName: this.getAppName(),							//prima 'NotesApp' hard-coded
			myDbName: this.getDbName()
		});
		this.registerStore(conf.storeId);
		return myStore;
	},
	
	/**
	 * Metodo che si occupa di verificare l'esistenza dello store specificato da storeID nell'applicazione Sencha.
	 * Se viene confermata l'esistenza, procede registrandone il nome nel registro del sistema.
	 *
	 * @param {String} storeID Nome dello store da registrare.
	 *
	 * @return {Boolean} Esito registrazione.
	 */
	registerStore: function(storeID)
	{
		var mioRegistro = this.getRegistry();
		if(Ext.getStore(storeID) == undefined) {
			return false;
		}
		mioRegistro.push(storeID);
		return true;
	},
	
	/**
	 * Metodo d'utilità per verificare la presenza di un determinato nome storeID nel registro del sistema.
	 *
	 * @param {String} storeID Nome dello store da cercare.
	 *
	 * @return {Number} Se esiste, indice dello store nel registro; altrimenti -1.
	 */
	find: function(storeID)
	{
		for(i=0; i<this.getRegistry().length; i++)
		{
			if(this.getRegistry()[i] == storeID)
			{
				return i;
			}
		}
		return -1;
	},
	
	/**
	 * Metodo che ricerca la presenza dello del nome storeID nel sistema, se lo trova, carica lo store associato.
	 *
	 * @param {String} storeID Nome dello store da caricare.
	 *
	 * @return {Boolean} Esito registrazione.
	 */
	loadSyncStore: function(storeID)
	{
		//controllo se lo storeID è registrato nel sistema. Nel caso lo carico e restituisco true
		index = this.find(storeID);
		if(index >= 0)
		{
			this.getStore(storeID).load();
			return true;
		}
		//false altrimenti
		return false;
	},
	
	/**
	 * Metodo che richiama l'operazione di addCommit su di uno store specificato.
	 *
	 * @param {String} storeID Nome dello store sul quale effettuare l'inserimento.
	 * @param {Ext.data.Model} toAdd Record da inserire nello store.
	 */
	addToStore: function(storeID, toAdd)
	{
		index = this.find(storeID);
		if(index >= 0)
		{
			this.getStore(storeID).addCommit(toAdd);
			return true;
		}
		return false;
	},
	
	/**
	 * Metodo che richiama l'operazione di updateCommit su di uno store specificato.
	 *
	 * @param {String} storeID Nome dello store sul quale effettuare l'aggiornamento.
	 * @param {Ext.data.Model} toUpdate Record da aggiornare nello store.
	 */
	updateInStore: function(storeID, toUpdate)
	{
		index = this.find(storeID);
		if(index >= 0)
		{
			this.getStore(storeID).updateCommit(toUpdate);
			return true;
		}
		return false;
	},
	
	/**
	 * Metodo che richiama l'operazione di deleteCommit su di uno store specificato.
	 *
	 * @param {String} storeID Nome dello store sul quale effettuare la cancellazione.
	 * @param {Ext.data.Model} toDelete Record da cancellare dallo store.
	 */
	deleteFromStore: function(storeID, toDelete)
	{
		index = this.find(storeID);
		if(index >= 0)
		{
			this.getStore(storeID).deleteCommit(toDelete);
			return true;
		}
		return false;
	},
	
	/**
	 * Metodo che percorre nell'ordine i nomi presenti nel registro e carica gli store aventi quel nome.
	 */
	loadDatabase: function()
	{
		for(i=0; i<this.getRegistry().length; i++)
		{
			var myStore = this.getRegistry()[i];
			this.getStore(myStore).load();
		}
	},
	
	/**
	 * Metodo che scarica i dati presenti nel server per ogni store presente nel registro.
	 */
	downloadFromServer: function()
	{
		for (i = 0; i < this.getRegistry().length; i++)
		{
			var store = this.getRegistry()[i];
			this.getStore(store).download();
		}
	},
	
	/**
	 * Metodo che carica i dati aggiornati sul server per ogni store presente nel registro.
	 */
	uploadToServer: function()
	{
		for (i = 0; i < this.getRegistry().length; i++)
		{
			var store = this.getRegistry()[i];
			this.getStore(store).upload();
		}
	}
});