import ClientEvent from "@util/ClientEvent";

export default new ClientEvent('ready', async function() {
  console.log(`[LOGIN]: Ready as ${this.user.username}#${this.user.discriminator}`)
  this.editStatus('online', { name: `r! | in ${this.guilds.size} Servers!`, type: 3 });
})