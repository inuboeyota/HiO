"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// NODE_ENVを取得（デフォルトは'production'）
const env = process.env.NODE_ENV || 'production';
// 対応する.envファイルを読み込む
dotenv_1.default.config({ path: path_1.default.resolve('./', `.env.${env}`) });
console.log(`現在使用している環境は： .env.${env} です。`);
// Botで使用するGatewayIntents, Partials
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.GuildWebhooks,
        discord_js_1.GatewayIntentBits.GuildInvites,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        discord_js_1.Partials.User,
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.GuildMember,
        discord_js_1.Partials.Message,
        discord_js_1.Partials.Reaction,
        discord_js_1.Partials.GuildScheduledEvent,
        discord_js_1.Partials.ThreadMember,
    ],
}); //clientインスタンスを作成する
client.once('ready', () => {
    console.log(`READY:[${process.env.BOT_NAME}]`);
    if (client.user) {
        console.log(client.user.tag);
        // 送信先のユーザーID
        const adminUserId = process.env.ADMIN_USER;
        client.users.fetch(adminUserId).then(user => {
            // 起動確認msg
            user.send('起動したよ');
        });
    }
});
client.login(process.env.TOKEN); //ログインする
