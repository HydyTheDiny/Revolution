import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";
import req from 'petitio';

const nsfwanswer = [
    "G-Gyaaa! This isn't an NSFW channel!",
    "This doesn't seem to be an NSFW channel...",
    "I'm sorry! But this stuff belongs in NSFW channels!",
    "That belongs in NSFW channels!", 
    "I can't post this here! Please direct me to an NSFW channel!",
    "I'm afraid that kind of stuff isn't allowed in here..",
    "This doesn't look like an NSFW channel!",
    "Please try again in an NSFW channel!",
    "u///u, I don't think I can post that in your average channel.",
    "Don't make me post that here...",
    "💢That doesn't belong here!",
    "W-What? I can't post that here!",
    "Would you direct me to an NSFW channel?",
    "Please try this command again in an NSFW channel!",
    "H-Hey.. Some people might not want to see that in here!",
    "LEWD! B-Baka! Not in here!",
    "B-Baka! I can't post that here!",
    "Nya! That was bad! Do that in an NSFW channel!",
    "How scandalous! Try that in an NSFW channel!",
    "Senpai...don't make me post that here...",
    "Nya that was bad senpai! This is an NSFW command!"
]

export default new Command("hkitsune")
  .setPermissions("bot", "embedLinks")
  .setDescription('Searches the internet for hkitsune nsfw images')
  .setUsage('hkitsune')
  .setExecutor(async function(msg) {
    if(msg.channel.nsfw === true){
        let data = await req("https://nekobot.xyz/api/image")
        .query("type", "hkitsune" ).json<{success: boolean, message: string, color: number, version: string}>()
      if (!data) return msg.reply('The API returned an error.')
      if (!data.success) return msg.reply('The API returned an error.')
      return msg.reply({
        embeds: [
          new EmbedBuilder(true, msg.author)
          .setTitle('NSFW')
          .setImage(data.message)
          .toJSON()
        ]
      });
    } else {
        var errMessage = nsfwanswer[Math.round(Math.random() * (nsfwanswer.length - 1))];
        return msg.reply(errMessage);
    }
  });