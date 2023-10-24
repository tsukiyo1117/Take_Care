let MailCode = "";
let app = new Vue({
    el: "#SignUpapp",
    data: {
        Employer: {
            // account: "",
            "email": "94forteamwork@gmail.com",
            // fullName: "",
            // gender: "",
            // password: "",
            // phoneNumber: ""
        },
    },
    methods: {
        createMember: function () {
            this.Employer.account = this.Employer.email.split("@")[0];
            console.log(this.Employer);
            $.ajax({
                type: "POST",
                url: "https://take-care.azurewebsites.net/api/Employers",
                contentType: "application/json",
                data: JSON.stringify(this.Employer),
                success: function () {
                    alert("OK");
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
                url: "https://localhost:7036/mail/sendTestMail",
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
            if (event.target.checkValidity()) {
                event.target.style.border= "1px solid green";
                //event.target.classList.add("valid");
            } else {
                event.target.classList.add("invalid");
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