$("#checkoutBtn").on('click', (e) => {
    //e.preventDefault(); //因為送出就跳轉到綠界，這個可以停住確認自己的console.log的內容
    let formData = $("#form").serializeArray();
    var json = {
        CaseId: 9999999,
        Amount: 300,
        ServiceName: "123"
    };
    $.each(formData, function () {
        json[this.name] = this.value || "";
    });
    console.log(json);
    //step3 : 新增訂單到資料庫
    $.ajax({
        type: 'POST',
        url: 'https://localhost:7036/ECPay/DoTestPay',
        // url: 'https://localhost:5154/api/AddOrders',
        //url:"https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        success: function (res) {
            console.log(res);
            const form = document.createElement('form');
            form.method = 'post';
            form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';//綠界金流驗證網址(測試環境)
            //form.target = "_blank";
            for (const key in res) {
                if (res.hasOwnProperty(key)) {
                    const hiddenField = document.createElement('input');
                    hiddenField.type = 'hidden';
                    hiddenField.name = key;
                    hiddenField.value = res[key];
                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit();
        },
        error: function (err) {
            console.log(err);
        },
    });
});