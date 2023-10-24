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


$("#twzipcode2").twzipcode();
const userData2 = JSON.parse(sessionStorage.getItem('personalResidentialAddress'));
const county2 = userData2.slice(0, 3);
const district2 = userData2.slice(3);
// console.log(county2)
$("#twzipcode2").twzipcode('set', {
    'county': county2,
    'district': district2
});


$("#twzipcode3").twzipcode();
const userData3 = JSON.parse(sessionStorage.getItem('personalMailingAddress'));
const county3 = userData3.slice(0, 3);
const district3 = userData3.slice(3)
$("#twzipcode3").twzipcode('set', {
    'county': county3,
    'district': district3
});