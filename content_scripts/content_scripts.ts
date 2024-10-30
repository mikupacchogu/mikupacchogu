/// <reference path="lib/jquery.d.ts" />

// content_scripts.js内部のscriptを記述

function changeBackgroundImage(url: string): void {
    console.log("変更を加えています\n画像URL");
    console.log(url)
    // 背景画像の設定
    $("body").css({
        "background-image": `url(${url})`,
        "background-position": "center center",
        "background-repeat": "no-repeat",
        "background-attachment": "fixed",
        "background-size": "cover",
    });

    // 各メニュー欄の背景色設定
    $(".l__item, .group, .m__header, .m__footer").css({
        "background-color": "#ffffffe0"
    })
    console.log("変更が終了しました")
}

function load2Call(): void {
    chrome.storage.sync.get("img_url", (data: { [key: string]: string }) => {
        const url: string = data["img_url"];
        changeBackgroundImage(url);
    });
}

$(document).ready(function () {
    load2Call()
});

chrome.storage.onChanged.addListener(function (): void {
    load2Call()
});