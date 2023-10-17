var navLinks = $('.nav-link');
// 为每个 .nav-link 元素绑定点击事件
navLinks.on('click', function (event) {

    // 获取目标链接的 href 属性值
    var targetHref = $(this).attr('href');

    // 更改浏览器地址栏的网址
    history.pushState(null, null, targetHref);

});