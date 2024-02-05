import plugin from '../../../lib/plugins/plugin.js';

export class bgh extends plugin {

    constructor() {
        super({
            name: 'Better Gacha Help',
            dsc: '更好的抽卡链接获取帮助',
            event: 'message',
            priority: -114514,
            rule: [
                {
                    reg: '#抽卡帮助|记录帮助',
                    fnc: 'help'
                },
            ]
        });
    }

    async help(e) {
        let helpMsg =
            "0. 准备好米游社APP。\n" +
            "1. 在群里，或者私聊机器人，发送【#扫码登录】指令。\n" +
            "2. 使用米游社扫码登录（扫机器人发送的二维码）。\n" +
            "3. 发送【#更新抽卡记录】同步最近180天抽卡记录，若提瓦特小助手有180天前的记录，可以【更新小助手记录】获取同步。\n"+
            "4. 注意：只能使用该方法自动更新原神抽卡记录，星铁抽卡记录需要手动抓包获取抽卡链接后，发送给机器人。"
        await this.reply(helpMsg);
        return true;
    }
}


