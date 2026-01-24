"use strict";
function sleep(ms) {
    // msミリ秒後に解決されるPromiseを返す
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * 背景画像の追加とメニュー欄の背景色に変更を加える関数です
 * @param {string} url 画像URL
 * @param {boolean} dark_mode ダークモードのon/off
 */
async function changeBackground(url, dark_mode) {
    console.log("変更を加えています\n画像URL: ");
    console.log(url);
    console.log("ダークモード:");
    console.log(dark_mode);
    // 背景画像の設定
    document.body.style.backgroundImage = 'url("' + url + '")'; // 背景画像URL
    document.body.style.backgroundPosition = 'center center'; // 背景位置
    document.body.style.backgroundRepeat = 'no-repeat'; // 背景の繰り返し
    document.body.style.backgroundAttachment = "fixed"; // 背景がスクロールで動くか(?)
    document.body.style.backgroundSize = "cover"; // 背景サイズ
    // ダークモード設定
    let backgroundColor, buttonDackgroundColor, border, filter;
    if (dark_mode) {
        backgroundColor = "#000000e0";
        buttonDackgroundColor = "#646464e0";
        border = "solid 3px #DDDDDD";
        document.body.style.color = "#ffffff";
        filter = "invert(100%)";
    }
    else {
        backgroundColor = "#ffffffe0";
        buttonDackgroundColor = "#ffffffe0";
        border = "solid 3px #222222";
        document.body.style.color = "#000000";
        filter = "";
    }
    // 各メニュー欄の背景色設定
    const elements = document.querySelectorAll(".l__item, .group, .m__header, .m__footer, .c__page-menu, .c__list-menu a,.c__list-menu .symbol, .-lv1, .modal-foot, .c__class-data");
    elements.forEach((element => element.style.backgroundColor = backgroundColor));
    const messageBox = document.getElementsByClassName("message");
    for (let i = 0; i < messageBox.length; i++) {
        messageBox[i].style.color = "#000000";
    }
    // アイコンの色反転
    const icons = document.getElementsByClassName("icon");
    for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        icon.style.filter = filter;
    }
    await sleep(200);
    // 一部ボタンの色変更
    const blacks = document.getElementsByClassName("e__btn");
    for (let i = 0; i < blacks.length; i++) {
        const element = blacks[i];
        element.style.border = border;
        element.style.backgroundColor = backgroundColor;
    }
    const inputTexts = document.getElementsByClassName("e__fld");
    for (let i = 0; i < inputTexts.length; i++) {
        const element = inputTexts[i];
        element.style.color = "#000000";
    }
    const buttonElements = document.querySelectorAll(".c__list-menu a, .close, .c__list-menu .symbol");
    buttonElements.forEach((element => element.style.backgroundColor = buttonDackgroundColor));
    setButtonEvent();
    console.log("変更が終了しました");
}
/**
 * chromeの同期ストレージからデータを取得し、chengeBackgroundImageへ画像URLを渡す関数です
 */
function load2Call() {
    // chromeの同期ストレージからデータを取得し、chengeBackgroundImageへ画像URLを渡す
    chrome.storage.sync.get(["img_url", "dark_mode"], function (data) {
        const url = data["img_url"];
        const dark_mode = data["dark_mode"];
        changeBackground(url, dark_mode);
    });
}
async function setButtonEvent() {
    while (!document.getElementById('eye-form-status-button')) {
        await sleep(5);
    }
    document.getElementById('eye-form-status-button').addEventListener('click', load2Call);
}
window.addEventListener('load', load2Call);
chrome.storage.onChanged.addListener(function () {
    load2Call();
});
