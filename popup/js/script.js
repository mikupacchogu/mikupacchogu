document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('img_url').addEventListener('input', function(e) {
        if (this.value.bytes() <= 8000) {
            document.getElementById('output').textContent = "参照先のプレビュー";
        } else {
            document.getElementById('output').textContent = "URLが長すぎます(8KB以下の容量推奨:".concat(this.value.bytes(), "B)");
        }
        let img = document.createElement('img');
        img.setAttribute('alt', 'プレビュー');
        img.setAttribute('src', this.value);
        img.setAttribute('width', '240px');
        document.getElementById('output2').innerHTML = '';
        document.getElementById('output2').appendChild(img);
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
