var prevButton = $("#prevButton");
var nextButton = $("#nextButton");
var details1 = $("#details1");
var details2 = $("#details2");

// 隐藏上一页按钮
// prevButton.hide();

prevButton.click(function () {
    // 切换到上一页内容
    details1.show();
    details2.hide();
    // 隐藏上一页按钮
    // prevButton.hide();
    // 显示下一页按钮
    nextButton.show();
});

nextButton.click(function () {
    // 切换到下一页内容
    details1.hide();
    details2.show();
    // 隐藏下一页按钮
    // nextButton.hide();
    // 显示上一页按钮
    prevButton.show();
});