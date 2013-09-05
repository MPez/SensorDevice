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
		dbName: 'null',
		appName: 'null',
		registry: 'null',
		deviceInfo: 'null',
		indexStore: 'null'
	},
	
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
	
	getStore: function(storeID)
	{
		return Ext.getStore(storeID);
	},
	
	getDeviceID: function()
	{
		return this.getDeviceInfo().getDeviceID();
	},
	
	createIndexStore: function(dbName)
	{
		var myFactory = Ext.create('org.s2.syncEngine.idHandler.IndexIDStoreFactory',
		{
			dbName: this.getDbName()
		});
		
		this.setIndexStore(myFactory.createIndexIDStore());
		this.getIndexStore().load();
	},
	
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
	
	//metodo che si occupa di verificare l'esistenza dello store specificato da storeID nell'applicazione Sencha. Se ne conferma l'esistenza, procede registrandone il nome nel registro del sistema
	registerStore: function(storeID)
	{
		var mioRegistro = this.getRegistry();
		if(Ext.getStore(storeID) == undefined) {
			return false;
		}
		mioRegistro.push(storeID);
		return true;
	},
	
	//metodo d'utilità per verificare la presenza di un determinato nome storeID nel registro del sistema
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
	
	//metodo che ricerca la presenza dello del nome storeID nel sistema, se lo trova, carica lo store associato
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
	//metodo che richiama l'operazione di addCommit su di uno store specificato
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
	//metodo che richiama l'operazione di updateCommit su di uno store specificato
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
	//metodo che richiama l'operazione di deleteCommit su di uno store specificato
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
	
	//metodo che percorre nell'ordine i nomi presenti nel proprio registrro, e carica gli store aventi quel nome id
	loadDatabase: function()
	{
		for(i=0; i<this.getRegistry().length; i++)
		{
			var myStore = this.getRegistry()[i];
			this.getStore(myStore).load();
		}
	},
	
	/*
	 * metodo che scarica i dati presenti nel server per ogni store presente nel registro
	 */
	downloadFromServer: function()
	{
		for (i = 0; i < this.getRegistry().length; i++)
		{
			var store = this.getRegistry()[i];
			this.getStore(store).download();
		}
	},
	
	/*
	 * metodo che carica i dati aggiornati sul server per ogni store presente nel registro
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