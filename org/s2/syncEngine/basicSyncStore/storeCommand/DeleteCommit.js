/**
 * DeleteCommit rappresenta un'operazione di cancellazione di un record in uno store.
 */
Ext.define('org.s2.syncEngine.basicSyncStore.storeCommand.DeleteCommit',
{
	extend: 'org.s2.syncEngine.basicSyncStore.storeCommand.StoreOperation',
	alias: 'DeleteCommit',
	
	/**
	 * Metodo che esegue l'operazione di cancellazione del record dallo store.
	 */
	execute: function()
	{
		console.log('-----------------------------deleteCommit()----------------------------------');
		toDelete = this.getRecordToUse();
		toRemove = toDelete;
		toDelete = toDelete.copy();
		
		var deleteCommitIndex = Ext.getStore(this.getCommitStore()).find(this.getTableID(), toDelete.get(this.getTableID()));
		var deleteCommitRecord = Ext.getStore(this.getCommitStore()).getAt(deleteCommitIndex);
		
		var newRecord = Ext.create(this.getCommitModel(),toDelete.data);
		//controllo se il dato da eliminare (identificato dall'id) è presente nel commit store, e nel caso se il suo typeCommit è 'a' --> record aggiunto in locale ma mai inviato al server. La sua eliminazione comporta l'eliminazione del recorda dal SyncStore e dal CommitStore. Non va aggiunto nessun record con TypeCommit 'd'
		if(deleteCommitIndex != -1 && deleteCommitRecord.get('typeCommit') == 'a')
		{
			console.log('il record da eliminare è di tipo TypeCommit = a');
			//devo eliminare il record corelato nel commitStore
			Ext.getStore(this.getCommitStore()).removeAt(deleteCommitIndex);
			Ext.getStore(this.getCommitStore()).sync();
			//quindi elimino il record dal syncStore
			var removeIndex = this.getSyncStore().find(this.getTableID(), toDelete.get(this.getTableID()));
			this.getSyncStore().removeAt(removeIndex);
			this.getSyncStore().sync();
			//termino
			console.log('record obsoleto eliminato con successo da CommitStore e da SyncStore');
			console.log('-----------------------------------------------------------------------------');
			return;
		}
		//controllo se il dato da eliminare (identificato dall'id) è presente nel commit store, e nel caso se il suo typeCommit è 'u' --> record aggiunto in locale ma mai inviato al server. La sua eliminazione comporta l'eliminazione del recorda dal Sesistente anche sul server e modificato in locale. La sua rimozione comporta un eliminazione del record dal SyncStore, e la modifica del typeCommit da 'u' a 'd', nel CommitStore
		if(deleteCommitIndex != -1 && deleteCommitRecord.get('typeCommit') == 'u')
		{
			console.log('il record da eliminare è di tipo TypeCommit = u');
			Ext.getStore(this.getCommitStore()).removeAt(deleteCommitIndex);
			Ext.getStore(this.getCommitStore()).sync();
			console.log('record obsoleto eliminato con successo dal CommitStore');
		}
		//setto il record come 'eliminato', o meglio, 'da eliminare nel server'
		newRecord.set('typeCommit','d');
		Ext.getStore(this.getCommitStore()).add(newRecord.copy());
		console.log('nuova \'bozza\' aggiunta in CommitStore, con typeCommit = d');
		Ext.getStore(this.getCommitStore()).sync();
		this.getSyncStore().remove(toRemove);
		this.getSyncStore().sync();
		console.log('record obsoleto eliminato con successo dal SyncStore');
		console.log('-----------------------------------------------------------------------------');
	}
});