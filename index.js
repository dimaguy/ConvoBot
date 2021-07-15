const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

function newQuestion() {
    const randomNumber = Math.floor(Math.random() * (config.questions.length));
    return config.questions[randomNumber];
}

client.once('ready', () => {
    const clientdata = client.toJSON();
	console.info(`Ready!\nInvite me with: https://discord.com/oauth2/authorize?client_id=${clientdata.user}&scope=bot+applications.commands`);
});

//Not creating a command handler for such a simple bot
client.on('message', (message) => {
    if (message.content === `${config.prefix}help`) {
		const HelpEmbed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription("Here's a list of commands")
        .addFields(
            { name: '/ping', value: 'Pong!', inline: true },
            { name: '/invite', value: "Generates ConvoBot's Invite Link", inline: true },
            { name: '/question', value: 'Generates a random question', inline: true }
        )
        message.channel.send(HelpEmbed);
    } else if (message.content === `${config.prefix}ping`) {
        message.channel.send('Pong.');
    } else if (message.content === `${config.prefix}invite`) {
        const clientdata = client.toJSON();
        const ReplyEmbed = new Discord.MessageEmbed()
		.setTitle("ConvoBot's Invite Link")
		.setDescription(`You can invite me to your server using this link:\nhttps://discord.com/oauth2/authorize?client_id=${clientdata.user}&scope=bot+applications.commands`)
	    .setTimestamp()
        .setFooter(`This command was requested by ${message.member.user.tag}`);
        console.info(`Replied to ${message.member.user.tag} with an invite link`);
	    message.channel.send(ReplyEmbed);
	} else if (message.content === `${config.prefix}question`) {
        const Question = newQuestion();
        const QuestionEmbed = new Discord.MessageEmbed()
		.setTitle('Random Question')
		.setDescription(`${Question}`)
	    .setTimestamp()
        .setFooter(`This command was requested by ${message.member.user.tag}`);
        console.info(`Replied to ${message.member.user.tag} with: "${Question}"`);
		message.channel.send(QuestionEmbed);
	}
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(config.token);