// █▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██
// █                   __         __   __                                           █
// █   _________  ____/ /__  ____/ /  / /_  __  __                                  █
// █  / ___/ __ \/ __  / _ \/ __  /  / __ \/ / / /                                  █
// █ / /__/ /_/ / /_/ /  __/ /_/ /  / /_/ / /_/ /                                   █
// █ \___/\____/\__,_/\___/\__,_/  /_.___/\__, /                                    █
// █                                     /____/                                     █
// █                                                                                █
// █    ▄█   ▄█▄    ▄████████  ▄██████▄   ▄█          ▄█    █▄      ▄▄▄▄███▄▄▄▄     █
// █   ███ ▄███▀   ███    ███ ███    ███ ███         ███    ███   ▄██▀▀▀███▀▀▀██▄   █
// █  ███▐██▀     ███    ███ ███    ███ ███         ███    ███   ███   ███   ███    █
// █  ▄█████▀     ▄███▄▄▄▄██▀ ███    ███ ███        ▄███▄▄▄▄███▄▄ ███   ███   ███   █
// █ ▀▀█████▄    ▀▀███▀▀▀▀▀   ███    ███ ███       ▀▀███▀▀▀▀███▀  ███   ███   ███   █
// █   ███▐██▄   ▀███████████ ███    ███ ███         ███    ███   ███   ███   ███   █
// █   ███ ▀███▄   ███    ███ ███    ███ ███▌    ▄   ███    ███   ███   ███   ███   █
// █   ███   ▀█▀   ███    ███  ▀██████▀  █████▄▄██   ███    █▀     ▀█   ███   █▀    █
// █   ▀           ███    ███            ▀                                          █
// █ −−· ·−· ·− −· −··  −− ·− ·· − ·−· ·  ··· −−− ·−· −·−· ·· · ·−·  −·· · ···− ·   █
// █ ·−·· −−− ·−−· ·−−· · ··− ·−·  · −  ·− ··−  ··−· ·− ·· −  −··· ·−· ·− ···− −−−  █
// █ − ··−  ··· ·− ·· ···  ·−·· ·· ·−· ·  ·−·· ·  −− −−− ·−· ··· ·                  █
// █▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██▄██▀██

const http = require("http");
const economy = require("discord-eco");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const commando = require("discord.js-commando");
const client = new Discord.Client();
var ffmpeg = require("ffmpeg");
var TwitchApi = require("twitch-api");
const prefix = "h!";
const fs = require("fs");
const db = require("quick.db");
const sql = require("sqlite");
const config = require("./config.json");
sql.open("./karma.sqlite");
const ytdl = require("ytdl-core");
const ms = require("parse-ms");
const ownerID = "";
/* global Map*/
/* global client*/
const active = new Map();
let data = JSON.parse(fs.readFileSync("./database.json", "utf8"));
let dt = fs.readFileSync("./database.json", "utf8");

const talkedRecently = new Set();

// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on("ready", () => {
  wait(1000);
  
  client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
  
  console.log(
    `a redémaré avec ${client.users.size} utilisateurs, dans ${client.channels.size} channels sur ${client.guilds.size} serveurs.`
  );
  client.user.setPresence({
    game: { name: `HEREDITY`, type: "playing", url: "https://www.twitch.tv/_" }
  });

  var channelcount = client.channels.get("693875084175081513");
  channelcount.setName(`🎉 ${client.users.size} Sumos Cubiques !`);

  const activities_list = [
    "🔓 VERSION: 0.0.8",
    "😘 MERCI A TOUS",
    "🎮 PARTAGEZ UN MAX"
  ];

  var index = 0;

  setInterval(() => {
    index = index + 1;
    if (index > activities_list.length) index = 0;
    var channelcount = client.channels.get("656455765271379988");
    channelcount.setName(activities_list[index]);
  }, 10000);

  talkedRecently.clear();

  //  client.channels.get(`604286025526673437`).send(`<@604287632171728926> a redémaré avec ${client.users.size} utilisateurs, dans ${client.channels.size} channels sur ${client.guilds.size} serveurs.`)

  /*
  let reboot = new Discord.RichEmbed()
    .setDescription(`<a:v_:604293834612015121> **<@604605730569322506>** a **redémaré** avec **${client.users.size} utilisateurs**, dans **${client.channels.size} channels** sur **${client.guilds.size} serveurs**.`)
    .setColor("#ffffff")
    .setThumbnail('https://media1.giphy.com/media/FOdT4x8rHYAqQ/giphy.gif')
    .setTimestamp()
   // client.channels.get(`604286025526673437`).send(reboot);
   */
});

client.on("guildCreate", guild => {
  console.log("Joined a new guild: " + guild.name);
  client.user.setPresence({
    game: {
      name: `🔥 ${client.users.size} Membres`,
      type: "streaming",
      url: "https://www.twitch.tv/_"
    }
  });

  let joined = new Discord.RichEmbed()
    .setDescription(
      `<a:v_:604293834612015121> **<@604605730569322506>** a été ajouté au serveur **${guild.name}** !`
    )
    .setColor("#63ffa4")
    .setTimestamp();
  // client.channels.get(`604345660564832266`).send(joined);
});

client.on("guildDelete", guild => {
  console.log("Left a guild: " + guild.name);
  client.user.setPresence({
    game: {
      name: `🔥 ${client.users.size} Membres`,
      type: "streaming",
      url: "https://www.twitch.tv/_"
    }
  });

  let joined = new Discord.RichEmbed()
    .setDescription(
      `<a:x_:604348962757148672> **<@604605730569322506>** a été enlevé du serveur **${guild.name}** !`
    )
    .setColor("#ff5252")
    .setTimestamp();
  // client.channels.get(`604345660564832266`).send(joined);
});

/*   var interval = setInterval (function () {
  var interval = setInterval (function () {
        client.user.setPresence({ game: { name: `Devenez une Légende...`, type: "streaming", url: "https://www.twitch.tv/kaamelottbotdiscord"}});
      }, 5 * 1000); 
  var interval = setInterval (function () {
        client.user.setPresence({ game: { name: `Lien du Serveur: mg4mcYb`, type: "streaming", url: "https://www.twitch.tv/kaamelottbotdiscord"}});
      }, 5 * 1000); 
      }, 1 * 1000);  */

//-------------------------------New Member----------------------------------------------------------//
client.on("guildMemberAdd", async member => {
  var channelcount = client.channels.get("693875084175081513");
  channelcount.setName(`🎉 ${client.users.size} Sumos Cubiques !`);

  client.channels
    .get(`646362711445340162`)
    .send(
      `<a:confetti:676749189170069524><a:confetti:676749189170069524><a:confetti:676749189170069524><a:confetti:676749189170069524><a:confetti:676749189170069524>`
    );
  client.channels
    .get(`646362711445340162`)
    .send(
      `**Bienvenue** <@${member.id}> <a:WAW:676176510239113227> \nTu peux regarder les <#651610225551605770> pour en voir plus !`
    );
  let joined = new Discord.RichEmbed()
    .setColor("#00ff95")
    .setTitle("Télécharger le jeu")
    .setURL("https://heredity.yo.fr/index.php?jouer/");
  client.channels.get(`646362711445340162`).send(joined);
  
  /*member.guild.fetchInvites().then(invite => {
 
  let inviter = 0;
  let deja = false;
    
  function check(id) {
    return id == member.id;
  }

    for (var i = 0; i < data.length; i++){
      if (data[i].link == invite.code){
        inviter = data[i];
      }
      if (data[i].invite.find(check)) {
        deja = true;
      }
    }
    
    if (!deja && inviter != 0) {
      client.channels.get(`646362711445340162`).send("Merci à <@" + inviter + "> de l'avoir invité ! Tu gagnes **200 XP** !");
      inviter.xp += 200;
      inviter.invite.push(member.id);
    } else if (deja) {
      client.channels.get(`646362711445340162`).send("Bon retour parmi nous !");
    }
    
    client.channels.get(`650748286948605962`).send("Invite:" + invite.find(i => invite.get(i.code).uses < i.uses));
  
  });*/
  member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        //client.channels.get(`650748286948605962`).send("Invite:" + invite.code);

        let inviter = 0;
        let deja = false;

        function check(id) {
          return id == member.id;
        }

          /*for (var i = 0; i < data.length; i++){
            client.channels.get(`650748286948605962`).send("test:" + data[i]);
            if (data[i].link == invite.code){
              inviter = data[i];
            }
            if (data[i].invite.find(check)) {
              deja = true;
            }
          }*/
    for (var p in data) {
      if (data[p].link == invite.code) {
        inviter = data[p];
      }
    } 
    
    for (var i = 0; i < inviter.invite.length; i++) {
      if (inviter.invite[i] == member.id) deja = true;
    }
    
    // client.channels.get(`650748286948605962`).send("Invite:" + invite.code + " Inviter: <@" + inviter + ">");

          if (!deja && inviter != 0) {
            client.channels.get(`646362711445340162`).send("Merci à <@" + require('util').inspect(inviter) + "> de l'avoir invité ! Tu gagnes **200 XP** !");
            inviter.xp += 200;
            inviter.invite.push(member.id);
          } 
          if (deja) {
            client.channels.get(`646362711445340162`).send("Bon retour parmi nous !");
          }
    
    });
  

  //client.user.setPresence({ game: { name: `${client.users.size} Utilisateurs 🔥`, type: "streaming", url: "https://www.twitch.tv/_"}});
});

//--------------------------------Bye Bye------------------------------------------------------------//
client.on("guildMemberRemove", member => {
  //client.user.setPresence({ game: { name: `🔥 ${client.users.size} Membres`, type: "streaming", url: "https://www.twitch.tv/_"}});
  //client.user.setPresence({ game: { name: `${client.users.size} Utilisateurs 🔥`, type: "streaming", url: "https://www.twitch.tv/_"}});

  var channelcount = client.channels.get("693875084175081513");
  channelcount.setName(`🎉 ${client.users.size} Sumos Cubiques !`);
});

/*
client.on('message', msg => {
  if (msg.guild && msg.content.startsWith('mpeveryone') && (msg.member.id == 219847468974735360 || msg.member.hasPermission("ADMINISTRATOR"))) {
    let text = msg.content.slice('mpeveryone'.length);
    msg.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) member.send(text);
    });
  }
});*/

// msg.member.id == 219847468974735360)

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//----------------------------Attente de message----------------------------------------------//
client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let color = "#00ff95";
  let msg = message.content.toLowerCase();
  let sender = message.author;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  let mention = message.mentions.users.first();
  if (!mention) mention = 0;

  if (sender.id == 660583206449577995) return;
  

  // LVL SYSTEM
  if (!data[message.author.id])
    data[message.author.id] = {
      xp: 0,
      level: 1,
      booster: 0,
      invite: [],
      link: ''
    };
  
  let joueur = data[message.author.id];
  
  if (!joueur.xp) data[message.author.id].xp = 0;
  if (!joueur.level) data[message.author.id].booster = 1;
  if (!joueur.booster) data[message.author.id].booster = 0;
  if (!joueur.invite) data[message.author.id].invite = [];
  if (!joueur.link) data[message.author.id].link = '';

  data[message.author.id].xp++;
  
  if (data[message.author.id].booster != 0) data[joueur.booster].xp++;
  
  if (data[message.author.id].xp < 0) data[message.author.id].xp = 0;
  
  console.log(
    "+1 xp (booster: " + data[message.author.id].booster + ") pour id = " +
      message.author.id +
      " | nom: " +
      message.author.username +
      " | message: " +
      message.content
  );
  
  let userInfo = data[message.author.id];
  if (userInfo.xp > 100 * userInfo.level) {
    userInfo.level++;
    userInfo.xp = 0;
    message.channel.send(
      "<a:confetti:676749189170069524><a:confetti:676749189170069524><a:confetti:676749189170069524><a:confetti:676749189170069524><a:confetti:676749189170069524>"
    );
    message.channel.send(
      "**GG**" +
        message.author +
        " ! Tu as **LVL UP** ! [NIVEAU** " +
        userInfo.level +
        "**]"
    );
  }
  
  if (msg.startsWith('h') &&
    (msg.includes("rename"))
  ) {
    
    message.member.setNickname(msg.replace('h rename ', ''));
    joueur.level--;

    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("-1 Niveau 🔰 | Nouveau pseudo:", msg.replace('h rename ', ''))
      .setFooter(message.author.username, message.author.avatarURL);
    return message.channel.sendEmbed(embed);
  }
  
  if (msg.startsWith('h') &&
    (msg.includes("test") && message.author.id == '458710853672239124')
  ) {
    
    for (var p in data) {
      if (data[p].link == "WdPGUyU") {
        message.reply("ok");
      }
        //console.log(p + " | " + data[p].link);
    } 


 
  }
  
  if (msg.startsWith('h') &&
    (msg.includes("rename"))
  ) {
    
    message.member.setNickname(msg.replace('h rename ', ''));
    joueur.level--;

    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("-1 Niveau 🔰 | Nouveau pseudo:", msg.replace('h rename ', ''))
      .setFooter(message.author.username, message.author.avatarURL);
    return message.channel.sendEmbed(embed);
  }
  
  if (msg.startsWith('h') &&
    (msg.includes("boost"))
  ) {
    if (!mention) {
      message.reply("Tu peux pas boost personne hein... Faut réfléchir...").then(msg => {
        msg.delete(10000);
      });
      return;
    }
    if (mention.id == message.author.id) {
      message.reply("Hé t'essaye de te boost ? Pff Nullos...").then(msg => {
        msg.delete(10000);
      });
      return;
    }

    data[message.author.id].booster = mention.id;
    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("NOUVEAU 🔺 BOOSTER", mention)
      .setFooter(message.author.username, message.author.avatarURL);
    return message.channel.sendEmbed(embed);
  }
  
  if (msg.startsWith('h') &&
    (msg.includes("invite") || msg.includes("invitation"))
  ) {

    var invitations_liste = joueur.invite;

    invitations_liste = invitations_liste.reverse();
    
    var invitations = [];
    
    if (invitations_liste[0]) {
      for (var i = 0; i < 10; i++) {
        if (invitations_liste[i] != undefined) {
          invitations[i] =
          "<@" +
          invitations_liste[i] +
          ">";
        }
      }
    } else {
      invitations[0] = "Pas de membre invité, trop nul...";
    }
    
    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("👹 10 derniers membres invités:", invitations)
      .setFooter(message.author.username, message.author.avatarURL);
    return message.channel.sendEmbed(embed);
  }
  
  if (msg.startsWith('h') &&
    (msg.includes("link") || msg.includes("generer"))
  ) {
  
  var options = {
    maxAge: 0,
    temporary: false,
    maxUses: 0,
    unique: true,
    reason: `Lien de ${message.author.tag}`
  };

  // let lien = client.channels.get(`650748286948605962`).createInvite();
    
  client.channels.get(`671388305589272576`).createInvite(options)
  .then(invite => {
    joueur.link = invite.code;
    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("🔗 Nouveau lien:", "[discord.gg/" + joueur.link + "](http://discord.gg/" + userInfo.link + ")")
      .setFooter(message.author.username, message.author.avatarURL);
    return message.channel.sendEmbed(embed);
  })
  .catch(console.error);

  }

  if (msg.startsWith('h') &&
    (msg.includes("lvl") || msg.includes("level") || msg.includes("niveau"))
  ) {
    console.log(
      "a fait une commande lvl id = " +
        message.author.id +
        " | nom: " +
        mention.username
    );
    let userInfo = data[message.author.id];
    let member = message.mentions.members.first();
    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("🔰 Niveau", userInfo.level)
      .addField("🔹 XP", userInfo.xp + "/" + 100 * userInfo.level)
      .addField("🔺 BOOSTER", "<@" + userInfo.booster + ">")
      .addField("🔗 Lien", "[discord.gg/" + userInfo.link + "](http://discord.gg/" + userInfo.link + ")")
      .setFooter(message.author.username, message.author.avatarURL);
    if (!member) return message.channel.sendEmbed(embed);
    let memberInfo = data[member.id];
    let embed2 = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("🔰 Niveau", memberInfo.level)
      .addField("🔹 XP", memberInfo.xp + "/" + 100 * memberInfo.level)
      .addField("🔺 BOOSTER", "<@" + memberInfo.booster + ">")
      .addField("🔗 Lien", "[discord.gg/" + memberInfo.link + "](http://discord.gg/" + memberInfo.link + ")")
      .setFooter(member.user.username, member.user.avatarURL);
    message.channel.sendEmbed(embed2);
  }

  if (msg.startsWith('h') &&
    (msg.includes("leaderboard") ||
      msg.includes("rank") ||
      msg.includes("top") ||
      msg.includes("classement"))
  ) {
    var tableau = [];

    var b = Object.keys(data);
    b.sort(function(x, y) {
      return data[y].level - data[x].level;
    });

    for (var i = 0; i < 10; i++) {
      tableau[i] =
        "**" +
        (i + 1) +
        ".** <@" +
        b[i] +
        "> | **" +
        data[b[i]].level +
        "** 🔰";
    }

    let embed = new Discord.RichEmbed()
      .setColor(0x2dfc8b)
      .addField("⚜️ TOP NIVEAUX ⚜️", tableau)
      .setFooter(
        "Demandé par " + message.author.username,
        message.author.avatarURL
      );
    message.channel.sendEmbed(embed);
  }

  if (msg.includes("<:") && data[message.author.id].level < 2) {
    message.delete();
    message.channel
      .send(
        "❌" +
          message.author +
          ", Il faut être au niveau **2** pour envoyer des emojis ! \n Et tu es au niveau **" +
          data[message.author.id].level +
          "**..."
      )
      .then(msg => {
        msg.delete(10000);
      });
  }

  if (msg.includes("http") && data[message.author.id].level < 3) {
    message.delete();
    message.channel
      .send(
        "❌" +
          message.author +
          ", Il faut être au niveau **3** pour envoyer des liens ! \n Et tu es au niveau **" +
          data[message.author.id].level +
          "**..."
      )
      .then(msg => {
        msg.delete(10000);
      });
  }

  if (
    message.channel.id == 715186794467164160 &&
    data[message.author.id].level < 4
  ) {
    message.delete();
    message.channel
      .send(
        "❌" +
          message.author +
          ", Il faut être au niveau **4** pour envoyer des emojis ! \n Et tu es au niveau **" +
          data[message.author.id].level +
          "**..."
      )
      .then(msg => {
        msg.delete(10000);
      });
  }

  if (
    message.channel.id == 715187120569843803 &&
    data[message.author.id].level < 5
  ) {
    message.delete();
    message.channel
      .send(
        "❌" +
          message.author +
          ", Il faut être au niveau **5** pour envoyer des emojis ! \n Et tu es au niveau **" +
          data[message.author.id].level +
          "**..."
      )
      .then(msg => {
        msg.delete(10000);
      });
  }

  if (msg.startsWith('h') &&
    msg.includes("casino")
  ) {
    let slots = [
      " <:sumocubiqueM:698194238676140062> ",
      " <:sumocubiqueF:698194709520318544> ",
      " 🍔 ",
      " 🦠 ",
      " 🧻 "
    ];
    let result1 = Math.floor(Math.random() * slots.length);
    let result2 = Math.floor(Math.random() * slots.length);
    let result3 = Math.floor(Math.random() * slots.length);
    let name = message.author.username;
    let icon = message.author.displayAvatarURL;

    if (
      slots[result1] === slots[result2] &&
      slots[result1] === slots[result3]
    ) {
      let embed = new Discord.RichEmbed()
        .setFooter("🔹 100 XP " + name, icon)
        .setTitle(":slot_machine: CASINO :slot_machine:")
        .addField(
          "Gagné !",
          "➡️  " + slots[result1] + slots[result2] + slots[result3] + "  ⬅️",
          true
        )
        .setColor(0x4286f4);
      message.channel.send(embed);
      data[message.author.id].xp += 99;
    } else {
      let embed2 = new Discord.RichEmbed()
        .setFooter("🔸 10 XP " + name, icon)
        .setTitle(":slot_machine: CASINO :slot_machine:")
        .addField(
          "Perdu...",
          "➡️  " + slots[result1] + slots[result2] + slots[result3] + "  ⬅️",
          true
        )
        .setColor(0xf45742);
      message.channel.send(embed2);
      data[message.author.id].xp -= 10;
    }
  }

  if (
    message.channel.id == 651148547995074590 ||
    message.channel.id == 651610225551605770 ||
    message.channel.id == 646362930845057099 ||
    message.channel.id == 654743235574366218
  ) {
    //message.react("<a:HyperTada:676751879249592340>")
    //message.react("<a:eevee_dancing:676749190537412609>")
    //message.react("<a:confetti:676749189170069524>")
    message.react("676751879249592340");
    message.react("676749190537412609");
    message.react("676749189170069524");
    message.react("677153616469164033");
  }
  // message.channel.send(`ok: ${message.client.user}`);
  if (getRandomInt(200) == 0) {
    let pub = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Regarde une pub 15s, ça nous aidera beaucoup !")
      .setURL("https://utip.io/heredity");
    message.channel.send(pub);
    return;
  }

  if (msg.includes("bienvenue")) {
    message.react("676751879249592340");
  }

  if (msg.includes("merci")) {
    message.react("👍");
  }

  if (msg.includes("ok") && !msg.includes("hereditylook")) {
    message.react("👌");
  }

  if (msg.includes("boom")) {
    message.react("💣");
  }

  if (msg.includes("yes")) {
    message.react("😁");
  }

  if (msg.includes("fiesta")) {
    message.react("🥳");
  }

  if (
    (mention.id == 660583206449577995 || msg.includes("heredity")) &&
    msg.includes("chut") &&
    (sender.id == 458710853672239124 || sender.id == 443132553428336641)
  ) {
    if (talkedRecently.has(1)) {
      message.channel.send("Ok... Je me tais pendant **5min**...");
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 3000000);
    } else {
      message.channel.send("Ok... Je me tais pendant **5min**...");
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 3000000);
    }
    return;
  }

  if (
    (mention.id == 660583206449577995 || msg.includes("heredity")) &&
    msg.includes("chuut") &&
    (sender.id == 458710853672239124 || sender.id == 443132553428336641)
  ) {
    if (talkedRecently.has(1)) {
      message.channel.send("OK! OK... Je me tais pendant **10min**...");
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 6000000);
    } else {
      message.channel.send("OK! OK... Je me tais pendant **10min**...");
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 6000000);
    }
    return;
  }

  if (
    msg.includes("123") &&
    (msg.includes("pierre") ||
      msg.includes("feuille") ||
      msg.includes("ciseau"))
  ) {
    var facts = ["💎 **pierre**.", "🧻 **feuille**.", "✂️ **ciseau**."];
    var fact = Math.floor(Math.random() * facts.length);
    message.channel.send(facts[fact]);
    if (msg.includes("pierre") && facts[fact] == "💎 **pierre**.") {
      message.channel.send("Egalité... Pff... 🙄");
      return;
    }
    if (msg.includes("pierre") && facts[fact] == "🧻 **feuille**.") {
      message.channel.send("HAHA J'ai gagné ! 😎");
      data[message.author.id].xp -= 5;
      let embed = new Discord.RichEmbed()
        .setColor(0xf45742)
        .addField("Tu as perdu", "🔸 5 XP")
        .setFooter(message.author.username, message.author.avatarURL);
      message.channel.sendEmbed(embed);
      return;
    }
    if (msg.includes("pierre") && facts[fact] == "✂️ **ciseau**.") {
      message.channel.send("Tu as gagné... 😭");
      data[message.author.id].xp += 10;
      let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Tu as gagné", "🔹 10 XP")
        .setFooter(message.author.username, message.author.avatarURL);
      message.channel.sendEmbed(embed);
      return;
    }

    if (msg.includes("feuille") && facts[fact] == "💎 **pierre**.") {
      message.channel.send("Bon bah j'ai perdu hein...");
      data[message.author.id].xp += 10;
      let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Tu as gagné", "🔹 10 XP")
        .setFooter(message.author.username, message.author.avatarURL);
      message.channel.sendEmbed(embed);
      return;
    }
    if (msg.includes("feuille") && facts[fact] == "🧻 **feuille**.") {
      message.channel.send("Ex aequo, ça me va !");
      return;
    }
    if (msg.includes("feuille") && facts[fact] == "✂️ **ciseau**.") {
      message.channel.send("Je t'ai battu trou du ... heu dsl...");
      data[message.author.id].xp -= 5;
      let embed = new Discord.RichEmbed()
        .setColor(0xf45742)
        .addField("Tu as perdu", "🔸 5 XP")
        .setFooter(message.author.username, message.author.avatarURL);
      message.channel.sendEmbed(embed);
      return;
    }

    if (msg.includes("ciseau") && facts[fact] == "💎 **pierre**.") {
      message.channel.send("Trop **nul** je t'ai battu !");
      data[message.author.id].xp -= 5;
      let embed = new Discord.RichEmbed()
        .setColor(0xf45742)
        .addField("Tu as perdu", "🔸 5 XP")
        .setFooter(message.author.username, message.author.avatarURL);
      message.channel.sendEmbed(embed);
      return;
    }
    if (msg.includes("ciseau") && facts[fact] == "🧻 **feuille**.") {
      message.channel.send("Mais... t'as triché non ? 🤬");
      data[message.author.id].xp += 10;
      let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Tu as gagné", "🔹 10 XP")
        .setFooter(message.author.username, message.author.avatarURL);
      message.channel.sendEmbed(embed);
      return;
    }
    if (msg.includes("ciseau") && facts[fact] == "✂️ **ciseau**.") {
      message.channel.send("Egalité... Grr...");
      return;
    }

    return;
  }

  if (msg.includes("sumo")) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "*Quiiiii vit dans une cabane sur **heredity** ? LE SUUUUMOOOOO CUUUUBIQUE*",
        "Longue vie au **sumo cubiques** !",
        "QUI PARLE DE NOUS ???",
        "Oh c'est moi !",
        "Oh une photo de moi !"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("heredity lance piece") || msg.includes("pile ou face")) {
    var facts = ["**pile**.", "**face**."];
    var fact = Math.floor(Math.random() * facts.length);
    message.channel.send(facts[fact]);
    return;
  }

  if (
    mention.id == 660583206449577995 &&
    (msg.includes("ca") || msg.includes("ça")) &&
    msg.includes("va")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Super et toi ?",
        "Yeah men !",
        "Et ça fait bim, bam, boom...",
        "J'attend le multi de HEREDITY en fait...",
        "Comme dab.",
        "Tu sais que tu parles à un bot ?",
        "Chut. Tu parles trop.",
        "Bien merci ^^",
        "Bof... Jme sens un peu buggé",
        "J'allais très bien avant que tu me parle...",
        "T'aimerais qu'on mette un cooldown à tes réponses toi ?"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    mention.id == 660583206449577995 &&
    msg.includes("fai") &&
    msg.includes("quoi")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Rien.",
        "Blop.",
        "Et ça fait bim, bam, boom...",
        "J'attend le multi de HEREDITY en fait...",
        "Comme dab.",
        "Tu sais que tu parles à un bot ?",
        "Chut. Tu parles trop.",
        "Pas grand chose...",
        "Je lis tes conn*******"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    mention.id == 660583206449577995 &&
    msg.includes("dit") &&
    msg.includes("avenir")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Demain tu auras une occasion en or.",
        "Surtout cette nuit ne regarde pas sous ton lit...",
        "Une personne te fixera dans les yeux aujourd'hui, fixe le aussi ou quelque chose de grave va arriver.",
        "Ne prend pas l'avion cette semaine. C'est juste un conseil.",
        "Joue au loto le prochain Vendredi 13, tu gagneras quelque chose !",
        "Si tu trouves un objet perdu, rapporte le, tu gagneras encore mieux.",
        "Le Silence est d'or mais tu es un diamant alors parle."
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (mention.id == 660583206449577995) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Laisse moi tranquille...",
        "Mechant !",
        "Je te tag moi ? NON.",
        "Qui tag les bots en 2020 ? TOI.",
        "Oui c'est moi ?",
        "Pas la peine de me tag, je lis tout les messages...",
        "Pas cool de me ping comme ça...",
        "J'ai trop de notifs... Et c'est en parti à cause de toi !",
        "T'as que ça à faire srx...",
        "Toi... Jt'aime po...",
        "Tu sais que t'es moches ?",
        "Faut le mériter pour me mentionner !",
        "J'te parle pas à toi !",
        "EEEEEH y'en à marre !",
        "Chut, tu parles trop."
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (mention.id == 458710853672239124) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Il est occupé repasse plus tard...",
        "Waw, ça tag les gens comme ça...",
        "J'espère que tu as une bonne raison de le tag...",
        "Tu sais qui tu tag ? BAh c'est mon créateur...",
        "Il arrive dans pas longtemps  !",
        "Veuillez patientez, il ne va pas tarder à arriver.",
        "Laissez un message après le bip. **BIP.**",
        "T'as que ça à faire srx...",
        "Toi... Jt'aime po..."
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    msg.includes("salut") ||
    msg.includes("coucou") ||
    msg.includes("hello") ||
    msg.includes("bonjour") ||
    msg.includes("bonsoir")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Salut !",
        "Coucou <:Kermit_Hi:665629164296208424>",
        "<a:heLOOO:676176512277544970> Hello",
        "<a:heLOOO:676176512277544970>",
        "Hey !",
        "Hola !",
        "Hello",
        "Hallo",
        "Bonjour, bonjour !"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    msg.includes("bonne nuit") ||
    msg.includes("a plus") ||
    msg.includes("à plus") ||
    msg.includes("a +") ||
    msg.includes("ciao") ||
    msg.includes("aurevoir") ||
    msg.includes("à bientôt") ||
    msg.includes("a bientot") ||
    msg.includes("a+") ||
    msg.includes("go")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Aurevoir",
        "A plus !",
        "<a:heLOOO:676176512277544970>",
        "Ciao !",
        "@+",
        "++"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("ah") && !msg.includes("bah")) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = ["AH !", "Aïe", "...", "heu..", "eh", "oof", 'oh" ?...'];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    msg.includes("guerre" || msg.includes("battre") || msg.includes("fight"))
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "OUI LA GUERRRRE",
        "Qui veut se battre ?",
        "FIGHT !",
        "Moi je vous prends tous 1 par 1",
        "1v1 ce soir en bas de chez toi ?",
        "Avouez vous avez peur de moi..."
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    msg.includes("tg ") ||
    msg.includes("ntm ") ||
    msg.includes("pute ") ||
    msg.includes("connard ") ||
    msg.includes("fdp ")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Ohlalala...",
        "Mais...",
        "Heu...",
        "LA vulgarité c'est mal.",
        "Surveille ton langage stp.",
        "Hey on parle pas mal ici !"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("?") && msg.includes(" ")) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Très bonne question...",
        "Tel est la question...",
        "Je me posais la meme question !",
        "Ah oui j'y avais pas pensé !",
        "Hein ?",
        "Eh oui.",
        "Eh non.",
        "C'est vrai ça !?",
        "Ah mais ouiiiii...",
        "Pas bête !",
        "oui !",
        "Et je dis oui !",
        "Ma que ?",
        "Oh",
        "Nope",
        "Yep",
        "Pouet",
        "Hmmhmmm..."
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  /*if (mention.tag == client.tag) {
    if (talkedRecently.has(1)) {  
        } else {
    var facts = ["Oui ?", "C'est moi.", "Qui me réveille comme ça ?", "EH ! J'étais en train de chasser le Yeti !", "Tag ou ne pas tag ? Tel est la question...", "Pas moyen d'être tranquille ici..."];
    var fact = Math.floor(Math.random() * facts.length);
    message.channel.send(facts[fact]);
    talkedRecently.add(1);
          setTimeout(() => {
            talkedRecently.delete(1);
          }, 60000);
    }
    return;
  }*/

  if (
    msg.includes("mdr") ||
    msg.includes("lol") ||
    msg.includes("xD") ||
    msg.includes("x)")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "C'est vrai que c'est drôle !",
        "T'as de l'humour toi...",
        "HAHAHA... c'était drôle...",
        "Qu'est ce qu'on se marre ! xD",
        "LOUL",
        "Pff",
        "xD",
        "x)",
        "Mdr",
        "Lol",
        "héhé",
        "OkDakor",
        "Hum",
        "Waaah",
        "Pas mal, pas mal...",
        "Waw",
        "pff, n'importe quoi...",
        "ça t'arrives souvent de dire des trucs inutiles ?"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("pf") || msg.includes("roh") || msg.includes("gn")) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "T'as un problème ?",
        "Quoi",
        "Qu'est ce qui ne va pas ?",
        "Mais..."
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("fatigué") || msg.includes("dormir")) {
    if (talkedRecently.has(1)) {
    } else {
      var facts = [
        "Bah faut dormir dans la vie !",
        "Faut aller se coucher...",
        "Au dodo !",
        "Allez, bonne nuit !"
      ];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("twitter")) {
    if (talkedRecently.has(1)) {
    } else {
      let dl = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Follow le Twitter Officiel !")
        .setURL("https://twitter.com/heredity_off");
      message.channel.send("En parlant de Twitter...");
      message.channel.send(dl);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("instagram") || msg.includes("insta")) {
    if (talkedRecently.has(1)) {
    } else {
      let dl = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Follow l'Intstagram Officiel !")
        .setURL("https://instagram.com/heredity_off");
      message.channel.send("En parlant d'Insta...");
      message.channel.send(dl);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("wiki")) {
    if (talkedRecently.has(1)) {
    } else {
      let dl = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Voilà le Wiki d'Heredity !")
        .setURL("https://heredity.yo.fr");
      message.channel.send("En parlant de Wiki...");
      message.channel.send(dl);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (msg.includes("utip")) {
    if (talkedRecently.has(1)) {
    } else {
      let dl = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Regarde une pub pour faire un don !")
        .setURL("https://utip.io/heredity");
      message.channel.send("En parlant de Utip...");
      message.channel.send(dl);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  if (
    msg.includes("telecharger") ||
    msg.includes("telecharge") ||
    msg.includes("telechargement") ||
    msg.includes("télécharger") ||
    msg.includes("télécharge") ||
    msg.includes("téléchargement")
  ) {
    if (talkedRecently.has(1)) {
    } else {
      let dl = new Discord.RichEmbed()
        .setColor(color)
        .setTitle("Télécharger le jeu ici")
        .setURL("https://heredity.yo.fr/jouer/");
      message.channel.send(dl);
      talkedRecently.add(1);
      setTimeout(() => {
        talkedRecently.delete(1);
      }, 120000);
    }
    return;
  }

  fs.writeFile("./database.json", JSON.stringify(data), x => {
    if (x) console.error(x);
  });

  if (message.channel.type === "dm") return;
  if (!msg.startsWith(prefix)) return;

  if (message.author.bot) return;
  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];
    let ops = {
      ownerID: ownerID,
      active: active
    };
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);
  } catch (e) {
    console.log(e.stack);
  } finally {
    console.log(`${message.author.tag} a utilisé la commande ${cmd}`);
  }

  //----------------------------------------Levels Discord------------------------------------------//
  /*
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		if (!row) {
		  sql.run("INSERT INTO scores (userId, points, level, palier) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, 0]);
		} else {
			let curLevel = Math.floor(0.5 * Math.sqrt(row.points + 3));
			let palier = 0;
			var curPalier= " ";
			let palier0="bambi";
			let palier1 ="VCS";
			let palier2 ="Silver";
			let palier3 ="Ecuyer";
			let palier4 ="Champion"
			let palier5 ="Chicken Winner";
			let palier6 ="AWP";
			let palier7 ="Master";
			let palier8 ="Invocatueur";
			let palier9 ="Maitre du Game";
			
		  if (curLevel > row.level) {
			row.level = curLevel;
			sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level}, palier = ${row.palier} WHERE userId = ${message.author.id}`);
			message.reply(`Tu viens de monter au niveau **${curLevel}**!`);
		  }
			sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
			if (curPalier>row.palier){
				row.palier = curPalier;
				sql.run(`UPDATE score SET palier = ${row.palier + 1} WHERE userId = ${message.author.id}`)
				message.reply(`Tu est arrivé au palier **${curPalier}**!`)

			}
		}
	  }).catch(() => {
		console.error;
		sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER, palier INTEGER)").then(() => {
		  sql.run("INSERT INTO scores (userId, points, level, palier) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, 0]);
		});
	  });
	
	
	  if (message.content.startsWith(prefix + "level")) {
		  message.delete();
		sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		  if (!row) return message.reply("Your current level is 0");
		  message.reply(`Ton niveau actuel est ${row.level}`);
		  console.log(message.author.username + '  !level')
		});
	  } else 
	
	  if (message.content.startsWith(prefix + "points")) {
		  message.delete();
		sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		  if (!row) return message.reply("sadly you do not have any points yet!");
		  message.reply(`Tu as accumulé ${row.points} points, continue!`);
		  console.log(message.author.username + '  !points')
		});
		} else
		if (message.content.startsWith(prefix + "palier")) {
			message.delete()
			sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
				if (!row) return message.reply("Tu est au palier **Bambi**");
				if (row.palier===1){
					message.reply(`Tu est au palier **SCV** continue!`)
				}else if(row.palier===2){
					message.reply(`Tu est au palier **Silver**`)
				}
				else if (row.palier===3){
					message.reply(`Tu est au palier **Ecuyer** continue!`)
				}else if(row.palier===4){
					message.reply(`Tu est au palier **Champion** C'est TOI le Dieu!`)
				}
				else if (row.palier===5){
					message.reply(`Tu est au palier **Chicken killer** continue!`)
				}else if(row.palier===6){
					message.reply(`Tu est au palier **AWP** C'est TOI le Dieu!`)
				}
				else if (row.palier===7){
					message.reply(`Tu est au palier **Master** continue!`)
				}else if(row.palier===8){
					message.reply(`Tu est au palier **Invocatueur** C'est TOI le Dieu!`)
				}
				else if (row.palier===9){
					message.reply(`Tu est au palier **Maitre du Game** C'est TOI qui décides!`)
				}else if(row.palier===10){
					message.reply(`Tu est au palier **Dieu tout puissant** `)
				}
				
				console.log(message.author.username + '  !palier')
			});
		}

    if (msg === config.prefix + 'UPTIME'){
        message.channel.send('Le bot est on depuis ' + `${(client.uptime/1000)} secondes` + ` soit ${(client.uptime/3600000)} heures`);
    }
  
  if (msg === "TTS"){
    message.channel.send("Hello World")
  }

*/
});

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 560000);

// 280000
client.login(process.env.TOKEN);
