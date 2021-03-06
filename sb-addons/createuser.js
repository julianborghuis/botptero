// SupportBot Resource
// Pterodactyl Create User Command
// Creator: Griffindor

const Discord = require("discord.js");
const bot = new Discord.Client()
const Node = require('nodeactyl');
const pterodactyl = new Discord.Client()

bot.settings = require("../settings.json");
pterodactyl.settings = require("./settings/pterodactyl.json")

exports.run = async (client, message, args) => {
    message.delete();

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${pterodactyl.settings.StaffRole}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${pterodactyl.settings.StaffRole}**`)
        .setColor(bot.settings.colour)
    if (!staffGroup) return message.reply(rolemissing).catch(err => { console.error(err) })

    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${pterodactyl.settings.StaffRole}**`)
        .setColor(bot.settings.colour)
    if (!message.member.roles.has(staffGroup.id)) return message.reply(donothaverole)

    Node.login(pterodactyl.settings.Panel_URL, pterodactyl.settings.Admin_API, pterodactyl.settings.Admin_Protocol).catch(error => {
        if (error) {
        }
    });

    let Username = args[0];
    let Email = args[1];
    let FirstName = args[2];
    let LastName = args[3];
    let Password = args[4];
    let command = args.slice(1).toString().replace(',', ' ');
    try {
        Node.createUser(Username, Email, FirstName, LastName, Password);
        const successEmbed = new Discord.RichEmbed()
            .setColor('#2dce89')
            .setAuthor('Success')
            .setDescription(`The User has been created.You can login here ${pterodactyl.settings.Panel_URL}`)
            .setTimestamp()
            .setFooter('Pterodactyl');
        message.channel.send(successEmbed);
    } catch (error) {
        const errorEmbed = new Discord.RichEmbed()
            .setColor('#f5365c')
            .setAuthor('Error')
            .setDescription('UserCreate Failed')
            .setTimestamp()
            .setFooter('Pterodactyl');
        message.channel.send(errorEmbed);
    }
};

exports.help = {
    name: pterodactyl.settings.CreateUser_Command,
}