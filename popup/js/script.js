/// <reference path="../../lib/jquery.d.ts" />
// リアルタイムでURLのプレビューを表示する
$(function () {
    $(document).on('input', '#img_url', function (e) {
        if ($('#img_url').val().bytes() < 8000) {
            $('#output').text("\u53C2\u7167\u5148\u306E\u30D7\u30EC\u30D3\u30E5\u30FC");
        }
        else {
            $('#output').text("URL\u304C\u9577\u3059\u304E\u307E\u3059(8KB\u4EE5\u4E0B\u306E\u307F:\u73FE\u5728\u306E\u5BB9\u91CF\u7D04".concat($('#img_url').val().bytes(), "B)"));
        }
        $('#output2').wrapInner("<img alt=\"\u30D7\u30EC\u30D3\u30E5\u30FC\" src=\"".concat($('#img_url').val(), "\" width=\"240px\">"));
    });
});
$('#send').on('click', function () {
    if ($('#img_url').val().bytes() <= 8000) {
        chrome.storage.sync.set({ "img_url": $('#img_url').val() });
        window.close();
    }
});
String.prototype.bytes = function () {
    return (encodeURIComponent(this).replace(/%../g, "x").length);
};
