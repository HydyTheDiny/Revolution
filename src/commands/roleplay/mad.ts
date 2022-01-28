import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";
import messageCreate from "events/messageCreate";
import req from 'petitio';

export default new Command("mad")
  .setPermissions("bot", "embedLinks")
  .setDescription('mad command')
  .setUsage('mad')
  .setExecutor(async function(msg) {
    let data = await req("https://kawaii.red/api/gif/mad/token=847363776961314817.xTSE9HrhBYh8Hf6owl2d/").json<{success: boolean, message: string, response: string}>()
    return msg.reply({
        embeds: [
          new EmbedBuilder(true, msg.author)
          .setTitle(msg.args[0])
          .setImage(data.response)
          .toJSON()
        ]
      })
});