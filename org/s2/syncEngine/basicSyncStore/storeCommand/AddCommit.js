Ext.define('org.s2.syncEngine.basicSyncStore.storeCommand.AddCommit',
{
	extend: 'org.s2.syncEngine.basicSyncStore.storeCommand.StoreOperation',
	requires: 'org.s2.syncEngine.basicSyncStore.storeCommand.UpdateCommit',
	alias: 'AddCommit',
	
	execute: function()
	{
		console.log('------------------------------addCommit()------------------------------------');
		console.log('record da aggiungere:');
		console.log(this.getRecordToUse().getData());
		//creo una copia del record da usare
		toAdd = this.getRecordToUse();
		//memorizzo l'id della chiave primaria del record da aggiungere
		//se il record è appena stato creato, tecnicamente non ha un id o comunque l'id assegnatoli dall'utente, non è presente in nessun record del SyncStore
		var myId = toAdd.get(this.getTableID());
			
		//CASO UPDATE: se verifico che il record da aggiungere, in realtà, è già presente nel SyncStore, allora opero un update
		if(Ext.getStore(this.getSyncStore().find(this.getTableID(), myId ) != -1))
		{
			console.log('record presente in SyncStore. Deleco l\'operazione a UpdateCommit');
			//creo un comando di update
			var myOperation = Ext.create('UpdateCommit',
			{
				recordToUse: toAdd,
				tableID: this.getTableID(),
				deviceId: this.getDeviceId(),
				commitModel: this.getCommitModel(),
				commitStore: this.getCommitStore(),
				scope: this.getSyncStore()
			});
			//eseguo e al termine distruggo il comando di update
			myOperation.execute();
			myOperation.destroy();
			console.log('-----------------------------------------------------------------------------');
			return;
		}
		//se sono qui, il record da inserire è sprovvisto di id. Devo assegnargliene uno.
		var idToUse = this.getDeviceId() + Ext.getStore('IndexIDStore').getNewID(this.getSyncStore().getStoreId());
		//impostare l'id da usare come id dell'elemento che sto andando a salvare.
		toAdd.set(this.getTableID(), idToUse);
		
		//creo un record avente per modello quello adatto al CommitStore.
		var tmpToAdd = toAdd;
		tmpToAdd.setId(null);
		var newRecord=Ext.create(Ext.getStore(this.getCommitStore()).getModel(),tmpToAdd.data);
		//inserisco l'elemento nel CommitStore
		Ext.getStore(this.getCommitStore()).add(newRecord);
		Ext.getStore(this.getCommitStore()).sync();

		//inserisco l'elemento nel SyncStore (store locale) richiamando l'add di super
		this.getSyncStore().add(toAdd.copy());
		console.log('Record aggiunto con successo, con id = ' + idToUse);
		console.log('-----------------------------------------------------------------------------');
	}
});