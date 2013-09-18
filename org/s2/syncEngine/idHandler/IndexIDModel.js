/**
 * IndexIDModel rappresenta il modello dei dati per la gestione degli id degli store.
 */
Ext.define('org.s2.syncEngine.idHandler.IndexIDModel',
{
	extend: 'Ext.data.Model',
	alias: 'IndexIDModel',
	
	config:
	{
		/**
		 * @cfg
		 * Campi dati.
		 */
		fields:
		[
			{ name: 'storeID', type: 'string' },
			{ name: 'indexCount', type: 'int', defaultValue: 0 }
		]
	}
});