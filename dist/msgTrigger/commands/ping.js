/**
 * ピンを送る
 */
export default class ping {
    name = 'ping';
    prefix = '!ping';
    execute = pingCmd;
}
async function pingCmd(ctx) {
    ctx.reply("pong!");
}
