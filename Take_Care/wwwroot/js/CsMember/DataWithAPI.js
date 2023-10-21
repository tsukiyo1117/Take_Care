

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
            id: "",
            // 補上county、district

            // 緊急聯絡人
            emergencyContactsList: "",
            personalInfoId: "",
            contactName: "",
            contactMobile: "",
            contactRelationship: ""

        };
    },
    mounted() {
        this.fetchProfileData();
        this.fetchIDData();
        this.fetchEmergencyContact();
    },
    methods: {
        fetchProfileData() {
            const profileData = JSON.parse(sessionStorage.getItem('member'));
            const account = profileData.account
            // 在这里执行你的 AJAX 请求
            $.ajax({
                type: 'get',
                url: 'https://take-care.azurewebsites.net/api/PersonalInfoview',
                success: (data) => {

                    const employerData = data.filter(employerData => employerData.employerAccount === account);
                    console.log(employerData);

                    this.profileList = employerData;

                    // console看是否有抓到值
                    console.log(data);
                    console.log(this.profileList);

                    // 從 session storage 中取得 JSON 資料
                    // 使用者檔案欄位

                    this.employerAccount = this.profileList[0].employerAccount;

                    this.employerFullName = this.profileList[0].employerFullName;
                    this.employerEmail = this.profileList[0].employerEmail;
                    this.employerPhoneNumber = this.profileList[0].employerPhoneNumber;
                    this.employerAddress = this.profileList[0].employerAddress;
                    this.employerAddressSection = this.profileList[0].employerAddressSection;
                    this.employerCounty = this.employerAddress.slice(0, 3);
                    this.employerDistrict = this.employerAddress.slice(3);

                    // 案主檔案欄位
                    this.personalBirthday = this.profileList[0].personalBirthday.substring(0, 10),
                       
                    this.personalIdentityCard = this.profileList[0].personalIdentityCard,
                    this.personalName = this.profileList[0].personalName,
                    this.personalResidentialAddress = this.profileList[0].personalResidentialAddress,
                    this.personalResidentialAddressSection = this.profileList[0].personalResidentialAddressSection,
                    this.personalLanguage = this.profileList[0].personalLanguage,
                    this.personalMailingAddress = this.profileList[0].personalMailingAddress,
                    this.personalMailingAddressSection = this.profileList[0].personalMailingAddressSection,
                    this.personaWelfareStatusl = employerData.personaWelfareStatusl,
                    this.personalLongTermCareStatus = this.profileList[0].personalLongTermCareStatus
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
                url: 'https://take-care.azurewebsites.net/api/employers',
                success: (data) => {

                    const ProfileData = data.filter(ProfileData => ProfileData.account === account);
                    console.log(ProfileData);
                    sessionStorage.setItem('id', JSON.stringify(ProfileData[0]));
                    id = ProfileData[0].employerId;
                    console.log(id)
                    // 從 session storage 中取得 JSON 資料

                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        },
        fetchEmergencyContact() {
            const EmergencyContactData = JSON.parse(sessionStorage.getItem('id'));
            const id = EmergencyContactData.employerId;
            console.log(id)
            $.ajax({
                type: 'get',
                url: 'https://take-care.azurewebsites.net/api/EmergencyContacts',
                success: (data) => {
                    console.log(data)
                    const emergencyContactsData = data.filter(emergencyContactsData => emergencyContactsData.personalInfoId === id);
                    console.log(emergencyContactsData);

                    this.emergencyContactsList = emergencyContactsData;

                    // console看是否有抓到值

                    console.log(this.emergencyContactsList);

                    // 從 session storage 中取得 JSON 資料
                    this.emergencyContactsList = emergencyContactsList[0].emergencyContactsList
                    this.personalInfoId = emergencyContactsList[0].personalInfoId
                    this.contactName = emergencyContactsList[0].contactName
                    this.contactMobile = emergencyContactsList[0].contactMobile
                    this.contactRelationship = emergencyContactsList[0].contactRelationship
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
        }

    }
});


profile.mount("#profile, #CsProfile");

