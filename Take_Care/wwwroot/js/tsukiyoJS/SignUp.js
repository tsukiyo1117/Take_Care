let MailCode = "";
let emailregex = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
let passregex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/);
let cpassregex = new RegExp();
let phoneregex = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/);
let app = new Vue({
    el: "#SignUpapp",
    data: {
        Employer: {
            // account: "",
            "email": "",
            // fullName: "",
            // gender: "",
            // password: "",
            // phoneNumber: ""
        },
    },
    methods: {
        createMember: function () {
            if (passresult.innerText!=""||cpassresult.innerText!=""||nameresult.innerText!=""||phoneresult.innerText!=""){
                resulttext3.innerText = "請正確的填寫基本資料!!";
                return;
            }
            resulttext3.innerText = "";
            this.Employer.account = this.Employer.email.split("@")[0];
            console.log(this.Employer);
            $.ajax({
                type: "POST",
                url: "https://take-care.azurewebsites.net/api/Employers",
                contentType: "application/json",
                data: JSON.stringify(this.Employer),
                success: function () {
                    //Page.ClientScript.RegisterStartupScript(this.GetType(), "MyScript", "alert('Alert Message');location.href='OtherPage.aspx';", true);
                    if (window.confirm("是否要回到登入?")) {
                        window.location = "https://localhost:7036/Login";
                    } else {
                        window.location = "https://localhost:7036";
                    }
                }
            })
        },
        sendEmail: function (event) {
            if (this.Employer.email == null) {
                resulttext.innerText = "請輸入信箱!";
                return
            }
            resulttext.innerText = "";
            $.ajax({
                type: "POST",
                url: "https://take-care.azurewebsites.net/mail/sendTestMail",
                contentType: "application/json",
                data: JSON.stringify(this.Employer.email),
                success: function (response) {
                    if (response.erroemsg != null) {
                        resulttext.innerText = response.erroemsg;
                        return;
                    }
                    MailCode = response.mailCode;
                    console.log(response);
                    console.log("done!");
                    Donext(event.target);
                },
                error: function () {
                    console.log("error!");
                }
            })
        },
        checkEmail: function (event) {
            if (MailCode == emailcode.value) {
                resulttext2.innerText = "";
                Donext(event.target);
            } else {
                resulttext2.innerText = "驗證碼錯誤!!";
            }
        },
        inputBlur: function (event) {
            console.log(event.target.name);
            switch (event.target.name) {
                case "pass":
                    if (passregex.test(event.target.value)) {
                        document.getElementById(event.target.name + "result").innerText = ""
                        event.target.style.border = "1px solid green";
                    } else {
                        document.getElementById(event.target.name + "result").innerText = "必須包含大小寫字母和數字的組合，不能使用特殊字符，長度在 8-10 之間"
                        event.target.style.border = "1px solid red";
                    }
                    break;
                case "cpass":
                    if (event.target.value == this.Employer.password) {
                        document.getElementById(event.target.name + "result").innerText = "";
                        event.target.style.border = "1px solid green";
                    } else {
                        document.getElementById(event.target.name + "result").innerText = "確認密碼與密碼不相符";
                        event.target.style.border = "1px solid red";
                    }
                    break;
                case "phone":
                    if (phoneregex.test(event.target.value)) {
                        document.getElementById(event.target.name + "result").innerText = "";
                        event.target.style.border = "1px solid green";
                    } else {
                        document.getElementById(event.target.name + "result").innerText = "請輸入正確的手機電話格式"
                        event.target.style.border = "1px solid red";
                    }
                    break;
                case "name":
                    if(event.target.value ==""){
                        document.getElementById(event.target.name + "result").innerText = "請輸入姓名";
                        event.target.style.border = "1px solid red";
                    } else {
                        document.getElementById(event.target.name + "result").innerText = ""
                        event.target.style.border = "1px solid green";
                    }
                    break;
            }
        },
        mailBlur: function (event) {
            if (emailregex.test(this.Employer.email)) {
                event.target.style.border = "1px solid green";
                resulttext.innerText = "";
            } else {
                event.target.style.border = "1px solid red";
                resulttext.innerText = "請輸入正確的電子信箱格式!!";
            }
        }
    }
})


var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;
var cd = 60;

function Donext(sender) {
    if (animating) return false;
    animating = true;
    current_fs = $(sender).parent();
    next_fs = $(sender).parent().next();
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    next_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50) + "%";
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
            current_fs.css({
                'position': 'relative'
            });
        },
        easing: 'easeInOutBack'
    });
}


//$(".next").click();

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    previous_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1 - now) * 50) + "%";
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity,
                'position': 'absolute'
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
            previous_fs.css({'position': 'relative'})
        },
        easing: 'easeInOutBack'
    });
});


function settime(sender) {
    if (sender == null) return;
    if (cd == 0) {
        sender.removeAttribute("disabled");
        sender.value = "重新發送";
        cd = 60;
    } else {
        sender.setAttribute("disabled", true);
        sender.value = `重新發送(${cd})`;
        cd--;
        setTimeout(function () {
            settime(sender);
        }, 1000)
    }
}