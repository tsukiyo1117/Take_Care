function startSignIn() {
    google.accounts.id.initialize({
        client_id: "887988272125-1s1ph9bhc89j27167sfnihv98t0s59hn.apps.googleusercontent.com",
        callback: onSignIn3,
        prompt_parent_id: "GOOGLE_login" // 設定登入視窗的位置, 若不設定此參數則預設出現在網頁右上角
    });

    google.accounts.id.prompt((notification) => {
        // 如果無法彈出登入視窗 紀錄錯誤訊息
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log(notification);
        }
    });
}

// 處理登入取得的資訊
function onSignIn3(response) {
    var credential = response.credential,
        profile = JSON.parse(decodeURIComponent(escape(window.atob(credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))))),
        $target = $("#GOOGLE_STATUS_3"),
        html = "";

    html += "ID: " + profile.sub + "<br/>";
    html += "會員暱稱： " + profile.name + "<br/>";
    html += "會員頭像：" + profile.picture + "<br/>";
    html += "會員 email：" + profile.email + "<br/>";
    $target.html(html);
}

// 點擊登入
$("#GOOGLE_login").click(function () {
    // 進行登入程序
    console.log("OK");
    startSignIn();
});

// 點擊登出
$("#GOOGLE_logout").click(function () {
    google.accounts.id.disableAutoSelect();

    // 登出後的動作
    $("#GOOGLE_STATUS_3").html("已登出");
});