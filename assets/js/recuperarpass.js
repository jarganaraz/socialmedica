

function enviarmailrecuperacion(){

    inittoast();


    $("form" ).submit(function( event ) {
        var data =  $(this).serializeArray();



        var formjson = {};
			$(data).each(function(index, obj){
				formjson[obj.name] = obj.value;
            });


        $.ajax({
            type: 'POST',
            data: {
                email:formjson.email,

            },
            url: window.location.origin+":3800/api/solicitarcambiocontrasenia/",
            dataType: 'json',
            success: function (data) {

                if (data) {

                        if(data){

                            destroytoast('<i class="fas fa-check" style="color:green"></i> Enviado Correctamente!');

                            /*$('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
                            setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );*/
    

                        }else{
                        

                            destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                            
                       /* $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );*/

                         }
                    
                }else{    
             
                    destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                       /* $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); */

                }
            },
            error: function(err){
     
                destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                        /*$('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"> '+err.responseJSON.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );*/

            },
            complete:function(){
          
				document.getElementById('loading').removeAttribute('style');
                document.getElementById('loading').setAttribute('display','none');
                document.getElementById("loading").style.display = "none";
                
               // setTimeout(function () { window.parent.$('#modal').iziModal('close');  }, 2000, ); 
            }
        
        });
        
        event.preventDefault();
        event.stopImmediatePropagation();





    }

    )}

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