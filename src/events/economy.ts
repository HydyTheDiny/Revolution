import ClientEvent from "@util/ClientEvent";
import db from "quick.db";

export default new ClientEvent("messageCreate", async function(message) {
    var curXP = db.fetch(`xp_${message.author.id}`);
    var curLvl = db.fetch(`lvl_${message.author.id}`);
    let Lucky;
    if (message.author.bot) return;
  
  
    if(curXP === null)curXP = 0;
    if(curLvl === null)curLvl = 1;
  
    //===== Xp =====//
    var exp = Math.floor(Math.random() * 6) + 1;
        db.add(`xp_${message.author.id}`, exp)
    //===== Lvl =====//
    var lvlup = Math.floor(curLvl * 500);
        if(curXP > lvlup) {
            db.add(`lvl_${message.author.id}`, 1)
          message.reply(`You have Leveled up to Level ${curLvl}`)
          // 1-3: Nothing , 4-8; 500 , 9-10; 1000
          Lucky = Math.floor(Math.random() * 9) + 1;
          console.log(`${Lucky}`)
            if(Lucky < 3) {
              message.reply(`Sorry You didnt got anything for your lvl up`)
              return;
            }
            if(Lucky < 8) {
                message.reply(`Congrats , you Leveled up , and get 500$`)
              db.add(`money_${message.author.id}`, 500)
              return;
            }
            if(Lucky < 9) {
                message.reply(`WOW , Big Congrats on your lvl up , You just got lucky and got 1000$`)
              return;
            }
        }
  console.log(`[ECONOMY] ${message.author.id} has ${curXP} needs ${lvlup} to lvl up to ${curLvl + 1}`)
});