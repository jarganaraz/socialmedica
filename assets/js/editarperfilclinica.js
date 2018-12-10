

var protocolo = location.protocol;
var path= window.location.origin + "/socialmedica2.0/";
//var path = protocolo + "//"+path;
var users = window.location.origin + ":3800/api/users/";
var apilogin = window.location.origin + ":3800/api/login";
var apiperfil = window.location.origin + ":3800/api/userdata";
var apicurriculum = window.location.origin + ":3800/api/get-curriculum-user/";
var messagesend = window.location.origin + ":3800/api/message/";
var uploadcurriculum = window.location.origin + ":3800/api/upload-curriculum-user/";
var uploadimageuser = window.location.origin + ":3800/api/upload-image-user/";
var updateuser = window.location.origin + ":3800/api/update-user/";
var imageuser = window.location.origin + ":3800/api/get-image-user/";
var messages = window.location.origin + ":3800/api/messagesperuser";
var apiuser = window.location.origin + ":3800/api/register";
var datosuser = window.location.origin + ":3800/api/user/";
var imageuserapi = window.location.origin + ":3800/api/get-image-user/";
var adddelmedicoapi = window.location.origin + ":3800/api/adddelmedico";


function getconfig(){


        llenarcampos();
 
    
}

function llenarcampos () {

        /** datos personales usuario **/
    $.ajax({
        type: 'GET',
        url: datosuser + JSON.parse(localStorage.getItem('identity'))._id,
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        dataType: 'json',
        success: function (data) {

            if (data) {

                if(data.user.studytipe)
                 var study = JSON.parse(data.user.studytipe);
                    if(data.user.name){
                    document.getElementById('nombre').value = data.user.name;}
                    if(data.user.domicilio){
                    document.getElementById('domicilio').value = data.user.domicilio;}
                    if(data.user.pais){
                    document.getElementById('pais').value = data.user.pais;}
                    if(data.user.telefono){
                    document.getElementById('telefono').value = data.user.telefono;}
                    if(data.user.contacto){
                    document.getElementById('contacto').value = data.user.contacto;}
                   /* if(data.user.formadepago){
                    document.getElementById('formadepago').value = data.user.formadepago;}*/
                    if(data.user.tporespuesta){
                    document.getElementById('tporespuesta').value = data.user.tporespuesta;}

                    /** data bloques **/
                        if(study.mr)
                    document.getElementById('mr').setAttribute('checked',"true");
                        if(study.rx)
                    document.getElementById('rx').setAttribute('checked',"true");
                        if(study.mg)
                    document.getElementById('mg').setAttribute('checked',"true");
                        if(study.cr)
                    document.getElementById('cr').setAttribute('checked',"true");
                        if(study.ct)
                    document.getElementById('ct').setAttribute('checked',"true");
                        if(study.dx)
                    document.getElementById('dx').setAttribute('checked',"true");
                    if(study.es)
                    document.getElementById('es').setAttribute('checked',"true");
                    if(study.nm)
                    document.getElementById('nm').setAttribute('checked',"true");
                    if(study.ot)
                    document.getElementById('ot').setAttribute('checked',"true");
                    if(study.pt)
                    document.getElementById('pt').setAttribute('checked',"true");
                    if(study.px)
                    document.getElementById('px').setAttribute('checked',"true");
                    if(study.rf)
                    document.getElementById('rf').setAttribute('checked',"true");
                    if(study.sc)
                    document.getElementById('sc').setAttribute('checked',"true");
                    if(study.us)
                    document.getElementById('us').setAttribute('checked',"true");
                    if(study.xa)
                    document.getElementById('xa').setAttribute('checked',"true");

                    if(data.user.image){
                        document.getElementById('imagenperfilactual').setAttribute('src',imageuser+data.user.image);
                     
                     }else{
                        document.getElementById('fotoactual').setAttribute('style','display:none');
                     }

                
            }else{

                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 
                   
            }
        },
        error: function(err){

                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">Ocurrio un Problema</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

        }
    
    });


}

function modificar () {

    document.getElementById("loading").style.display = "inline";
    var counter1 = 0;
    /** update perfil **/
    var identity = JSON.parse(localStorage.getItem('identity'));
    $("body").off("submit", "form");
    $("form" ).submit(function( event ) {
        var data =  $(this).serializeArray();
        var formjson = {};
			$(data).each(function(index, obj){
				formjson[obj.name] = obj.value;
            });
        
 
        event.preventDefault();
        event.stopImmediatePropagation();
    

        var formData = new FormData($(this)[0]);

            $.ajax({
                url: uploadimageuser + JSON.parse(localStorage.getItem('identity'))._id,
                type: 'POST',
                data: formData,
                async: true,
                headers: {
                    'Authorization':localStorage.getItem("token"),
                },
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                error: function(res){

                  
                },
                complete:function(){
                    counter1 = counter1+1;

                    if (counter1 == 2 ){
                       document.getElementById('loading').removeAttribute('style');
                document.getElementById('loading').setAttribute('display','none');
                        window.location = "perfil.html";
                    }
                }
            });
      


     var studytipe = JSON.stringify({        
        mr :formjson.mr,
        rx :formjson.rx,
        mg :formjson.mg,
        cr :formjson.cr,
        ct :formjson.ct,
        dx :formjson.dx,
        es :formjson.es,
        nm :formjson.nm,
        ot :formjson.ot,
        pt :formjson.pt,
        px :formjson.px,
        rf :formjson.rf,
        sc :formjson.sc,
        us :formjson.us,
        xa :formjson.xa,
    });

     $.ajax({
         url: updateuser + JSON.parse(localStorage.getItem('identity'))._id,
         type: 'PUT',
         dataType: 'json',
         data: 
         {
            name : formjson.nombre,
            domicilio : formjson.domicilio,
            pais: formjson.pais,
            telefono: formjson.telefono,
            contacto: formjson.contacto,
            //formadepago:formjson.formadepago,
            tporespuesta: formjson.tporespuesta,
            studytipe: studytipe
         },
         headers: {
            'Authorization':localStorage.getItem("token"),
        },
         success: function (response) {
            $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+response.message+'</div>')
            setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 
            
         },
         error: function(res){
       
         },
         complete:function(){
            counter1 = counter1+1;
    
             if (counter1 == 2){
               document.getElementById('loading').removeAttribute('style');
                document.getElementById('loading').setAttribute('display','none');
                  window.location = "perfil.html";
             }
         }
     });


  

    });


}

