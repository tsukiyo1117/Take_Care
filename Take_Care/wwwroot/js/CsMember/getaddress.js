
$(document).ready(function() {
    // 监听 "同上" 复选框的变化事件
    $('#isSameAddress').change(function() {
        if ($(this).is(':checked')) {
            // 获取戶籍地址的值
            var residenceCounty = $('#twzipcode2 [data-name="county"] option:selected').text();
            var residenceDistrict = $('#twzipcode2 [data-name="district"] option:selected').text();
            var residenceZipcode = $('#twzipcode2 input[name="zipcode"]').val();
            var residenceAddress = $('#inputAddress2').val();

            // 将戶籍地址的值复制到通讯地址
            $('#twzipcode3 [data-role="county"] option:selected').text(residenceCounty);
            $('#twzipcode3 [data-role="district"] option:selected').text(residenceDistrict);
            $('#twzipcode3 input[name="zipcode"]').val(residenceZipcode);
            $('#inputAddress3').val(residenceAddress);
        } else {
            // 如果 "同上" 复选框未被选中，可以在这里实现其他逻辑，或者保持原样
            $('#twzipcode3 [data-role="county"] option:selected').text("縣市");
            $('#twzipcode3 [data-role="district"] option:selected').text("鄉鎮市區");
            $('#twzipcode3 input[name="zipcode"]').val("");
            $('#inputAddress3').val("");
        }
    });
});
