import ClientEvent from "@util/ClientEvent";
import { Utility } from "@uwu-codes/utils";

export default new ClientEvent('ready', async function() {
  console.log(`[LOGIN]: Ready as ${this.user.username}#${this.user.discriminator}`)
  this.editStatus('online', { name: `r! | in ${this.guilds.size} Servers!`, type: 3 });
  this.cpuUsage = await Utility.getCPUUsage();
	setInterval(async() =>
		this.cpuUsage = await Utility.getCPUUsage()
	, 1e3);
})