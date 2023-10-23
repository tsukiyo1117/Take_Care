let layoutApp = new Vue({
    el: "#layoutApp",
    data: {
        membertype:"", 
        member: {}
    },
    beforeMount:function () {
        if(sessionStorage.getItem("member") == null){
            this.membertype="遊客";
            return;
        }else if(JSON.parse(sessionStorage.getItem("member")).userType === 'Employer'){
            this.membertype='Employer';
        } else {
            this.membertype='Employee';
        }
        this.member = JSON.parse(sessionStorage.getItem("member"));
    }
})
