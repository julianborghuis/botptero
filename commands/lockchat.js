// SupportBot
// Created by © 2020 Emerald Services
// Command: Close

const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require("fs");
const yaml = require('js-yaml');

const supportbot = yaml.load(fs.readFileSync('./supportbot-config.yml', 'utf8'));

exports.run = async(bot, message, args) => {

    console.log(`\u001b[33m`, `[${supportbot.Bot_Name}] > `, `\u001b[31;1m`, `${message.author.tag}`, `\u001b[32;1m`, `has executed`, `\u001b[31;1m`, `${supportbot.Prefix}${supportbot.Lockchat_Command}`);

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${supportbot.StaffRole}`)
    let lockedRole = message.guild.roles.find(lc => lc.name === `${supportbot.locked_role}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${supportbot.StaffRole}**`)
        .setColor(supportbot.EmbedColour)
    if (!staffGroup) return message.reply(rolemissing).catch(err=>{console.error(err)})
        
    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${supportbot.StaffRole}**`)
        .setColor(supportbot.EmbedColour)
    if (!message.member.roles.has(staffGroup.id)) return message.reply(donothaverole)
    
    message.channel.overwritePermissions(lockedRole, { READ_MESSAGES: false, SEND_MESSAGES: false });
    message.channel.overwritePermissions(staffGroup, { READ_MESSAGES: true, SEND_MESSAGES: true });

    const lockmsg = new Discord.RichEmbed()
        .setDescription(":white_check_mark: **Chat Locked**")
        .setColor(supportbot.EmbedColour)
    message.channel.send(lockmsg);

};

exports.help = {
    name: supportbot.Lockchat_Command,
};