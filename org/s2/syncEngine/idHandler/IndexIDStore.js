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
		model: 'org.s2.syncEngine.idHandler.IndexIDModel',
		
		storeId: 'IndexIDStore',
		
		autoLoad: true,
		//autoSync: true,
		
		proxy:
		{
			type: 'sql'
		},
		
		listeners:
		{
			//listeners per la comunicazione del completamento del load
			load: function(scope, records, successful, operation, eOpts )
			{
				console.log('IndexIDStore caricato');
			}
		}
	},
	
	constructor: function(conf) 
	{
		this.callParent(arguments);
		this.setStoreId('IndexIDStore');
	},
	
	//metodo usato per caricare uno store toLoad nel sistema. Tale operazione comporta la creazione di un entry del modello IndexIDModel, avente come campo storeID il nome di toLoad.
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
	
	//metodo usato per incrementare il valore contenuto in indexCount
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
	
	//metodo usato da un SyncStore registrato nel sistema, per richiedere la restituzione del prossimo id valido, da usare per la registrazione del nuovo record.
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