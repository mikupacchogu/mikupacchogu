/// <reference path="../../lib/jquery.d.ts" />

// リアルタイムでURLのプレビューを表示する
$(function (): void {
    $(document).on('input', '#img_url', function (e): void {
        if ($('#img_url').val().bytes() < 8000) {
            $('#output').text(`参照先のプレビュー`);
        } else {
            $('#output').text(`URLが長すぎます(8KB以下のみ:現在の容量約${$('#img_url').val().bytes()}B)`);
        }
        $('#output2').wrapInner(`<img alt="プレビュー" src="${$('#img_url').val()}" width="240px">`)
    });
});

$('#send').on('click', function (): void {
    if ($('#img_url').val().bytes() <= 8000) {
        chrome.storage.sync.set({ "img_url": $('#img_url').val() })
        window.close();
    }
})

String.prototype.bytes = function (): number {
    return (encodeURIComponent(this).replace(/%../g, "x").length);
}