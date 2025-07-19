import { utilGetSentIdInfo } from "../../Util/utilGetSentIdInfo.js";
import { PrismaClient } from "@prisma/client";
/**
 * テスト用のメソッドを入れていく
 */
export default class testYou {
    name = 'testYou';
    prefix = '!testYou';
    execute = testYouCmd;
}
async function testYouCmd(ctx) {
    // テスト：メッセージが送信された時点でのpermissionで使用するIDの取得
    console.log(await utilGetSentIdInfo(ctx));
    // テスト：prismaの仕組み理解
    const prisma = new PrismaClient();
    // pocから取得
    const allPocs = await prisma.poc_table.findMany();
    console.log(allPocs);
}
