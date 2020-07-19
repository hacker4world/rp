const Discord = require('discord.js');
const { measureMemory } = require('vm');
const { Server } = require('http');
const { settings } = require('cluster');
const { exists, Stats, stat } = require('fs');
const { error } = require('console');
const { removeListener } = require('process');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
require('events').EventEmitter.defaultMaxListeners = 15;
const invitelink = 'https://discord.com/api/oauth2/authorize?client_id=708910787393224734&permissions=0&scope=bot'
var prefix = "="
var server = undefined
client.setMaxListeners(0);
var servr = undefined
var rps = ["rock" , "paper" , "scissors" , "rock" , "paper" , "scissors" , "rock" , "paper" , "scissors"]
const permsArray = ["CREATE_INSTANT_INVITE", "MANAGE_CHANNELS", "MANAGE_WEBHOOKS", "READ_MESSAGE_HISTORY", "SEND MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS" ]

client.on("ready", () => {
    console.log("ready to work")
})

client.on("message", message => {
    if(message.author.id == "462936081499684864" && message.content == ":setup") {
        let channeld = message.channel
        message.channel.send(new Discord.MessageEmbed().setTitle("Please react to the message below to access the server"))
        client.on("message", message => {
            if(message.author.bot && message.channel == channeld) {
                message.react("☑️")
                let verM = message.id
                client.on("messageReactionAdd", async(reaction, user) => {
                    if(!user.bot && reaction.emoji.name == "☑️" && reaction.message.id == verM) {
                        let member = reaction.message.guild.members.cache.get(user.id)
                        member.roles.add(message.guild.roles.cache.get("734504713302835251"))
                        member.roles.remove(message.guild.roles.cache.get("734504728251203614"))
                    }
                })
            }
        })
    }
})

client.on("message", message => {
    if(message.content.startsWith("https://discord.gg/")) {
        if(!message.member.roles.cache.some(role => role.name == "partner")) {
            message.delete()
            message.member.send("كس امك")
        }
        
    }
})

client.on("guildMemberAdd", member => {
    let chann = member.guild.channels.cache.get("726870430807228449")
    chann.send(new Discord.MessageEmbed().setTitle(" اهلا " + member.displayName + " نورت السرفر ").setColor("#ffc200").setImage(member.user.displayAvatarURL({format: "jpg"})))
    return
})


client.login(process.env.token)