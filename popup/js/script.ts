interface String {
    bytes(): number;
    isOverByteLimit(byteLimit: number): boolean;
}
interface StorageData {
    [index: string]: string
}

const BYTE_LIMIT: number = 8000;

document.addEventListener('DOMContentLoaded', function () {
    // 最初にpopupを表示するときに現在設定されている画像をプレビュー表示する
    chrome.storage.sync.get("img_url", function (data: StorageData) {
        const url: string = data["img_url"];
        if (url === "") {
            return;
        }

        setPreviewImage("現在設定中の画像", url)
    });
    // 画像URL入力受付～プレビューまでを行う
    document.getElementById('img_url')!.addEventListener('input', function (e) {
        const url: string = (this as HTMLInputElement).value;

        // 入力がない場合対応する各IDの持つデータをリセットする
        if (url.length < 1) {
            document.getElementById("img_sumple")!.innerHTML = "";
            document.getElementById("message")!.textContent = "";
            // 以下の文はjsでは.styleに代入していたが場所を変更した
            document.getElementById("send")!.style.cssText = "coursor: not-allowed"
            return;
        }

        if (url.isOverByteLimit(BYTE_LIMIT)) {
            document.getElementById('message')!.textContent = "URLが長すぎます(8KB以下の容量推奨:" + url.bytes() + "B)";
            document.getElementById("send")!.style.cssText = "cursor: not-allowed";
            return;
        }

        setPreviewImage("参照先のプレビュー", url)
    });

    document.getElementById('send')!.addEventListener('click', async function () {
        const url: string = (document.getElementById('img_url')! as HTMLInputElement).value;

        if (url.isOverByteLimit(BYTE_LIMIT)) {
            document.getElementById('message')!.textContent = "URLが長すぎます(8KB以下の容量推奨:" + url.bytes() + "B)"
            return;
        }

        try {
            const imgExist: boolean = await checkImageExists(url);
            if (imgExist) {
                chrome.storage.sync.set({ "img_url": url });
                window.close();
            } else {
                alert("画像が存在しません");
            }
        } catch (error: any) {
            alert("エラーが発生しました: " + error.message);
        }
    });

    /**
     * 画像URLのリンク先が存在しているか判定します
     * @param {string} url 画像URL 
     * @returns {Promise<boolean>}
     */
    function checkImageExists(url: string): Promise<boolean> {
        return new Promise((resolve) => {
            let img: HTMLImageElement = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * プレビュー画像を設定します
     * @param {string} message 画像の上に表示するメッセージ
     * @param {string} url 画像URL 
     */
    function setPreviewImage(message: string, url: string) {
        let imgElement = new Image();
        imgElement.alt = 'プレビュー';
        imgElement.width = 240;
        imgElement.onload = function () {
            document.getElementById('message')!.textContent = message;
            document.getElementById('img_sample')!.innerHTML = '';
            document.getElementById('img_sample')!.appendChild(imgElement);
            document.getElementById("send")!.style.cssText = "";
        };

        imgElement.onerror = function () {
            document.getElementById('message')!.textContent = "画像が存在しません";
            document.getElementById('img_sample')!.innerHTML = '';
            document.getElementById("send")!.style.cssText = "cursor: not-allowed";
        };

        imgElement.src = url; // URLの設定を忘れずに追加
    };

    // 文字列のバイト数を返すプロパティを作成
    String.prototype.bytes = function (): number {
        return (encodeURIComponent((this as string)).replace(/%../g, "x").length);
    };

    // 文字列のバイト数が与えられたリミットを超えているか判定するプロパティを作成
    String.prototype.isOverByteLimit = function (byteLimit: number): boolean {
        return this.bytes() > byteLimit
    };
});