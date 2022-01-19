import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";

export const answers = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",

  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",

  "Don't count on it.",
  "My reply is no.",
  "My Sources say no.",
  "Outlook not so good.",
  "Very doubtful."
];

export default new Command("8ball")
  .setPermissions("bot", "embedLinks")
  .setDescription("Ask the magic 8 Ball")
  .setUsage('<question to answer>')
  .setExecutor(async function(msg) {
    if (msg.args.length === 0) return msg.reply("I can't answer if you dont ask.")
    await msg.reply({
      embeds: [
        new EmbedBuilder(true, msg.author)
          .setTitle("Magic 8 Ball.")
          .setDescription(`You Asked:\n\`\`\`\n${msg.args.join(" ")}\`\`\`\nMagic 8 Ball's Answer:\`\`\`\n${answers[Math.floor(Math.random() * answers.length)]}\`\`\``)
          .setFooter("Please dont actually believe this.")
          .toJSON()
      ]
    })
  })