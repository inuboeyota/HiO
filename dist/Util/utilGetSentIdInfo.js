/**
 * Util系：
 * Messageを受け取った際に、そのGuild, Channel, User, RoleのIDを配列かつオブジェクトとして返却する
 * @returns Guild, Channel, User, RoleのIDを配列かつオブジェクトとして返却する
 */
export async function utilGetSentIdInfo(message) {
    // TODO: messageからguildIdを取得する
    // オブジェクトに格納するための配列変数を定義
    // 単一で返却されるIDの取得
    const guildId = message.guildId;
    const guildIdAry = [guildId];
    const channelId = message.channelId;
    const channelIdAry = [channelId];
    // Role情報を取得する
    // fetchして最新のUser/Member情報を取得する
    const userRoles = (await message.member.fetch()).roles;
    const userRolesAry = userRoles.cache.map(role => role.id) ?? [];
    // user情報を取得したい
    const userId = message.member?.id;
    const userIdAry = [userId];
    // オブジェクトを完成
    const sentIdInfoObj = {
        guildId: guildIdAry,
        channelId: channelIdAry,
        roleId: userRolesAry,
        userId: userIdAry
    };
    return sentIdInfoObj;
}
