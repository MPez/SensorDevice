/**
 * IndexIDStore rappresenta lo store per la gestione degli id.
 */
Ext.define('org.s2.syncEngine.idHandler.IndexIDStore',
{
	extend: 'Ext.data.Store',
	alias: 'IndexIDStore',
	requires: 
	[
		'org.s2.syncEngine.idHandler.IndexIDModel',
		'org.s2.syncEngine.idHandler.IndexIDProxy'
	],
	
	config:
	{
		/**
		 * @cfg
		 * Modello dei dati di riferimento.
		 */
		model: 'org.s2.syncEngine.idHandler.IndexIDModel',
		/**
		 * @cfg
		 * Nome identificativo dello store.
		 */
		storeId: 'IndexIDStore',
		/**
		 * @cfg
		 * Impostazione di autocaricamento dello store.
		 */
		autoLoad: true,
		//autoSync: true,
		/**
		 * @cfg
		 * Tipologia di proxy utilizzato.
		 */
		proxy:
		{
			type: 'sql'
		},
		/**
		 * @cfg
		 * Metodi per la gestione degli eventi dello store.
		 */
		listeners:
		{
			/**
			 * Listener per la comunicazione del completamento del load.
			 */
			load: function(scope, records, successful, operation, eOpts )
			{
				console.log('IndexIDStore caricato');
			}
		}
	},
	
	/**
	 * Costruttore ridefinito
	 *
	 * @param {Object} conf Parametri di configurazione.
	 */
	constructor: function(conf) 
	{
		this.callParent(arguments);
		this.setStoreId('IndexIDStore');
	},
	
	/*
	 * Metodo usato per caricare uno store toLoad nel sistema.
	 * Tale operazione comporta la creazione di una entry del modello IndexIDModel,
	 * avente come campo storeID il nome di toLoad.
	 *
	 * @param {String} toLoad Nome dello store da caricare.
	 */
	loadStoreIndex: function(toLoad)
	{
		if(this.find('storeID', toLoad) == -1)
		{
			var newRecord = Ext.create('org.s2.syncEngine.idHandler.IndexIDModel',{ storeID: toLoad });
			this.add(newRecord);
			this.sync();
			return true;
		}
		return false;
	},
	
	/*
	 * Metodo usato per incrementare il valore contenuto in indexCount.
	 *
	 * @param {String} toIncrement Nome identificativo dello store il cui indice deve essere incrementato.
	 * @return {Number} Valore incrementato dell'indice dello store.
	 */
	increment: function(toIncrement)
	{
		try
		{
			var newID = this.getAt(this.find('storeID', toIncrement)).get('indexCount');
			newID += 1;
			return newID;
		}
		catch(err)
		{
			return 1;
		}
	},
	
	/*
	 * Metodo usato da un SyncStore registrato nel sistema per richiedere la restituzione del prossimo id valido
	 * da usare per la registrazione del nuovo record.
	 *
	 * @param {String} toReturn Nome identificativo dello store per il quale si richiede un nuovo id.
	 * @return {Number} Valore del nuovo id utilizzabile dallo store.
	 */
	getNewID: function(toReturn)
	{
		var toDelete = toReturn;
		newID = this.increment(toReturn);
		this.removeAt(this.find('storeID', toDelete));
		this.sync();
		
		newRecord = Ext.create('org.s2.syncEngine.idHandler.IndexIDModel',{ storeID: toReturn, indexCount: newID});
		this.add(newRecord);
		this.sync();
		
		return newID;
	}
});