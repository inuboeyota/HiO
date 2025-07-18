import { ChatInputCommandInteraction, Message } from "discord.js";
import { MessageCommand } from "../../types/command.js";


/**
 * ピンを送る
 */
export default class ping implements MessageCommand {

  name:string = 'ping'
  prefix:string = '!ping'

  execute = pingCmd
}

async function pingCmd(ctx:Message):Promise<void> {
  ctx.reply("pong!");
}