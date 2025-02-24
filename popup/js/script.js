document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('img_url').addEventListener('input', function(e) {
        const url = this.value;
        if (url.length < 1) {
            document.getElementById("img_sample").innerHTML = "";
            document.getElementById("message").textContent = "";
            document.getElementById("send").style = "cursor: not-allowed";
            return;
        }

        if (url.bytes() >= 8000) {
            document.getElementById('message').textContent = "URLが長すぎます(8KB以下の容量推奨:" + url.bytes() + "B)";
            document.getElementById("send").style = "cursor: not-allowed";
            return;
        }

        let imgElement = new Image();
        imgElement.alt = 'プレビュー';
        imgElement.width = 240;
        imgElement.onload = function() {
            document.getElementById('message').textContent = "参照先のプレビュー";
            document.getElementById('img_sample').innerHTML = '';
            document.getElementById('img_sample').appendChild(imgElement);
            document.getElementById("send").style = "";
        };

        imgElement.onerror = function() {
            document.getElementById('message').textContent = "画像が存在しません";
            document.getElementById('img_sample').innerHTML = '';
            document.getElementById("send").style = "cursor: not-allowed";
        };

        imgElement.src = url; // URLの設定を忘れずに追加
    });

    document.getElementById('send').addEventListener('click', async function() {
        const url = document.getElementById('img_url').value;

        if (url.bytes() > 8000) {
            document.getElementById('message').textContent = "URLが長すぎます(8KB以下の容量推奨:" + url.bytes() + "B)";
            return;
        }

        try {
            const imgExist = await checkImageExists(url);
            if (imgExist) {
                chrome.storage.sync.set({ "img_url": url });
                window.close();
            } else {
                alert("画像が存在しません");
            }
        } catch (error) {
            alert("エラーが発生しました: " + error.message);
        }
    });

    function checkImageExists(url) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    String.prototype.bytes = function() {
        return (encodeURIComponent(this).replace(/%../g, "x").length);
    };
});
