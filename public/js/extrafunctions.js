$(document).ready(function(){
    setcolour();
    //vakok-és-gyengénlátóknak gomb kattintása
    
    $("#vakok-es-gyengenlatok").click(function(){
        if(localStorage.getItem("vegyl") < 0){
            localStorage.setItem("vegyl", 1);
        }else{
            localStorage.setItem("vegyl", -1);
        }
        setcolour();
	});

    $("#motivate").click(function(){
        $.ajax({
            url: '/ajax/task/motivate',
            method: 'GET',
            data: "motivation_request",
            dataType: 'json'
        })
        .done(function (json) {
            if (json.success) {
                alert(json.message);
            } else {
                alert("Something went wrong... this isn't very motivational... :( )")
            }
        })
    });



    $("#deletebutton").on('submit', function (ev) {
        ev.preventDefault();
        // alert('Ajaxin')
        var url = '/ajax' + $(this).attr('action');
        alert('url');
            const headers = {
                'csrf-token': $('[name="_csrf"]').val()
            }
            
            $.ajax({
                url,
                method: 'DELETE',
                dataType: 'json',
                headers
            })
                .done(function (data) {
                    location.assign(data.redurl)
                })
                .fail(function (err) {
                    $('.help-block').text(err)
                })
    }) ;
    
});

function setcolour(){
    if(localStorage.getItem("vegyl") > 0){
        $("*").css({
            "background": "#000000",
            "color": "#ffffff"
        });
        $(".navbar-brand img").attr("src","/assets/logo_horiz2.png");
        $("#vakok-es-gyengenlatok img").attr("src","/assets/vakok-es-gyengenlatok2.jpg");

    }else{
        $("*").css({
            "background": "#ffffff",
            "color": "#000000"
        });
        $(".navbar-brand img").attr("src","/assets/logo_horiz1.png");
        $("#vakok-es-gyengenlatok img").attr("src","/assets/vakok-es-gyengenlatok.jpg");
    }
}