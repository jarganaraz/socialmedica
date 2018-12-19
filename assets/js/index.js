
if(localStorage.getItem("identity") && localStorage.getItem("identity") !="null")
window.location = "perfil.html"

$('.owl-carousel').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:1,
    center:true,
    loop:true,
    autoplay:true,
    autoplayTimeout:5000,
    //autoWidth:true,
    autoplayHoverPause:true,

});

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
   

var waypoint = new Waypoint({
    element: document.getElementById('contadores'),
    handler: function() {
       // counter();
        this.destroy();
 
    
      
    },
    offset: '75%'
  })

  function getCookie(cookiesocialmedica) {


    if(document.cookie){
    var name = cookiesocialmedica + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var test=c.substring(name.length, c.length);
            var values = JSON.parse(test);
            login(values.email,values.password)
        }
    }
    return "";

    }
}



function closemodal(){
    
    $("#modal").iziModal('close');
}

function modalopener(){
 $('#modal').iziModal('destroy');

$("#modal").iziModal({
    iframe: true,
    title: "Recuperar Contraseña",
    closeButton :true,
    //iframeHeight: 800,
   iframeURL: "./recuperarpass.html"
});

  $(document).on('click', '.trigger', function (event) {
    event.preventDefault();
    // $('#modal').iziModal('setZindex', 99999);
    // $('#modal').iziModal('open', { zindex: 99999 });
    $('#modal').iziModal('open');
});

}




function registroopener(){

    
 $('#modal').iziModal('destroy');
    $("#modal").iziModal({
        iframe: true,
        title: "Recuperar Contraseña",
        closeButton :true,
        iframeHeight: window.outerHeight*0.8,
        iframeURL: "./registros.html"
    });

    $(document).on('click', '.trigmodalcreate', function (event) {
        event.preventDefault();
        $('#modal').iziModal('open');
    });
    


}

function registromedicoopener(){

    
    $('#modal').iziModal('destroy');
       $("#modal").iziModal({
           iframe: true,
           title: "Médico",
           closeButton :true,
           iframeHeight: window.outerHeight*0.8,
           iframeURL: "./registropersona.html"
       });
   
       $(document).on('click', '.trigmodalcreate', function (event) {
           event.preventDefault();
           $('#modal').iziModal('open');
       });
       
   
   
   }

   function registroclinicaopener(){

    
    $('#modal').iziModal('destroy');
       $("#modal").iziModal({
           iframe: true,
           title: "Institución",
           closeButton :true,
           iframeHeight: window.outerHeight*0.8,
           iframeURL: "./registroempresa.html"
       });
   
       $(document).on('click', '.trigmodalcreate', function (event) {
           event.preventDefault();
           $('#modal').iziModal('open');
       });
       
   
   
   }