
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
var activateprimera = protocolo + "//192.168.2.236:3800/api/activateclinica/";



function validar(){

    
    document.getElementById('loading').setAttribute('display','inline');

    setTimeout(function(){ login(); }, 50000);
    

}

function login(email,password){

   
    document.getElementById("loading").style.display = "inline";


    $("body").off("submit", "form");

    if(email && email != "null" && password && password != "null"){
        loginrecordado(email,password);
    }

    $("form" ).submit(function( event ) {
        var data =  $(this).serializeArray();



        var formjson = {};
			$(data).each(function(index, obj){
				formjson[obj.name] = obj.value;
            });


            if(formjson.checkloged && formjson.checkloged == "on"){

                
                // Build the expiration date string:
                var expiration_date = new Date();
                var cookie_string = '';
                expiration_date.setFullYear(expiration_date.getFullYear() + 1);
                // Build the set-cookie string:
                cookie_string = 'cookiesocialmedica={"email":"'+formjson.email+'","password":"'+formjson.password+'"}; path=http://192.168.2.236/socialmedica2.0/views/; expires=' + expiration_date.toUTCString();
                // Create or update the cookie:
                document.cookie = cookie_string;
                        
            }


        $.ajax({
            type: 'POST',
            data: {
                email:formjson.email,
                password:formjson.password,
                gettoken:true
            },
            url: apilogin,
            dataType: 'json',
            success: function (data) {

                if (data) {

                        if(data.token){

                            localStorage.setItem("token",data.token);

                            $.ajax({
                                url: apiperfil,
                                headers: {
                                    'Authorization':localStorage.getItem("token"),
                                },
                                method: 'GET',
                                dataType: 'json',
                                success: function(data){
  
                                  if (data){
                                      localStorage.setItem("identity",JSON.stringify(data));
		
							
                                     if(data.primera == 1  && data.role == 'clinica'){
             
                                        $.ajax({
                                            type:'GET',
                                            //data: data.id,
                                            url: activateprimera+data._id,
                                            dataType: 'json',
                                        success:function(){
                                            window.location.href = "gateway.html";
                                        },
										error:function(err){
											console.log(err);
										}

                                        });
                                   
                                    }else{

                                        window.location.href = "perfil.html";
                                    }

                                      
                                  }
                                }
                              });

                        }else{
                            console.log("si pero fallo")
                            
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

                         }
                    
                }else{    
                    console.log("els");
                    
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">message:Usuario o Contraseña Incorrecta</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 

                }
            },
            error: function(err){
                console.log(err);
                console.log("error1");
                
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"> '+err.responseJSON.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

            },
            complete:function(){
                console.log("complete");
				document.getElementById('loading').removeAttribute('style');
                document.getElementById('loading').setAttribute('display','none');
                document.getElementById("loading").style.display = "none";
            }
        
        });
        
        event.preventDefault();
        event.stopImmediatePropagation();

    });

}

function loginrecordado(email,password){




    $.ajax({
        type: 'POST',
        data: {
            email:email,
            password:password,
            gettoken:true
        },
        url: apilogin,
        dataType: 'json',
        success: function (data) {

            if (data) {

                    if(data.token){

                        localStorage.setItem("token",data.token);

                        $.ajax({
                            url: apiperfil,
                            headers: {
                                'Authorization':localStorage.getItem("token"),
                            },
                            method: 'GET',
                            dataType: 'json',
                            success: function(data){
           
                              if (data){
                                  localStorage.setItem("identity",JSON.stringify(data));
    
                                 if(data.primera == 1  && data.role == 'clinica'){
             
                                    $.ajax({
                                        type:'GET',
                                        //data: data.id,
                                        url: activateprimera+data._id,
                                        dataType: 'json',
                                    success:function(){
                                        window.location.href = "gateway.html";
                                    },
                                    error:function(err){
                                        console.log(err);
                                    }

                                    });
                               
                                }else{

                                    window.location.href = "perfil.html";
                                }

                                  
                              }
                            }
                          });

                    }else{
                        console.log("si pero fallo")
                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 20000, );
                    

                     }
                
            }else{    
                console.log("else");
                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">message:Usuario o Contraseña Incorrecta</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 20000, ); 
                    

            }
        },
        error: function(err){
            console.log(err.responseJSON.message);
            console.log("error1112");
            
            $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"> '+err.responseJSON.message+'</div>')
            setTimeout(function () { $('#alert').removeClass("show"); }, 20000, );
           

        },
        complete:function(){
            console.log("complete");
            document.getElementById('loading').removeAttribute('style');
            document.getElementById('loading').setAttribute('display','none');
            document.getElementById("loading").style.display = "none";
            
        }
    
    });









}

