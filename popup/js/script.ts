/// <reference path="../../lib/jquery.d.ts" />

// リアルタイムでURLのプレビューを表示する
$(function (): void {
    $(document).on('input', '#img_url', function (e): void {
        $('#output').text(`参照先のプレビュー`);
        $('#output2').wrapInner(`<img alt="プレビュー" src="${$('#img_url').val()}" width="240px">`)
    });
});

$('#send').on('click', function() :void{
    chrome.storage.sync.set({"img_url":$('#img_url').val()})
    window.close();
})