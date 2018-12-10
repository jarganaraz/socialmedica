


function enviarmailcontacto(){


inittoast();



    $("body").off("submit", "form");

    $("form" ).submit(function( event ) {

        var data =  $(this).serializeArray();

        var formjson = {};
			$(data).each(function(index, obj){
				formjson[obj.name] = obj.value;
            });



            $.ajax({
                type: 'POST',
                url: window.location.origin+':3800/api/enviarmailcontacto/',
                headers: {
                    'Authorization':localStorage.getItem("token"),
                },
                data:{
                    name: formjson.name,
                    email: formjson.email,
                    message: formjson.message,
                    telefono: formjson.telefono
                },
                dataType: 'json',
                success: function (data) {

                  
        
                    if(data && data.message != "null"){
                        destroytoast('<i class="fas fa-check" style="color:green"></i> Enviado Correctamente!');
                    }else{

                  
                   
                        destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                    }
                    },
                error:function(error){
                 
                        destroytoast('<i class="fas fa-exclamation-triangle"></i>Ocurrio un Problema!!');
                    },
                complete: function(){

                    setTimeout(function () { window.parent.$('#modal').iziModal('close');  }, 2000, ); 
                    setTimeout(function () {  location.reload();  }, 4000, ); 
                   

                }

        
                })


                event.preventDefault();
        event.stopImmediatePropagation();

    })




    function inittoast(){ 
         
        iziToast.show({
        title: '<i class="fas fa-spinner fa-pulse" style="color:green"></i> Enviando correo de Contacto',
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

}

