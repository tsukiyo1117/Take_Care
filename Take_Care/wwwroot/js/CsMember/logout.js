// 登出方法
const logout = Vue.createApp({
    data() {
        return {
            membertype: "",
            member: {}
        };
    },
    beforeMount() {
        if (sessionStorage.getItem("member") == null) {
            this.membertype = "遊客";
            return;
        } else if (JSON.parse(sessionStorage.getItem("member")).userType === 'Employer') {
            this.membertype = 'Employer';
        } else {
            this.membertype = 'Employee';
        }
        this.member = JSON.parse(sessionStorage.getItem("member"));
    },
    methods: {
        logout() {
            console.log('Logout method called'); // 添加此行用于调试
            fetch('https://localhost:7036/CsMember/Logout', {
                method: 'GET',
                credentials: 'same-origin'
            })
                .then(response => {
                    if (response.status === 200) {
                        // 清除前端的用户信息
                        sessionStorage.removeItem('member');
                        this.membertype = '遊客';
                        this.member = {};

                        // 重定向到首页或登录页面
                        window.location.href = 'https://localhost:7036/MainPage/Index';
                    } else {
                        // 处理登出失败
                        console.error('登出失败');
                    }
                })
                .catch(error => {
                    // 处理错误
                    console.error('登出请求失败', error);
                });
        }
    }
})

logout.mount("#logout");