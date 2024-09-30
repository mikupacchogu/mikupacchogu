/// <reference path="../../lib/jquery.d.ts" />
// リアルタイムでURLのプレビューを表示する
$(function () {
    $(document).on('input', '#img_url', function (e) {
        $('#output').text("\u53C2\u7167\u5148\u306E\u30D7\u30EC\u30D3\u30E5\u30FC");
        $('#output2').wrapInner("<img alt=\"\u30D7\u30EC\u30D3\u30E5\u30FC\" src=\"".concat($('#img_url').val(), "\" width=\"240px\">"));
    });
});
$('#send').on('click', function () {
    chrome.storage.sync.set({ "img_url": $('#img_url').val() });
    window.close();
});
