

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
            originData: "",

            // 案主檔案
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
            this.fetchProfileData();
            this.fetchIDData();
            this.fetchEmergencyContact();
            this.fetchEmployeeData();
        });

    },
    methods: {
        fetchProfileData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            // 在这里执行你的 AJAX 请求
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/PersonalInfoview',
                success: (data) => {


                    const employerData = data.filter(employerData => employerData.employerAccount === account);
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

                        this.employerAccount = this.profileList[0].employerAccount;
                        this.employerGender = this.profileList[0].employerGender;
                        this.employerFullName = this.profileList[0].employerFullName;
                        this.employerEmail = this.profileList[0].employerEmail;
                        this.employerPhoneNumber = this.profileList[0].employerPhoneNumber;
                        this.employerAddress = this.profileList[0].employerAddress;
                        this.employerAddressSection = this.profileList[0].employerAddressSection;
                        this.employerCounty = this.profileList[0].employerAddress.slice(0, 3);
                        console.log(this.employerCounty)
                        this.employerDistrict = this.profileList[0].employerAddress.slice(3);

                        // 案主檔案欄位
                        this.personalBirthday = this.profileList[0].personalBirthday.substring(0, 10),
                            console.log(this.personalBirthday)
                        this.personalIdentityCard = this.profileList[0].personalIdentityCard,
                            this.personalName = this.profileList[0].personalName,
                            console.log(this.personalName)
                        this.personalGender = this.profileList[0].personalGender,
                            console.log(this.personalGender)
                        this.personalResidentialAddress = this.profileList[0].personalResidentialAddress,
                            sessionStorage.setItem('personalResidentialAddress', JSON.stringify(this.personalResidentialAddress));
                        this.personalResidentialCounty = this.profileList[0].personalResidentialAddress.slice(0, 3);
                        console.log(this.personalResidentialCounty)
                        this.personalResidentialDistrict = this.profileList[0].personalResidentialAddress.slice(3);
                        console.log(this.personalResidentialDistrict)
                        this.personalResidentialAddressSection = this.profileList[0].personalResidentialAddressSection,
                            this.personalLanguage = this.profileList[0].personalLanguage,
                            console.log(this.personalLanguage)
                        this.personalMailingAddress = this.profileList[0].personalMailingAddress,
                            sessionStorage.setItem('personalMailingAddress', JSON.stringify(this.personalMailingAddress));
                        this.personalMailingAddressCounty = this.profileList[0].personalMailingAddress.slice(0, 3);
                        this.personalMailingAddressDistrict = this.profileList[0].personalMailingAddress.slice(3);
                        console.log(this.personalMailingAddressDistrict)
                        this.personalMailingAddressSection = this.profileList[0].personalMailingAddressSection,
                            this.personaWelfareStatusl = this.profileList[0].personaWelfareStatusl,
                            console.log(this.personaWelfareStatusl)
                        this.personalLongTermCareStatus = this.profileList[0].personalLongTermCareStatus
                        this.Residential_Status = this.profileList[0].Residential_Status
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
            const id = EmergencyContactData[0].employerId;
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

            this.employerFullName = this.originData[0].employerFullName;
            this.employerEmail = this.originData[0].employerEmail;
            this.employerGender = this.originData[0].employerGender;
            this.employerPhoneNumber = this.originData[0].employerPhoneNumber;
            this.employerAddress = this.originData[0].employerAddress;
            this.employerAddressSection = this.originData[0].employerAddressSection;
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
            }

            console.log('Save button2 clicked');
            console.log(updatedData);
            console.log(updateEmergencyData);
            const employerData = JSON.parse(sessionStorage.getItem('id'));
            const employerId = employerData[0].employerId;
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
        },

    }
});

// 這個CsProfile物件，跟上面的profile物件是一樣的，因為內容包含在兩個id裡面，懶得去調整，不然_Tabpartial也要一起動，太麻煩
const Csprofile = Vue.createApp({
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
            originData: "",

            // 案主檔案
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
            Residential_Status:"",

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
            this.fetchProfileData();
            this.fetchIDData();
            this.fetchEmergencyContact();
            this.fetchEmployeeData();
        });

    },
    methods: {
        fetchProfileData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            // 在这里执行你的 AJAX 请求
            $.ajax({
                type: 'get',
                url: 'https://localhost:7036/api/PersonalInfoview',
                success: (data) => {


                    const employerData = data.filter(employerData => employerData.employerAccount === account);
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

                        this.employerAccount = this.profileList[0].employerAccount;
                        this.employerGender = this.profileList[0].employerGender;
                        this.employerFullName = this.profileList[0].employerFullName;
                        this.employerEmail = this.profileList[0].employerEmail;
                        this.employerPhoneNumber = this.profileList[0].employerPhoneNumber;
                        this.employerAddress = this.profileList[0].employerAddress;
                        this.employerAddressSection = this.profileList[0].employerAddressSection;
                        this.employerCounty = this.profileList[0].employerAddress.slice(0, 3);
                        console.log(this.employerCounty)
                        this.employerDistrict = this.profileList[0].employerAddress.slice(3);

                        // 案主檔案欄位
                        this.personalBirthday = this.profileList[0].personalBirthday.substring(0, 10),
                            console.log(this.personalBirthday)
                        this.personalIdentityCard = this.profileList[0].personalIdentityCard,
                            this.personalName = this.profileList[0].personalName,
                            console.log(this.personalName)
                        this.personalGender = this.profileList[0].personalGender,
                            console.log(this.personalGender)
                        this.personalResidentialAddress = this.profileList[0].personalResidentialAddress,
                            sessionStorage.setItem('personalResidentialAddress', JSON.stringify(this.personalResidentialAddress));
                        this.personalResidentialCounty = this.profileList[0].personalResidentialAddress.slice(0, 3);
                        console.log(this.personalResidentialCounty)
                        this.personalResidentialDistrict = this.profileList[0].personalResidentialAddress.slice(3);
                        console.log(this.personalResidentialDistrict)
                        this.personalResidentialAddressSection = this.profileList[0].personalResidentialAddressSection,
                            this.personalLanguage = this.profileList[0].personalLanguage,
                            console.log(this.personalLanguage)
                        this.personalMailingAddress = this.profileList[0].personalMailingAddress,
                            sessionStorage.setItem('personalMailingAddress', JSON.stringify(this.personalMailingAddress));
                        this.personalMailingAddressCounty = this.profileList[0].personalMailingAddress.slice(0, 3);
                        this.personalMailingAddressDistrict = this.profileList[0].personalMailingAddress.slice(3);
                        console.log(this.personalMailingAddressDistrict)
                        this.personalMailingAddressSection = this.profileList[0].personalMailingAddressSection,
                            this.personaWelfareStatusl = this.profileList[0].personaWelfareStatusl,
                            console.log(this.personaWelfareStatusl)
                        this.personalLongTermCareStatus = this.profileList[0].personalLongTermCareStatus
                        this.Residential_Status = this.profileList[0].Residential_Status
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
            const id = EmergencyContactData[0].employerId;
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

            this.employerFullName = this.originData[0].employerFullName;
            this.employerEmail = this.originData[0].employerEmail;
            this.employerGender = this.originData[0].employerGender;
            this.employerPhoneNumber = this.originData[0].employerPhoneNumber;
            this.employerAddress = this.originData[0].employerAddress;
            this.employerAddressSection = this.originData[0].employerAddressSection;
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
            }

            console.log('Save button2 clicked');
            console.log(updatedData);
            console.log(updateEmergencyData);
            const employerData = JSON.parse(sessionStorage.getItem('id'));
            const employerId = employerData[0].employerId;
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
        },

    }
});


profile.mount("#profile");
Csprofile.mount("#CsProfile");

