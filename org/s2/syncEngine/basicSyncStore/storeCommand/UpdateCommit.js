/**
 * UpdateCommit rappresenta un'operazione di aggiornamento di un record in uno store.
 */
Ext.define('org.s2.syncEngine.basicSyncStore.storeCommand.UpdateCommit',
{
	extend: 'org.s2.syncEngine.basicSyncStore.storeCommand.StoreOperation',
	alias: 'UpdateCommit',
	
	/**
	 * Metodo che esegue l'operazione di aggiornamento del record nello store.
	 */
	execute: function()
	{
		console.log('-----------------------------updateCommit()----------------------------------');
		toUpdate = this.getRecordToUse();
		//prendo l'elemento da aggiornare. se è da aggiornare di sicuro essite già nel sync store
		oldIndex = this.getSyncStore().find(this.getTableID(), toUpdate.get(this.getTableID()));
		oldRecord = this.getSyncStore().getAt(oldIndex);
		oldCommitIndex = Ext.getStore(this.getCommitStore()).find(this.getTableID(), toUpdate.get(this.getTableID()));
		
		//creo il record da inserire come aggiornamento della vecchia versione del record
		var tmpUpdate = toUpdate.copy();
		tmpUpdate.setId(null);
		var newRecord = Ext.create(this.getCommitModel(),tmpUpdate.data);
		//imposto il tipe commit del record come u = update
		newRecord.set('typeCommit','u');
		
		//controllo se l'elemento che vado a modificare esiste già nel commitStore.
		if(oldCommitIndex != -1)
		{
			console.log('il record modificato è un record aggiunto in questa sessione e non committato');
			oldCommitRecord = Ext.getStore(this.getCommitStore()).getAt(oldCommitIndex);
			
			//se esiste perchè aggiunto in questa sessione, il typeCommit deve restare 'a'
			if(oldCommitRecord.get('typeCommit') == 'a')
			{
				newRecord.set('typeCommit','a');
			}
			
			Ext.getStore(this.getCommitStore()).removeAt(oldCommitIndex);
			Ext.getStore(this.getCommitStore()).sync();
			//rimuovo il vecchio record obsoleto dal CommitStore
		}

		//aggiungo la modifica al commit store
		Ext.getStore(this.getCommitStore()).add(newRecord);
		Ext.getStore(this.getCommitStore()).sync();	
		console.log('nuova modifica aggiunta nelle \'bozze\' (aggiunta in CommitStore)');
		
		//aggiorno l'elemento nel SyncStore
		this.getSyncStore().removeAt(oldIndex);
		this.getSyncStore().add(toUpdate);
		console.log('record aggiornato in SyncStore');
		console.log('-----------------------------------------------------------------------------');
	}
});