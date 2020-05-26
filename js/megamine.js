$(function() {
    $('.notification .close').click(function() {
        $(this).closest('.notification').remove();
    });
    $('#mobile_343r').click(function() {
        $('#mobile_menu_toggle, .header .menu').toggleClass('is-active');
    });
    $('#modal_video').on('show.bs.modal', function() {
        if (YtPlayer) YtPlayer.playVideo();
    }).on('hide.bs.modal', function() {
        if (YtPlayer) YtPlayer.pauseVideo();
    });
    $('#sidenav_mobile_close').click(function() {
        $('#sidenav_mobile').removeClass('active');
    });
    $('#sidenav_mobile_toggle').click(function() {
        $('#sidenav_mobile').toggleClass('active');
    });
    $('#sidenav_mobile a').click(function() {
        $('#sidenav_mobile').removeClass('active');
    });
    check();

    function check() {
        $('#button').setClass('blue');
        $('#button').text("Получение данных...");
        clearTimeout(timer);
        timer = setTimeout(function() {
            $.ajax({
                type: "POST",
                url: "/engine/ajax.php",
                data: {
                    type: 'get_price',
                    login: $('#login').val(),
                    product: $('#product option:selected').val()
                },
                dataType: "JSON",
                success: function(data) {
                    donate(data, "get_price");
                }
            });
        }, 50);
    }
    var timer;
    $('#phpmc_donate').on('keydown change', function() {
        check();
    });
    $("#phpmc_donate").submit(function(e) {
        $.ajax({
            type: "POST",
            url: "/engine/ajax.php",
            data: {
                type: 'buy',
                login: $('#login').val(),
                product: $('#product option:selected').val()
            },
            dataType: "JSON",
            success: function(data) {
                donate(data, "buy");
            }
        });
        e.preventDefault();
    });
    $('#copy').click(function() {
        $(this).CopyToClipboard();
        alert("IP адрес (pe.megamine.ru:19132) успешно скопирован!");
    });
});

function donate(data, type) {
    if (data.error == false) {
        if (data.surcharge == 1) {
            $('#button').setClass('button');
            $('#button').text("Доплатить за " + data.price + " руб.");
        } else {
            $('#button').setClass('button');
            $('#button').text("Купить за " + data.price + " руб.");
        }
    } else {
        if (data.error == true) {
            $('#button').setClass('red');
            $('#button').text(data.text);
        } else if (type == "buy" && data.url) {
            $('#button').setClass('blue');
            $('#button').text("Создаем счет...");
            window.location.href = data.url;
        } else {
            $('#button').setClass('red');
            $('#button').text("Системная ошибка.");
        }
    }
}
$.fn.setClass = function(classes) {
    this.attr('class', classes);
    return this;
};