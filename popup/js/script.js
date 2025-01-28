document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('img_url').addEventListener('input', function(e) {
        if (this.value.bytes() <= 8000) {
            document.getElementById('message').textContent = "参照先のプレビュー";
        } else {
            document.getElementById('message').textContent = "URLが長すぎます(8KB以下の容量推奨:".concat(this.value.bytes(), "B)");
        }
        let imgElement = document.createElement('img');
        imgElement.setAttribute('alt', 'プレビュー');
        imgElement.setAttribute('src', this.value);
        imgElement.setAttribute('width', '240px');
        document.getElementById('img_sample').innerHTML = '';
        document.getElementById('img_sample').appendChild(imgElement);
    });

    document.getElementById('send').addEventListener('click', function() {
        if (document.getElementById('img_url').value.bytes() <= 8000) {
            chrome.storage.sync.set({ "img_url": document.getElementById('img_url').value });
            window.close();
        }
    });

    String.prototype.bytes = function() {
        return (encodeURIComponent(this).replace(/%../g, "x").length);
    };
});
