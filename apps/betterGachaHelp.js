import plugin from '../../../lib/plugins/plugin.js';

export class bgh extends plugin {

    constructor() {
        super({
            name: 'Better Gacha Help',
            dsc: '更好的抽卡帮助',
            event: 'message',
            priority: -114514,
            rule: [
                {
                    reg: '#抽卡帮助',
                    fnc: 'help'
                },
            ]
        });
    }

    async help(e) {
        let helpMsg =
            "0. 准备好米游社APP(在你的手机里)，请先阅读完本帮助后，再进行操作。\n" +
            "1. 在群里，或者私聊机器人，发送【#扫码登录】指令。\n" +
            "2. 若你使用的是手机QQ发送的扫码指令，请务必在机器人发送登录二维码后，保存二维码图片。\n" +
            "3. 若你使用的是电脑QQ发送的扫码指令，请迅速执行扫码登录操作，也可以保存二维码图片后操作。\n" +
            "4. 使用米游社扫码登录。(方法：打开米游社后。点击右小角“我的”，然后左上角扫码图标，手机扫电脑，或点击右上角相册扫码)\n" +
            "5. 确认登录。\n" +
            "6. 若不愿意绑定米游社ck，请手动获取抽卡链接后，发送给机器人。(手动获取教程，请上网搜索，此处不做教程)";
        await this.reply(helpMsg);
        return true;
    }
}


