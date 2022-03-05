import ClientEvent from "@util/ClientEvent";
import db from "quick.db";

export default new ClientEvent("messageCreate", async function(message) {
    var curXP = db.fetch(`xp_${message.author.id}`);
    var curLvl = db.fetch(`lvl_${message.author.id}`);

    if (message.author.bot) return;
    if(curXP === null)curXP = 0;
    if(curLvl === null)curLvl = 1;
  
    //===== Xp =====//
    var exp = Math.floor(Math.random() * 60) + 1;
        db.add(`xp_${message.author.id}`, exp)
    //===== Lvl =====//
    var lvlup = Math.floor(curLvl * 500);
        if(curXP > lvlup) {
            db.add(`lvl_${message.author.id}`, 1)
          message.reply(`You have Leveled up to Level ${curLvl}`)
          // 1-3: Nothing , 4-8; 500 , 9-10; 1000
        }
        
  //console.log(`[ECONOMY] ${message.author.id} has ${curXP} needs ${lvlup} to lvl up to ${curLvl + 1}`)
});