// SupportBot
// Command: Help

const Discord = require("discord.js");
const bot = new Discord.Client()
const pterodactyl = new Discord.Client()

bot.settings = require("../settings.json");
pterodactyl.settings = require("../sb-addons/settings/pterodactyl.json")

exports.run = (bot, message, args) => {
    message.delete();

    let userCommands = "";
        userCommands += `**${bot.settings.prefix}${bot.settings.Link_Command}**: Get some important links!\n`;
        userCommands += `**${bot.settings.prefix}${bot.settings.Ping_Command}**: Check the bots ping. Pong!\n`;
	    userCommands += `**${bot.settings.prefix}${bot.settings.Ticket_Command} <reason>**: Create a support ticket\n`;
        userCommands += `**${bot.settings.prefix}${bot.settings.Close_Command}**: Close your support ticket\n`;
        userCommands += `**${bot.settings.prefix}${bot.settings.Suggest_Command} <suggestion>**: Create a server suggestion\n`;
        userCommands += `**${bot.settings.prefix}${bot.settings.Report_Command} <user> <reason>**: Create a server suggestion\n`;
	
    let supportCommands = "";
	    supportCommands += `**${bot.settings.prefix}${bot.settings.Add_Command} <user>**: Adds a user to a ticket\n`;
        supportCommands += `**${bot.settings.prefix}${bot.settings.Remove_Command} <user>**: Removes a user from a ticket\n`;
        supportCommands += `**${bot.settings.prefix}${bot.settings.Forceclose_Command}**: Forceclose a support ticket\n`;
        supportCommands += `**${bot.settings.prefix}${bot.settings.Rename_Command}**: Rename a support ticket\n`;

    let staffCommands = "";
	    staffCommands += `**${bot.settings.prefix}${bot.settings.Announcement_Command} <message>**: Create a bot announcement\n`;
        staffCommands += `**${bot.settings.prefix}${bot.settings.Say_Command} <message>**: Send a message as the bot\n`;
        staffCommands += `**${bot.settings.prefix}${bot.settings.Lockchat_Command}**: Lock the chat channel\n`;
        staffCommands += `**${bot.settings.prefix}${bot.settings.UnLockchat_Command}**: UnLock the chat channel\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.Send_Command} ServerID**: Sends a command to the server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.AllServers_Command}**: Lists all servers connected to that account\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.Suspend_Command} ExternalID**: Suspends the server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.UnSuspend_Command} ExternalID**: Unsuspends the server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.Rebuild_Command} ExternalID**: Rebuilds the server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.StartServer_Command} ServerID**: Starts the Server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.StopServer_Command} ServerID**: Stops the Server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.KillServer_Command} ServerID**: Kills the Server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.RestartServer_Command} ServerID**: Restarts the Server\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.EveryServer_Command}**: Lists all Servers on the Panel\n`;
        staffCommands += `**${bot.settings.prefix}${pterodactyl.settings.CreateUser_Command}**: Creates a User on the Panel\n`;

    const embed = new Discord.RichEmbed()
        .setTitle(bot.settings.botname)
        .addField(":ticket: Support Commands", userCommands)
        .addField(":pushpin: Support Commands", supportCommands, true)
        .addField(":pushpin: Staff Commands", staffCommands, true)
        .setColor(bot.settings.colour)
        .setFooter(bot.settings.footer, message.author.displayAvatarURL);

	message.channel.send(embed)

    console.log(`\x1b[36m`, `${message.author} has executed ${bot.settings.prefix}${bot.settings.Help_Command}`)

    const CMDLog = new Discord.RichEmbed()
        .setTitle(bot.settings.Commands_Log_Title)
        .addField(`User`, `<@${message.author.id}>`)
        .addField(`Command`, bot.settings.Help_Command, true)
        .addField(`Channel`, message.channel, true)
        .addField(`Executed At`, message.createdAt, true)
        .setColor(bot.settings.colour)
        .setFooter(bot.settings.footer)

    let CommandLog = message.guild.channels.find(LogsChannel => LogsChannel.name === `${bot.settings.Command_Log_Channel}`);
    if(!CommandLog) return message.channel.send(`:x: Error! Could not find the logs channel. **${bot.settings.Command_Log_Channel}**\nThis can be changed via settings.json`);
    
    CommandLog.send(CMDLog);

}

exports.help = {
    name: bot.settings.Help_Command,
}
