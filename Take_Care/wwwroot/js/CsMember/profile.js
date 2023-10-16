
var toggleProfileSection = () => {
    $('.profile-img').toggle();

}

function hideProfileSection() {
    $('.profile-img').hide();
}

var otherLinks = $('.nav-link').not('#home-tab');
otherLinks.on('click', function () {
    hideProfileSection();
});


$('#editButton').on('click', function() {
        $('input[readonly]').prop('readonly', false);
        $('select[disabled]').prop('disabled',false)
        $(this).hide();
        $('#saveButton, #cancelButton,#saveButton2 ,#cancelButton2 ').show();
    });


$('#saveButton').on('click', function () {
    $('input[readonly]').prop('readonly', "readonly");
    $('select[disabled]').prop('disabled', "readonly");
    $('#editButton').show();
    $(this).hide();
    $('#cancelButton').hide();

    // 在这里添加保存数据的逻辑，可以将数据发送到服务器或本地存储
});

$('#cancelButton').on('click', function() {
    $('input[readonly]').prop('readonly', "readonly");
    $('select[disabled]').prop('disabled', "readonly");
    $('#editButton').show();
    $('#saveButton, #cancelButton').hide();

    // 在这里添加取消编辑的逻辑，将输入框恢复为原始值
});

$('#saveButton2').on('click', function () {
    $('input[readonly]').prop('readonly', "readonly");
    $('select[disabled]').prop('disabled', "readonly");
    
    $('#editButton').show();
    $(this).hide();
    $('#cancelButton2').hide();

    // 在这里添加保存数据的逻辑，可以将数据发送到服务器或本地存储
});

$('#cancelButton2').on('click', function () {
    $('input[readonly]').prop('readonly', "readonly");
    $('select[disabled]').prop('disabled', "readonly");

    $('#editButton').show();
    $('#saveButton2, #cancelButton2').hide();

    // 在这里添加取消编辑的逻辑，将输入框恢复为原始值
});

