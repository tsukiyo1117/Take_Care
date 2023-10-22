var prevButton = $("#prevButton");
var nextButton = $("#nextButton");
var details1 = $("#details1");
var details2 = $("#details2");

// 隐藏上一页按钮
// prevButton.hide();

prevButton.on('click', function (e) { 

 
    // 切换到上一页内容
    details1.show();
    details2.hide();
    // 隐藏上一页按钮
    // prevButton.hide();
    // 显示下一页按钮
    nextButton.show();
    prevButton.toggleClass('button-border-highlighted');
    nextButton.removeClass('button-border-highlighted');
});

nextButton.on('click', function (e) {

    // 切换到下一页内容
    details1.hide();
    details2.show();
    // 隐藏下一页按钮
    // nextButton.hide();
    // 显示上一页按钮
    prevButton.show();
    prevButton.removeClass('button-border-highlighted');
    nextButton.toggleClass('button-border-highlighted');

});