import ClientEvent from "@util/ClientEvent";
import { Utility } from "@uwu-codes/utils";
import sqlite3  from "sqlite3";
import { open } from 'sqlite';

export default new ClientEvent('ready', async function() {
  console.log(`[LOGIN]: Ready as ${this.user.username}#${this.user.discriminator}`)
  this.editStatus('online', { name: `r! | in ${this.guilds.size} Servers!`, type: 3 });
  this.cpuUsage = await Utility.getCPUUsage();
	setInterval(async() =>
		this.cpuUsage = await Utility.getCPUUsage()
	, 1e3);
  
  open({
    filename: '../util/data/economy.sqlite3',
    driver: sqlite3.Database
  }).then((db) => {
    console.log('[SQLITE] Database Connected');

  });
});