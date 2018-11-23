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
var listamensajes = window.location.origin +":3800/api/my-messages/";

var primera = true;
var entrando = true;

var count=0;


function pagination(){

    //console.log(url);
    if(!localStorage.getItem('token') || !localStorage.getItem('identity'))
    window.location = 'index.html';
    
        var $pagination = $('selector');
        var defaultOpts = {
            totalPages: 20
        };
        var page;
        $pagination.twbsPagination(defaultOpts);
        $.ajax({
            type: 'GET',
                data: {
                    page : 1,
                },
                headers: {
                    'Authorization':localStorage.getItem("token"),
                },
                url: listamensajes,
                dataType: 'json',
            success: function (data) {          
                var totalPages = data.newTotalPages;
                var currentPage = $('#pagination-demo').twbsPagination('getCurrentPage');
                $('#pagination-demo').twbsPagination('destroy');
                $('#pagination-demo').twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: data.pages,
                    hideOnlyOnePage : true,
                    first: 'Primera',
                    prev : 'Anterior',
                    next : 'Siguiente',
                    last : 'Ultima',
    
                onPageClick(event,page){
    
                    $.ajax({
                        type:'GET',
                        data:{
                            page : page
                        },
                        headers: {
                            'Authorization':localStorage.getItem("token"),
                        },
                        url: listamensajes + page,
                        dataType: 'json',
                    success: function(data){
                        count=0;
                       var lista = document.getElementById('contenedor');
                        var container = document.getElementById('contenedor');
                        var i=0;
                       
    
                        if(!primera){
                            container.innerHTML = "";
                           // document.getElementById('listausuarios2').innerHTML="";
                        }
    
                        console.log(data);
                            
                       data.messages.forEach(element => {
                            //var i;
                            i = i+1;
    
                            render(data.messages[i-1],lista,container);
                            
                        });       
                    }
                    });
                }
                }));
            }
        });
    
    }
    
    

    function render(data,lista,container){

        primera = false;

        var divcontenedor = createdomele('div','class','row row-mensaje');
        var divcol1 = createdomele('div','class','col col-md-2 divimageneschat');


        if(data.emitter.image && data.emitter.image != 'null'){
            var imagen = createdomele('img','src',imageuser+data.emitter.image);
            imagen.setAttribute('class','imagenchat');
            }else{
            var imagen = createdomele('img', 'src','../assets/images/user.png');
            imagen.setAttribute('class','imagenchat')
        }

        divcol1.appendChild(imagen);


        var divcol2 = createdomele('div','class','col col-md-10');

        var divnombre = createdomele('div','class','row');
        var divmessage = createdomele('div','class','row');

        var textonombre = createdomele('a','href','../views/contacto.html?id='+data.emitter._id+'');
        
       
        if(data.emitter.name && data.emitter.name != 'null')
        textonombre.innerHTML = data.emitter.name;
        if(data.emitter.surname && data.emitter.surname != 'null')
        textonombre.innerHTML = data.emitter.surname;
        if(data.emitter.name && data.emitter.name != 'null' && data.emitter.surname && data.emitter.surname != 'null')
        textonombre.innerHTML = data.emitter.name +' '+ data.emitter.surname;

        divnombre.appendChild(textonombre);

        var message = createdomele('h6');
        if(data.text)
        message.innerHTML = data.text;

        divmessage.appendChild(message);


        divcol2.appendChild(textonombre);
        divcol2.appendChild(message);

        divcontenedor.appendChild(divcol1)
        divcontenedor.appendChild(divcol2)

        container.appendChild(divcontenedor);
   

      
    }


    function createdomele(element, atr,val){

        var ele = document.createElement(''+element+'');
        ele.setAttribute(atr,val)
    
        return ele;
    }