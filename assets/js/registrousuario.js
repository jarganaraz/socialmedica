'use strict'

var protocolo = location.protocol;
var path= protocolo + "192.168.2.236/socialmedica2.0/";
//var path = protocolo + "//"+path;
var users = protocolo + "//192.168.2.236:3800/api/users/";
var apilogin = protocolo + "//192.168.2.236:3800/api/login";
var apiperfil = protocolo + "//192.168.2.236:3800/api/userdata";
var apicurriculum = protocolo + "//192.168.2.236:3800/api/get-curriculum-user/";
var messagesend = protocolo + "//192.168.2.236:3800/api/message/";
var uploadcurriculum = protocolo + "//192.168.2.236:3800/api/upload-curriculum-user/";
var uploadimageuser = protocolo + "//192.168.2.236:3800/api/upload-image-user/";
var updateuser = protocolo + "//192.168.2.236:3800/api/update-user/";
var imageuser = protocolo + "//192.168.2.236:3800/api/get-image-user/";
var messages = protocolo + "//192.168.2.236:3800/api/messagesperuser";
var apiuser = protocolo + "//192.168.2.236:3800/api/register";
var datosuser = protocolo + "//192.168.2.236:3800/api/user/";
var imageuserapi = protocolo + "//192.168.2.236:3800/api/get-image-user/";
var adddelmedicoapi = protocolo + "//192.168.2.236:3800/api/adddelmedico";
var adddelmedico = protocolo + "//192.168.2.236:3000/medico/addmedico";

function validar(){
    //$.getScript('../assets/js/config.js').done(function(){
        registrar();
   // });
}

function registrar(){
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
                ninformante : formjson.ninformante
            },
            url: apiuser,
            dataType: 'json',
            success: function (data) {

                if (data ) {
                        
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 3000, );
                    
                }else{
                        
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 3000, ); 
                }
            },
            error: function(err){
                
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">Ocurrio un problema</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 3000, );
            },
            complete : function(){
                
                if (valida == 1){
                window.location = "index.html";    
                }
                valida=valida+1;
                
            }
        });

        $.ajax({
            type: 'PUT',
            data: {
                email:formjson.email,
                password:formjson.password,
                ninformante : formjson.ninformante
            },
            url: adddelmedico,
            dataType: 'json',
            success: function (data) {

                if (data ) {
                        
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show");}, 0, );
                    
                }else{
                        
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"></div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 0, ); 
                }
            },
            error: function(err){
                console.log(err)
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">Ocurrio un problema</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 0, );
            },
            complete : function(){
                
                if (valida == 1){
                window.location = "index.html";    
                }
                valida=valida+1;
                
            }
        });
        
        event.preventDefault();
        event.stopImmediatePropagation();

    });

}



