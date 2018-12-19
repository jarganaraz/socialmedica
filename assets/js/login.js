
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
var activateprimera = window.location.origin +":3800/api/activateclinica/";



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
                cookie_string = 'cookiesocialmedica={"email":"'+formjson.email+'","password":"'+formjson.password+'"}; path='+window.location.origin+'/socialmedica2.0/views/; expires=' + expiration_date.toUTCString();
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
		
							
                                     /*if(data.primera == 1  && data.role == 'clinica'){
             
                                        $.ajax({
                                            type:'GET',
                                            //data: data.id,
                                            url: activateprimera+data._id,
                                            dataType: 'json',
                                        success:function(){
                                            window.location.href = "gateway.html";
                                        },
										error:function(err){
											
										}

                                        });
                                   
                                    }else{*/

                                        window.location.href = "perfil.html";
                                    //}//

                                      
                                  }
                                }
                              });

                        }else{
                        
                            
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

                         }
                    
                }else{    
               
                    
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">message:Usuario o Contraseña Incorrecta</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 

                }
            },
            error: function(err){
        
                
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"> '+err.responseJSON.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

            },
            complete:function(){
       
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
            email:email.toUpperCase(),
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
                                     
                                    }

                                    });
                               
                                }else{

                                    window.location.href = "perfil.html";
                                }

                                  
                              }
                            }
                          });

                    }else{
               
                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 20000, );
                    

                     }
                
            }else{    
            
                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">message:Usuario o Contraseña Incorrecta</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 20000, ); 
                    

            }
        },
        error: function(err){
 
            
            $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"> '+err.responseJSON.message+'</div>')
            setTimeout(function () { $('#alert').removeClass("show"); }, 20000, );
           

        },
        complete:function(){
       
            document.getElementById('loading').removeAttribute('style');
            document.getElementById('loading').setAttribute('display','none');
            document.getElementById("loading").style.display = "none";
            
        }
    
    });

}

function registroopener(){

    
    $('#modal').iziModal('destroy');
       $("#modal").iziModal({
           iframe: true,
           closeButton :true,
           iframeHeight: window.outerHeight*0.8,
          iframeURL: "./registros.html"
       });
   
       $(document).on('click', '.trigmodalcreate', function (event) {
           event.preventDefault();
           $('#modal').iziModal('open');
       });
       
   
   
   }
  
  
  
  
  
  

