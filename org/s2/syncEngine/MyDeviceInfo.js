/**
 * MyDeviceInfo rappresenta le informazione proprie del dispositivo sul quale viene eseguita
 * l'applicazione.
 */
Ext.define('org.s2.syncEngine.MyDeviceInfo',
{
	extend: 'Ext.Class',
	alias: 'MyDeviceInfo',
	
	require:
	[
		'Ext.device.Connection'
	],
	
	config:
	{
		/**
		 * @cfg
		 * Nome identificativo del dispositivo.
		 */
		deviceID: 'null'
	},
	/**
	 * Costruttore ridefinito.
	 *
	 * @param {Object} conf Parametri di configurazione.
	 * @param {String} conf.deviceID Nome identificativo del dispositivo.
	 */
	constructor: function(conf)
	{
		this.setDeviceID(conf.deviceID);
		this.callParent(arguments);
	},
	/**
	 * Metodo utilizzato per testare la connessione del dispositivo ad una rete mobile.
	 */
	isOnline: function()
	{
		return Ext.device.Connection.isOnline();
	}
});