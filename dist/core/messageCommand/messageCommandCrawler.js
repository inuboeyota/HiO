import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";
/**
 * prefixで実行するコマンドについて、botの起動時に一度だけ、クラスをインスタンス化して保持しておく
 * @returns クラス名とクラスの実体のペアを返却する
 */
export default async function messageCommandCrawler() {
    // ディレクトリを指定
    const msgDir = path.resolve(import.meta.dirname, '../../msgTrigger/commands/');
    const decodedMsgDir = decodeURIComponent(msgDir.toString());
    // ファイルを取得
    const msgFiles = fs.readdirSync(decodedMsgDir).filter(file => {
        const isJSfile = file.endsWith('js');
        const isTSfile = file.endsWith('ts');
        return isJSfile || isTSfile;
    });
    // returnするオブジェクト
    const returnMessageInstance = {};
    for (const file of msgFiles) {
        const filePath = path.join(decodedMsgDir, file);
        // FIXME:ここだ！！！！！！！！！！！ここがcommonjsの書き方だから！？かも！
        const module = await import(pathToFileURL(filePath).href);
        // エクスポートされたクラスをインスタンス化する
        if (module.default) {
            const CommandClass = module.default;
            const instance = new CommandClass();
            returnMessageInstance[instance.name] = instance;
        }
    }
    return returnMessageInstance;
}
