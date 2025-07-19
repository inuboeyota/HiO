import { Message } from "discord.js";
import { TriggerClassPair } from "../../types/command.js";

export async function messageCommandPermission(message:Message, msgLoadedCommands:TriggerClassPair):Promise<boolean> {

  // prefix部分を抜粋する
  const prefix:string = message.content.replace("　", " ").split(' ')[0]

  // 発言者の情報を取得する
  return true;
}