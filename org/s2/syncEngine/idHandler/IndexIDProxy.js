/**
 * IndexIDProxy rappresenta il proxy usato con {@link IndexIDStore}.
 */
Ext.define('org.s2.syncEngine.idHandler.IndexIDProxy',
{
	extend: 'Ext.data.proxy.Sql',
	alias: 'IndexIDProxy',
	/**
	 * Costruttore ridefinito
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {String} conf.dbName Nome del database di riferimento.
	 */
	costructor: function(conf)
	{
		this.setDatabase(conf.dbName);
		this.callParent(arguments);
	}
});