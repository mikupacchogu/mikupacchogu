interface StorageData {
    [index: string]: string | boolean
}

function sleep(ms: number): Promise<void> {
    // msミリ秒後に解決されるPromiseを返す
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 背景画像の追加とメニュー欄の背景色に変更を加える関数です
 * @param {string} url 画像URL
 * @param {boolean} dark_mode ダークモードのon/off
 */
async function changeBackground(url: string, dark_mode: boolean) {
    console.log("変更を加えています\n画像URL: ");
    console.log(url);
    console.log("ダークモード:");
    console.log(dark_mode)

    // 背景画像の設定
    document.body.style.backgroundImage = 'url("' + url + '")'; // 背景画像URL
    document.body.style.backgroundPosition = 'center center'; // 背景位置
    document.body.style.backgroundRepeat = 'no-repeat'; // 背景の繰り返し
    document.body.style.backgroundAttachment = "fixed"; // 背景がスクロールで動くか(?)
    document.body.style.backgroundSize = "cover"; // 背景サイズ

    // ダークモード設定
    let backgroundColor;
    if (dark_mode) {
        backgroundColor = "#000000e0"
        document.body.style.color = "#ffffff"
    } else {
        backgroundColor = "#ffffffe0"
        document.body.style.color = "#000000"
    }

    // 各メニュー欄の背景色設定
    const elements: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".l__item, .group, .m__header, .m__footer, .c__list-menu a,.c__list-menu .symbol") as NodeListOf<HTMLParagraphElement>;
    elements.forEach((element => element.style.backgroundColor = backgroundColor));

    const messageBox = document.getElementsByClassName("message")
    for (let i = 0; i < messageBox.length; i++) {
        (messageBox[i] as HTMLParagraphElement).style.color = "#000000"
    }

    await sleep(200);

    // 一部ボタンの色変更
    const blacks = document.getElementsByClassName("e__btn")
    for (let i = 0; i < blacks.length; i++) {
        const element = blacks[i] as HTMLParagraphElement
        element.style.border = "solid 3px #DDDDDD"
        element.style.backgroundColor = backgroundColor
    }

    const inputTexts = document.getElementsByClassName("e__fld");
    for (let i = 0; i < inputTexts.length; i++) {
        const element = inputTexts[i] as HTMLParagraphElement;
        element.style.color = "#000000";
    }

    setButtonEvent()

    console.log("変更が終了しました");
}

/**
 * chromeの同期ストレージからデータを取得し、chengeBackgroundImageへ画像URLを渡す関数です
 */
function load2Call() {
    // chromeの同期ストレージからデータを取得し、chengeBackgroundImageへ画像URLを渡す
    chrome.storage.sync.get(["img_url", "dark_mode"], function (data: StorageData) {
        const url = data["img_url"] as string;
        const dark_mode = data["dark_mode"] as boolean;
        changeBackground(url, dark_mode);
    });
}

async function setButtonEvent() {
    while (!document.getElementById('eye-form-status-button')) {
        await sleep(5)
    }
    document.getElementById('eye-form-status-button')!.addEventListener('click', load2Call);
}

window.addEventListener('load', load2Call);
chrome.storage.onChanged.addListener(function () {
    load2Call();
});