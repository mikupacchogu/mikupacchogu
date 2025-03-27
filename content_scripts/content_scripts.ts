interface StorageData {
    [index: string]: string
}

function changeBackgroundImage(url: string): void {
    console.log("変更を加えています\n画像URL: ");
    console.log(url);

    // 背景画像の設定
    document.body.style.backgroundImage = 'url("' + url + '")'; // 背景画像URL
    document.body.style.backgroundPosition = 'center center'; // 背景位置
    document.body.style.backgroundRepeat = 'no-repeat'; // 背景の繰り返し
    document.body.style.backgroundAttachment = "fixed"; // 背景がスクロールで動くか(?)
    document.body.style.backgroundSize = "cover"; // 背景サイズ

    // 各メニュー欄の背景色設定
    let elements: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".l__item, .group, .m__header, .m__footer") as NodeListOf<HTMLParagraphElement>;
    elements.forEach((element => element.style.backgroundColor = "#ffffffe0"));

    console.log("変更が終了しました");
}


function load2Call(): void {
    // chromeの同期ストレージからデータを取得し、chengeBackgroundImageへ画像URLを渡す
    chrome.storage.sync.get("img_url", function (data: StorageData) {
        let url: string = data["img_url"];
        changeBackgroundImage(url);
    });
}

window.addEventListener('load', load2Call);
chrome.storage.onChanged.addListener(function () {
    load2Call();
});