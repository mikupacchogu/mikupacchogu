/// <reference path="lib/jquery.d.ts" />

// content_scripts.js内部のscriptを記述

function changeBackgroundImage(url: string): void {
    console.log("変更を加えています");
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
}

$(document).ready(function () {
    const url: string = "https://pbs.twimg.com/media/GMoZoCJacAA6WZ1?format=jpg&name=4096x4096";
    changeBackgroundImage(url);
});