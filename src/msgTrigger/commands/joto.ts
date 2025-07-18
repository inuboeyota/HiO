import { ChatInputCommandInteraction, Message } from "discord.js";
import { MessageCommand } from "../../types/command.js";


/**
 * テスト用
 */
export default class joto implements MessageCommand {

  name:string = 'joto'
  prefix:string = '!joto'

  execute = jotoCmd
}

async function jotoCmd(ctx:Message):Promise<void> {
  ctx.reply("いやああああああああああああああああああああああああああああああああ");
}