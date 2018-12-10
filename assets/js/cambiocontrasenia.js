var cambiopass = window.location.origin +":3800/api/cambiarcontrasenia";

function enviarform(){

    inittoast();
    var urlparams = new URLSearchParams(decodeURI(window.location.search));
 
    


$("body").off("submit", "form");

$("form" ).submit(function( event ) {
    event.preventDefault()
    var data =  $(this).serializeArray();

    var formjson = {};
        $(data).each(function(index, obj){
            formjson[obj.name] = obj.value;
        });

        
    $.ajax({
        type: 'POST',
        data: {
            password:formjson.password,
            email : urlparams.get("email"),
            hash : urlparams.get("token")
 
        },
        url: cambiopass,
        dataType: 'json',
        success: function (data) {

            if (data ) {
                destroytoast('<i class="fas fa-check" style="color:green"></i> Contraseña Cambiada');
                    
                  /*  $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 3000, );*/
                
            }else{
                destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                    
                   /* $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 3000, ); */
            }
        },
        error: function(err){
            destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
            
                  /*  $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">Ocurrio un problema</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 3000, );*/
        },
        complete : function(){
            
            setTimeout(function () { window.parent.$('#modal').iziModal('close');  }, 2000, ); 
            setTimeout(function () {  window.location.replace(location.origin);  }, 4000, ); 
     
            
        }
    });

});

}

function destroytoast(msg){
    iziToast.destroy();

iziToast.show({
    title:msg,
    position:'center',
    close:true
});

}

function inittoast(){ 
         
    iziToast.show({
    title: '<i class="fas fa-spinner fa-pulse" style="color:green"></i> Cambiando contraseña',
    //message: ' <i class="fas fa-spinner fa-pulse"></i> What would you like to add?',
    position:'center',
    timeout: false,
    progressBar:false,
    close:false

});
}

