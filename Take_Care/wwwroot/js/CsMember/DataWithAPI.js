﻿

const profile = Vue.createApp({
    data() {
        return {

            // 使用者檔案
            profileList: "",
            employerAccount: "",
            employerFullName: "",
            employerEmail: "",
            employerGender: "",
            employerPhoneNumber: "",
            employerAddress: "",
            employerAddressSection: "",
            employerCounty: "",
            employerDistrict: "",
            employerid: "",
            employerPassword: "",
            employerPhotoURL: "",
            originData: "",

            // 案主檔案
            personalList: "",
            personalBirthday: "",
            personalGender: "",
            personalIdentityCard: "",
            personalName: "",
            personalResidentialAddress: "",
            personalResidentialAddressSection: "",
            personalLanguage: "",
            personalMailingAddress: "",
            personalMailingAddressSection: "",
            personaWelfareStatusl: "",
            personalLongTermCareStatus: "",
            personalResidentialCounty: "",
            personalResidentialDistrict: "",
            personalMailingAddressCounty: "",
            personalMailingAddressDistrict: "",
            Residential_Status: "",

            // 補上county、district

            // 緊急聯絡人
            emergencyContactsList: "",
            emergencyorigindata: "",
            contactId: "",
            personalInfoId: "",
            contactName: "",
            contactMobile: "",
            contactRelationship: "",

            //  照服員檔案
            employeeList: "",
            employeeName: "",
            account: "",
            email: "",
            cellPhone: "",
            gender: "",
            birthday: "",
            address: "",
            selfIntroduction: "",
            skill: "",
            photoUrl: "",

        };
    },
    mounted() {
        this.$nextTick(() => {
            $("#twzipcode").twzipcode();
            const userData = JSON.parse(sessionStorage.getItem('id'));
            const county = userData[0].address.slice(0, 3);
            const district = userData[0].address.slice(3);
            // console.log(userData.address)
            // console.log(userData.address.slice(0, 3))
            // console.log(userData.address.slice(3))
            // 使用 TWzipcode 的 .set() 方法設定地址
            $("#twzipcode").twzipcode('set', {
                'county': county,
                'district': district
            });

            //$("#twzipcode2").twzipcode();
            //const userData2 = JSON.parse(sessionStorage.getItem('personalResidentialAddress'));
            //const county2 = userData2.slice(0, 3);
            //const district2 = userData2.slice(3);
            //// console.log(county2)
            //$("#twzipcode2").twzipcode('set', {
            //    'county': county2,
            //    'district': district2
            //});


            //$("#twzipcode3").twzipcode();
            //const userData3 = JSON.parse(sessionStorage.getItem('personalMailingAddress'));
            //const county3 = userData3.slice(0, 3);
            //const district3 = userData3.slice(3)
            //$("#twzipcode3").twzipcode('set', {
            //    'county': county3,
            //    'district': district3
            //});

        });
        this.fetchProfileData();
        this.fetchIDData();
        this.fetchEmergencyContact();
        this.fetchCsProfileData();
        this.fetchEmployeeData();

    },
    methods: {
        fetchProfileData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            console.log(account)
            // 在这里执行你的 AJAX 请求
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/employers',
                success: (data) => {


                    const employerData = data.filter(employerData => employerData.account === account);
                    console.log(employerData)
                    if (employerData.length > 0) {

                        console.log(employerData);
                        console.log('這是雇主的帳號!')
                        this.profileList = employerData;
                        this.originData = employerData;
                        // console看是否有抓到值
                        console.log(data);
                        console.log(this.profileList);
                        console.log(this.originData);

                        // 從 session storage 中取得 JSON 資料
                        // 使用者檔案欄位

                        this.employerAccount = this.profileList[0].account;
                        this.employerGender = this.profileList[0].gender;
                        this.employerFullName = this.profileList[0].fullName;
                        this.employerEmail = this.profileList[0].email;
                        this.employerPhoneNumber = this.profileList[0].phoneNumber;
                        this.employerPhotoUrl = this.profileList[0].photoUrl;
                        console.log(this.employerPhotoUrl)
                        this.employerAddress = this.profileList[0].address;
                        this.employerAddressSection = this.profileList[0].addressSection;
                        this.employerCounty = this.profileList[0].address.slice(0, 3);
                        console.log(this.employerCounty)
                        this.employerDistrict = this.profileList[0].address.slice(3);


                    } else {
                        // 使用filter方法检查是否是照护员
                        this.fetchEmployeeData();
                        console.log('這是照服員的帳號!')
                    }

                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchIDData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/employers',
                success: (data) => {

                    const ProfileData = data.filter(ProfileData => ProfileData.account === account);
                    console.log(ProfileData);
                    sessionStorage.setItem('id', JSON.stringify(ProfileData));
                    this.employerid = ProfileData[0].employerId;
                    this.employerPassword = ProfileData[0].password;
                    console.log(this.employerid)
                    console.log(this.employerPassword)
                    // 從 session storage 中取得 JSON 資料

                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchEmergencyContact() {
            const EmergencyContactData = JSON.parse(sessionStorage.getItem('id'));
            //const id = EmergencyContactData[0].employerId;
            const id = JSON.parse(sessionStorage.getItem("personalInfoId"));
            console.log(id)
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/EmergencyContacts',
                success: (data) => {
                    console.log(data)
                    const emergencyContactsData = data.filter(emergencyContactsData => emergencyContactsData.personalInfoId === id);
                    console.log(emergencyContactsData);

                    this.emergencyContactsList = emergencyContactsData;
                    this.emergencyorigindata = emergencyContactsData;
                    // console看是否有抓到值

                    console.log(this.emergencyContactsList);

                    // 從 session storage 中取得 JSON 資料
                    this.contactId = this.emergencyContactsList[0].contactId
                    this.personalInfoId = this.emergencyContactsList[0].personalInfoId
                    console.log(this.personalInfoId)
                    this.contactName = this.emergencyContactsList[0].contactName
                    this.contactMobile = this.emergencyContactsList[0].contactMobile
                    this.contactRelationship = this.emergencyContactsList[0].contactRelationship
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchCsProfileData() {
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/PersonalInfoes',
                success: (data) => {
                    const CsProfileData = JSON.parse(sessionStorage.getItem('id'));
                    const id = CsProfileData[0].employerId;
                    /*                    console.log(id)*/
                    const employerData = data.filter(employerData => employerData.employerId === id);
                    console.log(employerData)
                    if (employerData.length > 0) {

                        // 從 session storage 中取得 JSON 資料

                        // 案主檔案欄位
                        this.personalList = employerData;
                        /*                        console.log(this.personalList)*/
                        this.personalBirthday = this.personalList[0].birthday.substring(0, 10),
                            console.log(this.personalBirthday)
                        this.personalIdentityCard = this.personalList[0].identityCard,
                            this.personalName = this.personalList[0].name,
                            console.log(this.personalName)
                        this.personalGender = this.personalList[0].gender,
                            console.log(this.personalGender)
                        this.personalResidentialAddress = this.personalList[0].residentialAddress,
                            sessionStorage.setItem('personalResidentialAddress', JSON.stringify(this.personalResidentialAddress));
                        this.personalResidentialCounty = this.personalList[0].residentialAddress.slice(0, 3);
                        console.log(this.personalResidentialCounty)
                        this.personalResidentialDistrict = this.personalList[0].residentialAddress.slice(3);
                        console.log(this.personalResidentialDistrict)
                        this.personalResidentialAddressSection = this.personalList[0].residentialAddressSection,
                            this.personalLanguage = this.personalList[0].language,
                            console.log(this.personalLanguage)
                        this.personalMailingAddress = this.personalList[0].mailingAddress,
                            sessionStorage.setItem('personalMailingAddress', JSON.stringify(this.personalMailingAddress));
                        this.personalMailingAddressCounty = this.personalList[0].mailingAddress.slice(0, 3);
                        this.personalMailingAddressDistrict = this.personalList[0].mailingAddress.slice(3);
                        console.log(this.personalMailingAddressDistrict)
                        this.personalMailingAddressSection = this.personalList[0].mailingAddressSection,
                            this.personaWelfareStatusl = this.personalList[0].welfareStatus,
                            console.log(this.personaWelfareStatusl)
                        this.personalLongTermCareStatus = this.personalList[0].longTermCareStatus
                        this.Residential_Status = this.personalList[0].residentialStatus
                    }
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },

        // 抓照服員的資料使用，資料會填充在data中的照服員檔案部分
        fetchEmployeeData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account;
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/employees',

                success: (data) => {
                    const employeeData = data.filter(employeeData => employeeData.account === account);
                    // 在这里处理照护员数据
                    if (employeeData.length > 0) {
                        this.employeeList = employeeData;
                        console.log(this.employeeList)
                        // 其他照护员数据字段
                        this.employeeName = this.employeeList[0].employeeName
                        console.log(this.employeeName)
                        this.account = this.employeeList[0].account
                        this.email = this.employeeList[0].email
                        this.cellPhone = this.employeeList[0].cellPhone
                        this.gender = this.employeeList[0].gender
                        this.birthday = this.employeeList[0].birthday
                        this.address = this.employeeList[0].address
                        this.selfIntroduction = this.employeeList[0].selfIntroduction
                        this.skill = this.employeeList[0].skill
                        console.log(this.skill)
                        this.photoUrl = this.employeeList[0].photoUrl
                    }
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        SaveEmployerDataToDatabase() {
            const County = document.querySelectorAll('select')[0].value;
            const District = document.querySelectorAll('select')[1].value
            this.employerCounty = County
            this.employerDistrict = District

            const updatedData = {
                "employerId": this.employerid,
                "account": this.employerAccount,
                "password": this.employerPassword,
                "fullName": this.employerFullName,
                "email": this.employerEmail,
                "gender": this.employerGender,
                "phoneNumber": this.employerPhoneNumber,
                "address": this.employerCounty + this.employerDistrict,
                "addressSection": this.employerAddressSection,
            };

            console.log('Save button clicked');
            console.log(updatedData);
            const employerData = JSON.parse(sessionStorage.getItem('id'));
            const employerId = employerData[0].employerId;
            $.ajax({
                type: 'PUT',
                url: `https://localhost:7036/api/employers/${employerId}`,
                data: JSON.stringify(updatedData),
                contentType: 'application/json',// 指定发送的数据是 JSON 格式
                dataType: "json",
                success: (response) => {
                    console.log(updatedData)
                    // 请求成功的处理逻辑
                    console.log('Data updated successfully');

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '資料保存成功',
                        showConfirmButton: false,
                        timer: 1000,
                        onAfterClose: () => {
                            // 当消息框关闭后执行刷新操作
                            location.reload();
                        }
                    });
                    
                },
                error: (error) => {
                    // 请求失败的处理逻辑
                    console.error('Error updating data:', error);
                }
            });
        },
        cancelEditEmployerData() {

            this.employerFullName = this.originData[0].fullName;
            this.employerEmail = this.originData[0].email;
            this.employerGender = this.originData[0].gender;
            this.employerPhoneNumber = this.originData[0].phoneNumber;
            this.employerAddress = this.originData[0].address;
            this.employerAddressSection = this.originData[0].addressSection;
            this.contactName = this.emergencyorigindata[0].contactName;
            this.contactMobile = this.emergencyorigindata[0].contactMobile;
            this.contactRelationship = this.emergencyorigindata[0].contactRelationship;

            //this.employerCounty = this.originData[0].employerCounty;
            //this.employerDistrict = this.originData[0].employerDistrict;
            console.log('Cancel button clicked');

        },
        SavePersonalDataToDatabase() {
            

            const updatedData = {
                "id": this.personalInfoId,
                "identityCard": this.personalIdentityCard,
                "name": this.personalName,
                "gender": this.personalGender,
                "birthday": this.personalBirthday,
                "language": this.personalLanguage,
                "residentialAddress": this.personalResidentialCounty + this.personalResidentialDistrict,
                "residentialAddressSection": this.personalResidentialAddressSection,
                "employerId": this.employerid,
                "mailingAddress": this.personalMailingAddressCounty + this.personalMailingAddressDistrict,
                "mailingAddressSection": this.personalMailingAddressSection,
                "welfareStatus": this.personaWelfareStatusl,
                "longTermCareStatus": this.personalLongTermCareStatus,

            };
            const updateEmergencyData = {
                "contactId": this.contactId,
                "personalInfoId": this.personalInfoId,
                "contactName": this.contactName,
                "contactMobile": this.contactMobile,
                "contactRelationship": this.contactRelationship,
            };

            const NewPersonalData = {
                "id": this.employerid,
                "identityCard": this.personalIdentityCard,
                "name": this.personalName,
                "gender": this.personalGender,
                "birthday": this.personalBirthday,
                "language": this.personalLanguage,
                "residentialAddress": this.personalResidentialCounty + this.personalResidentialDistrict,
                "residentialAddressSection": this.personalResidentialAddressSection,
                "employerId": this.employerid,
                "mailingAddress": this.personalMailingAddressCounty + this.personalMailingAddressDistrict,
                "mailingAddressSection": this.personalMailingAddressSection,
                "welfareStatus": this.personaWelfareStatusl,
                "longTermCareStatus": this.personalLongTermCareStatus,
            };

            const NewEmergencyData = {
                "contactId": this.employerid,
                "personalInfoId": this.employerid,
                "contactName": this.contactName,
                "contactMobile": this.contactMobile,
                "contactRelationship": this.contactRelationship,
            }

            console.log('Save button2 clicked');
            console.log(updatedData);
            console.log(updateEmergencyData);
            const employerData = JSON.parse(sessionStorage.getItem('id'));
            const employerId = employerData[0].employerId;
            if (this.personalInfoId) {
                $.ajax({
                    type: 'PUT',
                    url: `https://localhost:7036/api/PersonalInfoes/${employerId}`,
                    data: JSON.stringify(updatedData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(updatedData)
                        // 请求成功的处理逻辑
                        console.log('Data updated successfully');
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error updating data:', error);
                    }
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7036/api/PersonalInfoes',
                    data: JSON.stringify(NewPersonalData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(NewPersonalData)
                        // 请求成功的处理逻辑
                        console.log('CsData posted successfully');
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error posting CsData:', error);
                    }
                });
            }

            if (this.contactId) {
                $.ajax({
                    type: 'PUT',
                    url: `https://localhost:7036/api/EmergencyContacts/${employerId}`,
                    data: JSON.stringify(updateEmergencyData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(updateEmergencyData)
                        // 请求成功的处理逻辑
                        console.log('Data updated successfully');
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error updating data:', error);
                    }
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7036/api/EmergencyContacts',
                    data: JSON.stringify(NewEmergencyData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(NewEmergencyData)
                        // 请求成功的处理逻辑
                        console.log('EmergencyData posted successfully');
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error posting EmergencyData:', error);
                    }
                });
            }



        },

    }
});

// 這個CsProfile物件，跟上面的profile物件是一樣的，因為內容包含在兩個id裡面，懶得去調整，不然_Tabpartial也要一起動，太麻煩
const CsProfile = Vue.createApp({
    data() {
        return {

            // 使用者檔案
            profileList: "",
            employerAccount: "",
            employerFullName: "",
            employerEmail: "",
            employerGender: "",
            employerPhoneNumber: "",
            employerAddress: "",
            employerAddressSection: "",
            employerCounty: "",
            employerDistrict: "",
            employerid: "",
            employerPassword: "",
            employerPhotoURL: "",
            originData: "",

            // 案主檔案

            personalList: "",
            personalBirthday: "",
            personalGender: "",
            personalIdentityCard: "",
            personalName: "",
            personalResidentialAddress: "",
            personalResidentialAddressSection: "",
            personalLanguage: "",
            personalMailingAddress: "",
            personalMailingAddressSection: "",
            personaWelfareStatusl: "",
            personalLongTermCareStatus: "",
            personalResidentialCounty: "",
            personalResidentialDistrict: "",
            personalMailingAddressCounty: "",
            personalMailingAddressDistrict: "",
            Residential_Status: "",

            // 補上county、district

            // 緊急聯絡人
            emergencyContactsList: "",
            emergencyorigindata: "",
            contactId: "",
            personalInfoId: "",
            contactName: "",
            contactMobile: "",
            contactRelationship: "",

            //  照服員檔案
            employeeList: "",
            employeeName: "",
            account: "",
            email: "",
            cellPhone: "",
            gender: "",
            birthday: "",
            address: "",
            selfIntroduction: "",
            skill: "",
            photoUrl: "",

        };
    },
    mounted() {
        this.$nextTick(() => {
            //$("#twzipcode").twzipcode();
            //const userData = JSON.parse(sessionStorage.getItem('id'));
            //const county = userData[0].address.slice(0, 3);
            //const district = userData[0].address.slice(3);
            //// console.log(userData.address)
            //// console.log(userData.address.slice(0, 3))
            //// console.log(userData.address.slice(3))
            //// 使用 TWzipcode 的 .set() 方法設定地址
            //$("#twzipcode").twzipcode('set', {
            //    'county': county,
            //    'district': district
            //});

            $("#twzipcode2").twzipcode();
            const userData2 = JSON.parse(sessionStorage.getItem('personalResidentialAddress'));
          
            if (userData2 !== null) {
                const county2 = userData2.slice(0, 3);
                const district2 = userData2.slice(3);
                // console.log(county2)
                $("#twzipcode2").twzipcode('set', {
                    'county': county2,
                    'district': district2
                });
            }


            $("#twzipcode3").twzipcode();
            const userData3 = JSON.parse(sessionStorage.getItem('personalMailingAddress'));
            
            if (userData3 !== null) {
                const county3 = userData3.slice(0, 3);
                const district3 = userData3.slice(3)
                $("#twzipcode3").twzipcode('set', {
                    'county': county3,
                    'district': district3
                });
            }

        });
        this.fetchProfileData();
        this.fetchIDData();
        this.fetchEmergencyContact();
        this.fetchCsProfileData();
        this.fetchEmployeeData();

    },
    methods: {
        fetchProfileData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            console.log(account)
            // 在这里执行你的 AJAX 请求
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/employers',
                success: (data) => {


                    const employerData = data.filter(employerData => employerData.account === account);
                    console.log(employerData)
                    if (employerData.length > 0) {

                        console.log(employerData);
                        console.log('這是雇主的帳號!')
                        this.profileList = employerData;
                        this.originData = employerData;
                        // console看是否有抓到值
                        console.log(data);
                        console.log(this.profileList);
                        console.log(this.originData);

                        // 從 session storage 中取得 JSON 資料
                        // 使用者檔案欄位

                        this.employerAccount = this.profileList[0].account;
                        this.employerGender = this.profileList[0].gender;
                        this.employerFullName = this.profileList[0].fullName;
                        this.employerEmail = this.profileList[0].email;
                        this.employerPhoneNumber = this.profileList[0].phoneNumber;
                        this.employerPhotoUrl = this.profileList[0].photoUrl;
                        console.log(this.employerPhotoUrl)
                        this.employerAddress = this.profileList[0].address;
                        this.employerAddressSection = this.profileList[0].addressSection;
                        this.employerCounty = this.profileList[0].address.slice(0, 3);
                        console.log(this.employerCounty)
                        this.employerDistrict = this.profileList[0].address.slice(3);


                    } else {
                        // 使用filter方法检查是否是照护员
                        this.fetchEmployeeData();
                        console.log('這是照服員的帳號!')
                    }

                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchIDData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/employers',
                success: (data) => {

                    const ProfileData = data.filter(ProfileData => ProfileData.account === account);
                    console.log(ProfileData);
                    sessionStorage.setItem('id', JSON.stringify(ProfileData));
                    this.employerid = ProfileData[0].employerId;
                    this.employerPassword = ProfileData[0].password;
                    console.log(this.employerid)
                    console.log(this.employerPassword)
                    // 從 session storage 中取得 JSON 資料

                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchEmergencyContact() {
            const id = JSON.parse(sessionStorage.getItem('personalInfoId'));

            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/EmergencyContacts',
                success: (data) => {
                    console.log(data)
                    const emergencyContactsData = data.filter(emergencyContactsData => emergencyContactsData.personalInfoId === id);
                    console.log(emergencyContactsData);

                    this.emergencyContactsList = emergencyContactsData;
                    this.emergencyorigindata = emergencyContactsData;
                    // console看是否有抓到值

                    console.log(this.emergencyContactsList);

                    // 從 session storage 中取得 JSON 資料
                    this.contactId = this.emergencyContactsList[0].contactId
                    this.personalInfoId = this.emergencyContactsList[0].personalInfoId
                    console.log(this.personalInfoId)
                    this.contactName = this.emergencyContactsList[0].contactName
                    this.contactMobile = this.emergencyContactsList[0].contactMobile
                    this.contactRelationship = this.emergencyContactsList[0].contactRelationship
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchCsProfileData() {
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/PersonalInfoes',
                success: (data) => {
                    const CsProfileData = JSON.parse(sessionStorage.getItem('id'));
                    const id = CsProfileData[0].employerId;
                    /*                    console.log(id)*/
                    const employerData = data.filter(employerData => employerData.employerId === id);
                    console.log(employerData)
                    if (employerData.length > 0) {

                        // 從 session storage 中取得 JSON 資料

                        // 案主檔案欄位
                        this.personalList = employerData;
                        this.personalInfoId = this.personalList[0].id;
                        sessionStorage.setItem('personalInfoId', this.personalInfoId)
                        /*                        console.log(this.personalList)*/
                        this.personalBirthday = this.personalList[0].birthday.substring(0, 10),
                            console.log(this.personalBirthday)
                        this.personalIdentityCard = this.personalList[0].identityCard,
                            this.personalName = this.personalList[0].name,
                            console.log(this.personalName)
                        this.personalGender = this.personalList[0].gender,
                            console.log(this.personalGender)
                        this.personalResidentialAddress = this.personalList[0].residentialAddress,
                            sessionStorage.setItem('personalResidentialAddress', JSON.stringify(this.personalResidentialAddress));
                        this.personalResidentialCounty = this.personalList[0].residentialAddress.slice(0, 3);
                        console.log(this.personalResidentialCounty)
                        this.personalResidentialDistrict = this.personalList[0].residentialAddress.slice(3);
                        console.log(this.personalResidentialDistrict)
                        this.personalResidentialAddressSection = this.personalList[0].residentialAddressSection,
                            this.personalLanguage = this.personalList[0].language,
                            console.log(this.personalLanguage)
                        this.personalMailingAddress = this.personalList[0].mailingAddress,
                            sessionStorage.setItem('personalMailingAddress', JSON.stringify(this.personalMailingAddress));
                        this.personalMailingAddressCounty = this.personalList[0].mailingAddress.slice(0, 3);
                        this.personalMailingAddressDistrict = this.personalList[0].mailingAddress.slice(3);
                        console.log(this.personalMailingAddressDistrict)
                        this.personalMailingAddressSection = this.personalList[0].mailingAddressSection,
                            this.personaWelfareStatusl = this.personalList[0].welfareStatus,
                            console.log(this.personaWelfareStatusl)
                        this.personalLongTermCareStatus = this.personalList[0].longTermCareStatus
                        this.Residential_Status = this.personalList[0].residentialStatus
                    }
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },

        // 抓照服員的資料使用，資料會填充在data中的照服員檔案部分
        fetchEmployeeData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account;
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/employees',

                success: (data) => {
                    const employeeData = data.filter(employeeData => employeeData.account === account);
                    // 在这里处理照护员数据
                    if (employeeData.length > 0) {
                        this.employeeList = employeeData;
                        console.log(this.employeeList)
                        // 其他照护员数据字段
                        this.employeeName = this.employeeList[0].employeeName
                        console.log(this.employeeName)
                        this.account = this.employeeList[0].account
                        this.email = this.employeeList[0].email
                        this.cellPhone = this.employeeList[0].cellPhone
                        this.gender = this.employeeList[0].gender
                        this.birthday = this.employeeList[0].birthday
                        this.address = this.employeeList[0].address
                        this.selfIntroduction = this.employeeList[0].selfIntroduction
                        this.skill = this.employeeList[0].skill
                        console.log(this.skill)
                        this.photoUrl = this.employeeList[0].photoUrl
                    }
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        SaveEmployerDataToDatabase() {
            const updatedData = {
                "employerId": this.employerid,
                "account": this.employerAccount,
                "password": this.employerPassword,
                "fullName": this.employerFullName,
                "email": this.employerEmail,
                "gender": this.employerGender,
                "phoneNumber": this.employerPhoneNumber,
                "address": this.employerCounty + this.employerDistrict,
                "addressSection": this.employerAddressSection,
            };
            console.log('Save button clicked');
            console.log(updatedData);
            const employerData = JSON.parse(sessionStorage.getItem('id'));
            const employerId = employerData[0].employerId;
            $.ajax({
                type: 'PUT',
                url: `https://localhost:7036/api/employers/${employerId}`,
                data: JSON.stringify(updatedData),
                contentType: 'application/json',// 指定发送的数据是 JSON 格式
                dataType: "json",
                success: (response) => {
                    console.log(updatedData)
                    // 请求成功的处理逻辑
                    console.log('Data updated successfully');
                },
                error: (error) => {
                    // 请求失败的处理逻辑
                    console.error('Error updating data:', error);
                }
            });
        },
        cancelEditEmployerData() {

            this.employerFullName = this.originData[0].fullName;
            this.employerEmail = this.originData[0].email;
            this.employerGender = this.originData[0].gender;
            this.employerPhoneNumber = this.originData[0].phoneNumber;
            this.employerAddress = this.originData[0].address;
            this.employerAddressSection = this.originData[0].addressSection;
            this.contactName = this.emergencyorigindata[0].contactName;
            this.contactMobile = this.emergencyorigindata[0].contactMobile;
            this.contactRelationship = this.emergencyorigindata[0].contactRelationship;

            //this.employerCounty = this.originData[0].employerCounty;
            //this.employerDistrict = this.originData[0].employerDistrict;
            console.log('Cancel button clicked');

        },
        SavePersonalDataToDatabase() {

            const ResidentCounty = document.querySelectorAll('select')[3].value;
            const ResidentDistrict = document.querySelectorAll('select')[4].value;
            const MailingCounty = document.querySelectorAll('select')[5].value;
            const MailingDistrict = document.querySelectorAll('select')[6].value;
            this.personalResidentialCounty = ResidentCounty
            this.personalResidentialDistrict = ResidentDistrict
            this.personalMailingAddressCounty = MailingCounty
            this.personalMailingAddressDistrict = MailingDistrict

            const updatedCsData = {
                "id": this.personalInfoId,
                "identityCard": this.personalIdentityCard,
                "name": this.personalName,
                "gender": this.personalGender,
                "birthday": this.personalBirthday,
                "language": this.personalLanguage,
                "residentialAddress": this.personalResidentialCounty + this.personalResidentialDistrict,
                "residentialAddressSection": this.personalResidentialAddressSection,
                "employerId": this.employerid,
                "mailingAddress": this.personalMailingAddressCounty + this.personalMailingAddressDistrict,
                "mailingAddressSection": this.personalMailingAddressSection,
                "welfareStatus": this.personaWelfareStatusl,
                "longTermCareStatus": this.personalLongTermCareStatus,

            };
            const updateEmergencyData = {
                "contactId": this.contactId,
                "personalInfoId": this.personalInfoId,
                "contactName": this.contactName,
                "contactMobile": this.contactMobile,
                "contactRelationship": this.contactRelationship,
            };

            const NewPersonalData = {
                /*                "id": "",*/
                "identityCard": this.personalIdentityCard,
                "name": this.personalName,
                "gender": this.personalGender,
                "birthday": this.personalBirthday,
                "language": this.personalLanguage,
                "residentialAddress": this.personalResidentialCounty + this.personalResidentialDistrict,
                "residentialAddressSection": this.personalResidentialAddressSection,
                "employerId": this.employerid,
                "mailingAddress": this.personalMailingAddressCounty + this.personalMailingAddressDistrict,
                "mailingAddressSection": this.personalMailingAddressSection,
                "welfareStatus": this.personaWelfareStatusl,
                "longTermCareStatus": this.personalLongTermCareStatus,
            };

            const NewEmergencyData = {
                /*                "contactId": this.employerid,*/
                "personalInfoId": this.personalInfoId,
                "contactName": this.contactName,
                "contactMobile": this.contactMobile,
                "contactRelationship": this.contactRelationship,
            }

            console.log('Save button2 clicked');
            console.log(updatedCsData);
            console.log(updateEmergencyData);
            console.log('NewPersonalData:', NewPersonalData)
            console.log('NewEmergencyData', NewEmergencyData)
            const personalInfoId = JSON.parse(sessionStorage.getItem('personalInfoId'));
            if (this.personalInfoId) {
                $.ajax({
                    type: 'PUT',
                    url: `https://localhost:7036/api/PersonalInfoes/${personalInfoId}`,
                    data: JSON.stringify(updatedCsData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(updatedData)
                        // 请求成功的处理逻辑
                        console.log('Data updated successfully');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '資料保存成功',
                            showConfirmButton: false,
                            timer: 1000,
                            onAfterClose: () => {
                                // 当消息框关闭后执行刷新操作
                                location.reload();
                            }
                        });
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error updating data:', error);
                    }
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7036/api/PersonalInfoes',
                    data: JSON.stringify(NewPersonalData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(NewPersonalData)
                        // 请求成功的处理逻辑
                        console.log('CsData posted successfully');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '資料保存成功',
                            showConfirmButton: false,
                            timer: 1000,
                            onAfterClose: () => {
                                // 当消息框关闭后执行刷新操作
                                location.reload();
                            }
                        });
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error posting CsData:', error);
                    }
                });
            }

            if (this.contactId) {
                $.ajax({
                    type: 'PUT',
                    url: `https://localhost:7036/api/EmergencyContacts/${this.contactId}`,
                    data: JSON.stringify(updateEmergencyData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(updateEmergencyData)
                        // 请求成功的处理逻辑
                        console.log('Data updated successfully');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '資料保存成功',
                            showConfirmButton: false,
                            timer: 1000,
                            onAfterClose: () => {
                                // 当消息框关闭后执行刷新操作
                                location.reload();
                            }
                        });
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error updating data:', error);
                    }
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7036/api/EmergencyContacts',
                    data: JSON.stringify(NewEmergencyData),
                    contentType: 'application/json',// 指定发送的数据是 JSON 格式
                    dataType: "json",
                    success: (response) => {
                        console.log(NewEmergencyData)
                        // 请求成功的处理逻辑
                        console.log('EmergencyData posted successfully');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '資料保存成功',
                            showConfirmButton: false,
                            timer: 1000,
                            onAfterClose: () => {
                                // 当消息框关闭后执行刷新操作
                                location.reload();
                            }
                        });
                       
                    },
                    error: (error) => {
                        // 请求失败的处理逻辑
                        console.error('Error posting EmergencyData:', error);
                    }
                });
            }



        },

    }
});


profile.mount("#profile");
CsProfile.mount("#CsProfile");




