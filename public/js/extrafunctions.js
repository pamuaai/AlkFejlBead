$(document).ready(function(){
    setcolour();
    //vakok-és-gyengénlátóknak gomb kattintása
    
    $("#vakok-es-gyengenlatok").click(function(){
        vegyl = -1*localStorage.getItem("vegyl");
        // console.log(vegyl);
        localStorage.setItem("vegyl", vegyl);
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
                // $('.navbar').load('/ .navbar .container-fluid', function () {
                //     $loginModal.modal('hide')
                // })
            } else {
                alert("Something went wrong... this isn't very motivational... :( )")
            }
        })
    });
    

    
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