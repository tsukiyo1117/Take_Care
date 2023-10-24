let app = new Vue({
    el: "#loginApp",
    data: {
        member: {
            Account: "",
            Password: "",
        }
    },
    methods: {
        DoLogin: function () {
            if(email.value==""||password.value==""){
                loginresult.innerText="請輸入帳號或密碼!!";
                return;
            }
            loginresult.innerText="";
            $.ajax({
                type: "POST",
                url: "https://localhost:7036/login/Dologin",
                contentType: "application/json",
                data: JSON.stringify(this.member),
                statusCode: {
                    500: function (response) {
                        console.log(response)
                    }
                },
                success: function (response) {
                    console.log("ok!");
                    if (response != "error!") {
                        //alert(response);
                        //console.log(response);
                        sessionStorage.setItem("member", JSON.stringify(response));
                        window.location = "https://localhost:7036/MainPage/Index";
                    } else {
                        alert("帳號或密碼錯誤!!");
                    }
                },
                error: function () {
                    console.log("error!");
                }
            })

        },
        startSignIn: function () {
            google.accounts.id.initialize({
                client_id: "914739974785-8gs50d9hgrdbk8s8mtuidoi3l31m91o2.apps.googleusercontent.com",
                callback: onSignIn3,
                prompt_parent_id: "GOOGLE_login" // 設定登入視窗的位置, 若不設定此參數則預設出現在網頁右上角
            });

            google.accounts.id.prompt((notification) => {
                // 如果無法彈出登入視窗 紀錄錯誤訊息
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    console.log(notification);
                }
            });

            // 處理登入取得的資訊
            function onSignIn3(response) {
                if (response != null) {
                    console.log(response);
                    var credential = response.credential,
                        profile = JSON.parse(decodeURIComponent(escape(window.atob(credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))));
                    var member = {
                        memberName: profile.name,
                        account: profile.email.split("@")[0],
                        password: profile.sub,
                        email: profile.email,
                        userType: "Employer"
                    };
                    sessionStorage.setItem("member", JSON.stringify(member));
                    console.log(member);
                    window.location = "https://localhost:7036/MainPage/Index";
                }
            }
        }
    }
})