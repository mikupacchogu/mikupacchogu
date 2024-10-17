chrome.runtime.onInstalled.addListener(function (details: object): function {
    // インストール時の挙動
    if (details.reason === "install") {

        let defaultSettings = {
            "img_url": ""
        };

        chrome.storage.sync.set(defaultSettings, function () {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log("Initial settings set.");
            }
        });
    }
});