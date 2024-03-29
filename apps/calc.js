import plugin from '../../../lib/plugins/plugin.js';

export class calc extends plugin {
    constructor() {
        super({
            name: '计算器',
            dsc: '加减乘除计算器',
            event: 'message',
            priority: 1000,
            rule: [
                {
                    reg: '^[0-9\(\)\（\）\%]+(:?[\\+\\-\\*\\x\\/\\÷\(\)\（\）\.][0-9\(\)\（\）\%]+)+$',
                    fnc: 'calc'
                }
            ]
        });
    }

    async calc() {
        let emsg = this.e.msg.replace(/#|＃|计算|=/g, "");
        emsg = emsg.replace(/[\（]/g, "(").replace(/[\）]/g, ")").replace("%", "/100").replace("÷", "/").replace("x", "*").replace(/“|”/g, "\"");
        let res;
        try {
            if (!emsg.match(/[a-zA-Z]/g) || this.e.isMaster) {
                if (!emsg.match(/[\(\)\*\/]/g)) {
                    res = jisuan(emsg);
                } else {
                    res = eval(emsg);
                }
            } else {
                await this.e.reply("含有非法字符，无法计算");
                return true;
            }
        } catch (errorall) {
            await this.e.reply(errorall.toString());
            return true;
        }
        if (res === emsg) {
            return true;
        }

        await this.e.reply(`计算结果：${JSON.stringify(res)}`);

        return true;
    }
}

function jisuan(emsg) {
    var preNum = "";
    var nextNum = "";
    var str = "";
    for (let i = 0; i < emsg.length; i++) {
        if (emsg[i] !== "+" && emsg[i] !== "-") {
            nextNum = nextNum + "" + emsg[i];
        } else if (preNum !== "") {
            if (str === "+") {
                preNum = accAdd(preNum, nextNum);
            } else {
                preNum = accSub(preNum, nextNum);
            }
            str = emsg[i];
            nextNum = "";
        } else {
            preNum = nextNum;
            nextNum = "";
            str = emsg[i];
        }
    }
    if (preNum === "") {
        preNum = nextNum;
    } else {
        if (str === "+") {
            preNum = accAdd(preNum, nextNum);
        } else {
            preNum = accSub(preNum, nextNum);
        }
    }
    return preNum;
}


/**
 * 数字相加
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
function accAdd(arg1, arg2) {
    return changeNum(arg1, arg2);
}

/**
 * 数字相减
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
function accSub(arg1, arg2) {
    return changeNum(arg1, arg2, false);
}

/**
 * 数字相乘
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
function accMul(arg1, arg2) {
    let m = 0;
    m = accAdd(m, getDecimalLength(arg1));
    m = accAdd(m, getDecimalLength(arg2));
    return getNum(arg1) * getNum(arg2) / Math.pow(10, m);
}

/**
 * 数字相除
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
function accDiv(arg1, arg2) {
    let t1, t2;
    t1 = getDecimalLength(arg1);
    t2 = getDecimalLength(arg2);
    if (t1 - t2 > 0) {
        return (getNum(arg1) / getNum(arg2)) / Math.pow(10, t1 - t2);
    } else {
        return (getNum(arg1) / getNum(arg2)) * Math.pow(10, t2 - t1);
    }
}

function changeNum(arg1 = '', arg2 = '', isAdd = true) {
    function changeInteger(arg, r, maxR) {
        if (r != maxR) {
            let addZero = '';
            for (let i = 0; i < maxR - r; i++) {
                addZero += '0';
            }
            arg = Number(arg.toString().replace('.', '') + addZero);
        } else {
            arg = getNum(arg);
        }
        return arg;
    }

    let r1, r2, maxR, m;
    r1 = getDecimalLength(arg1);
    r2 = getDecimalLength(arg2);
    maxR = Math.max(r1, r2);
    arg1 = changeInteger(arg1, r1, maxR);
    arg2 = changeInteger(arg2, r2, maxR);
    m = Math.pow(10, maxR);
    if (isAdd) {
        return (arg1 + arg2) / m;
    } else {
        return (arg1 - arg2) / m;
    }
}

function getDecimalLength(arg = '') {
    try {
        return arg.toString().split(".")[1].length;
    } catch (e) {
        return 0;
    }
}

function getNum(arg = '') {
    return Number(arg.toString().replace(".", ""));
}
