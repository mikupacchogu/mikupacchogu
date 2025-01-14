function changeBackgroundImage(url) {
    console.log("変更を加えています\n画像URL");
    console.log(url);
    // 背景画像の設定
    document.body.style.backgroundImage = "url('" + url + "')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    // 各メニュー欄の背景色設定
    let elements = document.querySelectorAll(".l__item, .group, .m__header, .m__footer");
    elements.forEach((element => element.style.backgroundColor = "#ffffffe0"));
    console.log("変更が終了しました");
}
function load2Call() {
    chrome.storage.sync.get("img_url", function (data) {
        let url = data["img_url"];
        changeBackgroundImage(url);
    });
}
window.addEventListener('load', load2Call);
chrome.storage.onChanged.addListener(function () {
    load2Call();
});
