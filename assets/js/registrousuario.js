'use strict'

var protocolo = location.protocol;
var path= window.location.origin +"/socialmedica2.0/";
//var path = protocolo + "//"+path;
var users = window.location.origin +":3800/api/users/";
var apilogin = window.location.origin +":3800/api/login";
var apiperfil = window.location.origin +":3800/api/userdata";
var apicurriculum = window.location.origin +":3800/api/get-curriculum-user/";
var messagesend = window.location.origin +":3800/api/message/";
var uploadcurriculum = window.location.origin +":3800/api/upload-curriculum-user/";
var uploadimageuser = window.location.origin +":3800/api/upload-image-user/";
var updateuser = window.location.origin +":3800/api/update-user/";
var imageuser = window.location.origin +":3800/api/get-image-user/";
var messages = window.location.origin +":3800/api/messagesperuser";
var apiuser = window.location.origin +":3800/api/register";
var datosuser = window.location.origin +":3800/api/user/";
var imageuserapi = window.location.origin +":3800/api/get-image-user/";
var adddelmedicoapi = window.location.origin +":3800/api/adddelmedico";
var adddelmedico = window.location.origin +":8300/medico/addmedico";

function validar(){
    //$.getScript('../assets/js/config.js').done(function(){
        registrar();
   // });
}

function registrar(){

    inittoast();
	var valida = 0;
    
    $("body").off("submit", "form");

    $("form" ).submit(function( event ) {
        var data =  $(this).serializeArray();

        var formjson = {};
			$(data).each(function(index, obj){
				formjson[obj.name] = obj.value;
            });

            
        $.ajax({
            type: 'POST',
            data: {
                name:formjson.name,
                surname : formjson.surname,
                email:formjson.email,
                password:formjson.password,
                role:'usuario',
                pais:formjson.pais,
                telefono: formjson.telefono,
                //ninformante : formjson.ninformante
            },
            url: apiuser,
            dataType: 'json',
            success: function (data) {

                if (data ) {


                    $.ajax({
                        type: 'PUT',
                        data: {
                            email:formjson.email,
                            password:formjson.password,
                            //ninformante : formjson.ninformante
                        },
                        url: adddelmedico,
                        dataType: 'json',
                        success: function (data) {
            
                            if (data ) {
                                destroytoast('<i class="fas fa-check" style="color:green"></i> Enviado Correctamente!');
                                    
                           
                                
                            }else{
                               return destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                                    
                    
                            }
                        },
                        error: function(err){
                           return destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
           
                        },
                        complete : function(){
                            
                            
                                setTimeout(function () { window.parent.$('#modal').iziModal('close');  }, 2000, );   
                         
                            
                        }
                    });


                    destroytoast('<i class="fas fa-check" style="color:green"></i> Enviado Correctamente!');
                        
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 3000, );
                    
                }else{
                    destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                        
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 3000, ); 
                }
            },
            error: function(err){
                destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">Ocurrio un problema</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 3000, );
            },
            complete : function(){
                
              
                    setTimeout(function () { window.parent.$('#modal').iziModal('close');  }, 2000, ); 
                
               
                
            }
        });

    
        
        event.preventDefault();
        event.stopImmediatePropagation();

    });

}



function inittoast(){       
    iziToast.show({
    title: '<i class="fas fa-spinner fa-pulse" style="color:green"></i> Enviando correo de Recuperacion',
    //message: ' <i class="fas fa-spinner fa-pulse"></i> What would you like to add?',
    position:'center',
    timeout: false,
    progressBar:false,
    close:false

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