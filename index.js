"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const loaCommands_1 = require("./loaCommands");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ]
});
const guildId = '743106884890001408';
const loaChannelId = '941499381415292948';
const loaReqChannelId = '941499381415292948';
client.on('ready', () => {
    console.log('The bot is Loaded');
    (0, loaCommands_1.onReady)(client);
    const guild = client.guilds.cache.get(guildId);
    let commands;
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = client.application?.commands;
    }
    commands?.create({
        name: 'ping',
        description: 'Replies With Pong',
    });
    commands?.create({
        name: 'loa',
        description: "Creates an Loa with a desc and length",
        options: [
            {
                name: 'desc',
                description: 'Description of why',
                required: true,
                type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'length',
                description: 'Length, eg. 1w is one week. d = day, w = week, m = month. 1m1w is one month one week',
                required: true,
                type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    });
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    switch (commandName) {
        case 'ping':
            interaction.reply({
                content: 'pong',
                ephemeral: true
            });
            break;
        case 'loa':
            await interaction.deferReply({
                ephemeral: true
            });
            (0, loaCommands_1.createLoa)(interaction, options);
            break;
    }
});
client.login(process.env.TOKEN);
