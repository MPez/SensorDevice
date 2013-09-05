Ext.define('org.s2.syncEngine.basicSyncStore.SyncStore',
{
	extend: 'Ext.data.Store',
	alias: 'SyncStore',
	
	requires: 
	[
		'Ext.device.Connection',
		'org.s2.syncEngine.basicSyncStore.upload.CommitStoreFactory',
		'org.s2.syncEngine.basicSyncStore.download.DownloadStoreFactory',
		'org.s2.syncEngine.basicSyncStore.storeCommand.DeleteCommit',
		'org.s2.syncEngine.basicSyncStore.storeCommand.UpdateCommit',
		'org.s2.syncEngine.basicSyncStore.storeCommand.AddCommit'
	],
	
	config:
	{
		//ATTENZIONE: i seguenti dati vanno inseriti dall'utente con la logica qui specificata:
		//Si osservi anche il costruttore nel ramo conf.costructorRid
		model: 'null', //model di riferimento
		modelName: 'null', //inserire il nome del model
		tableID : 'null', //id della tabella rappresentata dal model. usato per le PK
		remoteURL: 'null', //URL per la connessione remota al database
		storeId: 'null', //ID dello store, idealmente uguale al nome dato alla classe
		deviceId: 'null', //identificativo del device in cui è creato lo store. Usato per la generazione delle PK
		appName: 'null', //nome dell'applicazione
		myDbName: 'null', //nome del database in cui viene inserito lo store
		
		//Proxy di un generico store SyncStore: di default è uno store di tipo WebSQL... parto dal presupposto che all'avvio non ho connettività, e se ho già dei dati, essi sono salvati sul device in locale
		/*
		proxy:
		{
			type: 'sql',
			database: 'MyNotesDb'				//prima 'NotesDB' hard-coded
		},
		*/
		
		//Store di tipo WebSQL usato per salvare le ''bozze'' dei dati non ancora sincronizzati. commitStore viene svuotato dal suo contenuto al termine di ogni operazione RIUSCITA di invio dei dati. Vedere upload() per ulteriori informazioni in merito
		commitStore: 'null', //contiene il nome dello store di commit
		commitModel: 'null',
		downloadStore: 'null', //contiene il nome dello store di download
		autoLoad: false,
		disableDownload: false,
		
		//per via dell'assincronia presente nelle operazioni di load degli store, si usa un listeners la cui struttura rappresenta anche gli step che intercorrono durante un operazione di download.
		listeners:
		{	
			//listener che resta in ascolto di un operazione di load. Richiamato solo al termine del load dello store
			load: function(scope, records, successful, operation, eOpts )
			{
				//console.log("...... onLoad listener ......");
				
				this.download();
			},
			
			//listener che resta in ascolto di un operazione di download. Richiamato solo al termine del download dei record
			downloadComplete: function(scope, records, successful, operation, eOpts )
			{
				//console.log("...... onDownloadComplete listener ......");
				
				//caso base: nessun dato scaricato
				if(Ext.getStore(this.getDownloadStore()).getCount() == 0)
				{
					//nota: se sono qui disableDownload == true... devo riabilitarlo
					this.setDisableDownload(false);
					return false;
				}
				//secondo step: elimino i dati locali
				this.clearTable();
				
				Ext.Msg.alert("Success", "The download has been completed.");
				
				return true;
			},	

			//listener che resta in ascolto di un operazione di clear. Richiamato solo al termine dell'eliminazione dei dati presenti in SyncStore
			clearComplete: function(scope, records, successful, operation, eOpts )
			{
				//console.log("...... on clearComplete listener ......");
				
				this.downloadTemplate();
			},
			
			/*
			 * listner per controllare l'avvenuta cancellazione delle tabelle
			 */
			clear: function(scope, eOpts)
			{
				//console.log("...... onClear listener ......");
			}
		}
	},
	
	constructor: function(conf)
	{
		if(conf.costructorRid)
		{
			this.setModel(conf.model);
			this.setModelName(conf.modelName);
			this.setTableID(conf.tableID);
			this.setRemoteURL(conf.remoteURL);
			this.setStoreId(conf.storeId);
			this.setDeviceId(conf.deviceId);
			this.setAppName(conf.appName);
			this.setMyDbName(conf.myDbName);
		}
		
		this.callParent(arguments);
		
		this.setProxy({
			type: 'sql',
			database: this.getMyDbName()
		});
		
		//creo il commit store
		this.initCommitStore();
		this.initDownloadStore();	
	},
	
	getParent: function()
	{
		//metodo usato nei test. Un istanza di un oggetto che eredita da SyncStore, sarà in grado tramite questo metodo, di provare di essere un SyncStore
		return 'org.s2.syncEngine.basicSyncStore.SyncStore';
	},
	
	//metodo usato per la creazione dello store di commit
	initCommitStore: function()
	{
		//console.log("------ onInitCommitStore ------");
		
		//variabili utili per la memorizzazione dei nomi
		var pathModel = this.getAppName() + '.model.' + this.getModelName();
		var nameCommitStore = this.getModelName() + 'sCommitStore';
		//imposto le variabili di config con i nuovi nomi del modello e dello store di commit
		this.setCommitModel(pathModel + 'CommitModel');
		this.setCommitStore(nameCommitStore);
		//creo un istanza della classe factory di CommitStore
		var myFactory = Ext.create('CommitStoreFactory',
		{
			pathModel: pathModel,
			nameCommitStore: nameCommitStore,
			myDbName: this.getMyDbName()
		});
		//eseguo la creazione e il caricamento del CommitStore. Al termine distruggo la factory
		myFactory.createCommitStore().load();
		myFactory.destroy();
	},
	
	initDownloadStore: function()
	{
		//console.log("------ onInitDownloadStore ------");
		
		//variabili utili per la memorizzazione dei nomi
		var pathModel = this.getAppName() + '.model.' + this.getModelName();
		var nameDownloadStore = this.getModelName() + 'sDownloadStore';
		//imposto le variabili di config con i nuovi nomi del modello e dello store di download
		this.setDownloadStore(nameDownloadStore);
		//creo un istanza della classe factory di DownloadStore
		var myFactory = Ext.create('DownloadStoreFactory',
		{
			url: this.getRemoteURL(),
			appName: this.getAppName(),
			modelName: this.getModelName(),
			pathModel: pathModel,
			nameDownloadStore: nameDownloadStore
		});
		//eseguo la creazione e il caricamento del DownloadStore. Al termine distruggo la factory
		myFactory.createDownloadStore(this.getStoreId());
		myFactory.destroy();
	},
	
	//metodo usato per rimuovere ogni elemento dal SyncStore (inteso come store locale)
	clearTable: function()
	{
		//console.log("------ onClearTable ------");
		
		this.getProxy().dropTable();

		this.removeAll();
		this.sync();
		//segnalo il termine della procedura di clear dello store
		this.fireEvent('clearComplete', this);
	},
	
	download: function()
	{
		//console.log("------ Download avviato ------");
		
		//il download è abilitato? c'è connettività?
		if(this.getDisableDownload() || !Ext.device.Connection.isOnline())
		{
			return false;
		}
		//ho connettività
		this.setDisableDownload(true);
		Ext.getStore(this.getDownloadStore()).load();
		return true;
	},
	
	downloadTemplate: function()
	{
		//console.log("------ onDownloadTemplate ------");
		
		//avverto che i dati che sto per inserire nello store non sono nuovi, ma sono quelli scaricati dal db
		var myName = this.getStoreId();
		var modelLongName = this.getAppName() + '.model.' + this.getModelName();
		
		//Per ogni record scaricato, procedo aggiungendo quel record allo store locale (SyncStore)
		Ext.getStore(this.getDownloadStore()).each(function(record) 
		{	
			var currentRecord = Ext.create(modelLongName,record.data);
			Ext.getStore(myName).add(currentRecord);
		});
		
		this.applyLocalChange(myName, this.getTableID(), this.getCommitStore());
		
		//termino la procedura di download e update dello store locale
		Ext.getStore(this.getStoreId()).sync();
		this.setDisableDownload(false);
	},
	
	//metodo usato per applicare le modifiche avvenute localmente, ai dati scaricaricati in seguito all'esecuzione di this.download()
	applyLocalChange: function(storeName, idName, commitName)
	{
		//console.log("------ onApplyLocalChange ------");
		
		Ext.getStore(commitName).each(function(record) 
		{
			if(record.get('typeCommit') == 'a')
			{
				Ext.getStore(storeName).add(record.copy());
			}
			if(record.get('typeCommit') == 'u')
			{
				Ext.getStore(storeName).removeAt(Ext.getStore(storeName).find(idName,record.get(idName)));
				Ext.getStore(storeName).add(record.copy());
			}
			if(record.get('typeCommit') == 'd')
			{
				Ext.getStore(storeName).removeAt(Ext.getStore(storeName).find(idName,record.get(idName)));
			}
		});
	},
	
	//metodo usato per inviare i dati al server.
	upload: function()
	{
		//console.log("------ Upload avviato ------");
		
		var commitName = this.getCommitStore();
		var toCommit = '[';
		var remote = this.getRemoteURL();
			
		//non ci sono record nel CommitStore. Il metodo termina restituendo 0 --> fallimento
		if(Ext.getStore(this.getCommitStore()).getCount() == 0)
		{
			return 0;
		}
		
		//assenza di connettività. Il metodo termina restituendo 0 --> fallimento
		if(!Ext.device.Connection.isOnline())
		{
			return 0;
		}
		
		//variabile usata per conteggiare il numero di record inseriti nella stringa JSON. Utile in fase di testing o per restituire un feed all'utente
		var numElem = 0;
		
		Ext.getStore(this.getCommitStore()).each(function(record) 
		{
			toCommit += Ext.encode(record.data) + ',';
			numElem++;
		});
		
		toCommit = toCommit.substring(0,toCommit.length - 1);
		toCommit += ']';
		
		this.setDisableDownload(true);
		
		var myId = this.getStoreId();
		var downloadName = this.getDownloadStore();
		
		//creazione della richiesta JsonP per l'invio dei dati al server.
		//la richiesta genera in automatico una funzione di callback, iniettatà nel codice, avente il compito di valutare la risposta del server. In caso di successo viene richiamata la funzione success, failure altrimenti.
		var requestUpload = Ext.data.JsonP.request({
			url: remote,
			params:
			{ 
				data: toCommit,
				operation: 'post'
			},
			success: function(response)
			{
				//se sono qui, ho inviato tutti i dati al server.
				//procedo eliminando il contenutp del CommitSTore
				Ext.getStore(commitName).removeAll();
				Ext.getStore(commitName).sync();
				//riabilito il download.
				Ext.getStore(myId).setDisableDownload(false);
				
				Ext.Msg.alert("Success", "The upload has been completed.");
				
				return true;//successo
			},
			failure: function(response)
			{
				//riabilito il download
				Ext.getStore(myId).setDisableDownload(false);
				return false;//fallimento
			}
			//che l'invio abbia successo o meno, il download viene sempre riabilitato, ma solo in risposta alla risposta del server, o inseguito allo scadere del timeout (condizione che provoca l'esecuzione di failure)
		});
		
		return numElem;
	},

	addCommit: function(toAdd)
	{
		var myOperation = Ext.create('AddCommit',
		{
			recordToUse: toAdd,
			tableID: this.getTableID(),
			deviceId: this.getDeviceId(),
			commitModel: this.getCommitModel(),
			commitStore: this.getCommitStore(),
			scope: this
		});
		this.executeOperation(myOperation);
	},
	
	updateCommit: function(toUpdate)
	{
		var myOperation = Ext.create('UpdateCommit',
		{
			autoDownload: this.autoDownload,
			recordToUse: toAdd,
			tableID: this.getTableID(),
			deviceId: this.getDeviceId(),
			commitModel: this.getCommitModel(),
			commitStore: this.getCommitStore(),
			scope: this
		});
		this.executeOperation(myOperation);
	},	
	
	deleteCommit: function(toDelete)
	{
		var myOperation = Ext.create('DeleteCommit',
		{
			recordToUse: toDelete,
			tableID: this.getTableID(),
			commitModel: this.getCommitModel(),
			commitStore: this.getCommitStore(),
			scope: this
		});	
		this.executeOperation(myOperation);
	},
	
	//comando generale per l'esecuzione di una classe derivata da StoreOperation
	executeOperation: function(myOperation)
	{
		myOperation.execute();
		myOperation.destroy();
	}
});