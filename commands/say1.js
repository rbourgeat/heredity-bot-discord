const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
  let botmessage = args.join(" ");
  //message.channel.send(botmessage);
  

  
  let botembed = new Discord.RichEmbed()
    .setColor("#bb00ff")
    .setImage("https://cdn.discordapp.com/attachments/599600958238097418/600999826741657611/image0.gif")
    .addField(`<a:anitro:600976175820701717> <a:PandaReeRun:600982072475123723> **NITRO** <a:PandaReeRun:600982072475123723> <a:anitro:600976175820701717>`, botmessage)
    message.channel.send(botembed);
}

// <:mlb_outils:592053361373741092> **Changelog** 
// <:mlb_saphire:591996154619756544> **News**