
var protocolo = location.protocol;
var path= window.location.origin +"/socialmedica2.0/";
//var path = protocolo + "//"+path;
var users = window.location.origin +":3800/api/users/";
var clinicas = window.location.origin +":3800/api/clinicas/";
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
var medicos = window.location.origin +":3800/api/medicos/";
var medicosfilter = window.location.origin +":3800/api/medicosfilter/";



var primera = true;
var entrando = true;

var count=0;



function getconfig(){

    if(JSON.parse(localStorage.getItem('identity')).role == 'usuario'){

        pagination(clinicas);
    }else{
        pagination(medicos);

    }


}

var body = document.getElementsByTagName('body')[0];

function pagination(url){


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
            url: url,
            dataType: 'json',
        success: function (data) {      
            
            if (data.total > 0){

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
                    url: url + page,
                    dataType: 'json',
                success: function(data){
                    count=0;
                    var listausuariosdiv = document.getElementById('listausuariosdiv')
                    var lista = document.getElementById('listausuarios');
                    var container = document.getElementById('container');
                    var i=0;
                   
                    console.log(data);

                    if(!primera){
                        lista.innerHTML = "";
                        document.getElementById('listausuarios2').innerHTML="";
                    }


                        
                    data.users.forEach(element => {
                        //var i;
                        i = i+1;

                        console.log(data.users[i-1]);

                        adddelstyle(data.users[i-1].medico,1,lista,container);
                        
                    });        
                }
                });
            }
            }));

        }


        }
    });

}


function createdomele(element, atr,val){

    var ele = document.createElement(''+element+'');
    ele.setAttribute(atr,val)

    return ele;
}

function verperfil () {

window.location.href = this.getAttribute("href");

}

function contactar () {
    window.location.href = this.getAttribute("href");
}


function adddelstyle (data,tipo,lista,container,limpiar){

console.log(data);

   $.ajax({
       type: 'POST',
       url: adddelmedicoapi,
       headers: {
           'Authorization':localStorage.getItem("token"),
       },
       data:{
           id: data._id,
           email : data.email,
           consulta:tipo
       },
       dataType: 'json',
       success: function (data2) {

           if (data2.type === 1){

                   if(limpiar == 1){
                        lista.innerHTML = "";
                        respuesta = {atribute : "danger", html : "Anular"};
                        render(data,respuesta,lista,container);
                    
                    }else{
                        respuesta = {atribute : "danger", html : "Anular"};
                        render(data,respuesta,lista,container);
                    }
           }else{

                   if(limpiar == 1){
                        lista.innerHTML = "";    
                        respuesta = {atribute : "success", html : "Contratar"};
                        render(data,respuesta,lista,container);
                        
                    }else{
                        respuesta = {atribute : "success", html : "Contratar"};
                        render(data,respuesta,lista,container);
                    }

           }    
           }
       })

}


function render(data,respuesta,lista,container){

    primera = false;

 
    count = count+1;
    console.log(count);
    
    if(count >= 5){

     lista = document.getElementById('listausuarios2');

    }

    if(data.studytipe){
        var estudios = JSON.parse(data.studytipe);
    }



    var container = createdomele('div','class','jumbotron cuadromedico col col-md-3 media-custom');
    var divgral = createdomele('div','class',' col listauser-perfil');
    var divhover = createdomele('div','class','hovereffect');
    var imagen = createdomele('img','class','img-responsive');
    var divoverlay = createdomele('div','class','overlay');
    var divtexto = createdomele('div','class','texto');


    var namelbl = createdomele('p','class','separado');
    if(data.name)
    namelbl.innerHTML = data.name.toUpperCase() + " ";

    var surnamelbl = createdomele('p');
    if(data.surname)
    surnamelbl.innerHTML =" " + data.surname.toUpperCase();

    namelbl.innerHTML = data.name.toUpperCase() + " " + data.surname.toUpperCase();


    divtexto.appendChild(namelbl);


    
    if(data.image && data.image != 'null'){
        var imagen = createdomele('img','src',imageuser+data.image);
        imagen.setAttribute('class','imageperfillista');
        }else{
        var imagen = createdomele('img', 'src','../assets/images/user.png');
        imagen.setAttribute('class','imageperfillista')
    }

    divhover.appendChild(imagen);
    divoverlay.appendChild(divtexto);
    divhover.appendChild(divoverlay);
    divgral.appendChild(divhover);

    for (var prop in estudios) {
            var estudio = createdomele('p','class','btn btn-outline-success botonestudio align-text-bottom');
            estudio.innerHTML = prop.toUpperCase();
            divgral.appendChild(estudio);
    }


    container.appendChild(divgral);
   

    

    var divacciones = createdomele('div','class','contenedorbotones col');
    var buttonperfil = createdomele('button','class','btn btn-primary botoneslistausers btn-sm');
    buttonperfil.innerHTML = "Ver Perfil";
    buttonperfil.setAttribute('href', 'perfil.html?id=' + data._id);
    buttonperfil.addEventListener('click',verperfil)
    
    var buttoncontratar = createdomele('button','class','btn botoneslistausers1 btn-sm btn-'+ respuesta.atribute);
    buttoncontratar.innerHTML = respuesta.html;
    buttoncontratar.setAttribute('id',data._id);
    buttoncontratar.addEventListener('click',function(){cambiarboton(data,0)});
  
    var buttoncontactar = createdomele('button','class','btn btn-primary botoneslistausers btn-sm');
    buttoncontactar.innerHTML = "Contactar";

    buttoncontactar.setAttribute('href', 'contacto.html?id=' + data._id);
    buttoncontactar.addEventListener("click",contactar);



    var buttoncurriculum = createdomele('button','class','btn btn-primary botoneslistausers btn-sm');
    buttoncurriculum.innerHTML = "Ver Curriculum";
    if(data.curriculumfile){
        buttoncurriculum.setAttribute('href', apicurriculum + data.curriculumfile);
    }
    buttoncurriculum.addEventListener("click", vercurriculum1 );


    divacciones.appendChild(buttonperfil);

    if(JSON.parse(localStorage.getItem('identity')).role === "clinica")
    divacciones.appendChild(buttoncontratar);

    divacciones.appendChild(buttoncontactar);

    if(data.curriculumfile){
        divacciones.appendChild(buttoncurriculum);
    }else if(JSON.parse(localStorage.getItem('identity')).role === "usuario"){
        buttoncurriculum.setAttribute('class','hiden');
    }
    else{
        buttoncurriculum.setAttribute('disabled','true');
        divacciones.appendChild(buttoncurriculum);
    }

   container.appendChild(divacciones);





   lista.appendChild(container);




}

function cambiarboton (data,tipo){
   $.ajax({
       type: 'POST',
       url: adddelmedicoapi,
       headers: {
           'Authorization':localStorage.getItem("token"),
       },
       data:{
           id: data._id,
           consulta:tipo,
           email:data.email
       },
       dataType: 'json',
       success: function (data2) {
           
           if (data2.type === 1){
               
            document.getElementById(data._id).setAttribute('class','botoneslistausers1 btn btn-success ');
            document.getElementById(data._id).innerHTML = 'Contratar';

           }else{
 
            document.getElementById(data._id).setAttribute('class','botoneslistausers1 btn btn-danger');
            document.getElementById(data._id).innerHTML = ' Anular  ';
			

           }    
           }
       })

}

function vercurriculum1 () {

    window.open(this.getAttribute("href" ));
    
}






function filtrar (){


    var filtro = document.getElementById('filtro').value;
    console.log(filtro);


if(filtro && filtro != "null"){

console.log("entro");

//event.preventDefault();
//event.stopImmediatePropagation();



if(!localStorage.getItem('token') || !localStorage.getItem('identity'))
window.location = 'index.html';

var $pagination = $('selector');
var defaultOpts = {
    totalPages: 20
};
var page;
$pagination.twbsPagination(defaultOpts);
$.ajax({
    type: 'POST',
        data: {
            page : 1,
            filter : filtro,
            role : JSON.parse(localStorage.getItem('identity')).role
        },
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        url: medicosfilter,
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
                type:'POST',
                data:{
                    page : page,
                    filter : filtro,
                    role : JSON.parse(localStorage.getItem('identity')).role
                },
                headers: {
                    'Authorization':localStorage.getItem("token"),
                },
                url: medicosfilter + page,
                dataType: 'json',
            success: function(data){
                count=0;
                var listausuariosdiv = document.getElementById('listausuariosdiv')
                var lista = document.getElementById('listausuarios');
                var container = document.getElementById('container');
                var i=0;

                console.log(data);

                if(!primera){
                    lista.innerHTML = "";
                    document.getElementById('listausuarios2').innerHTML="";
                }

                data.users.forEach(element => {
                    console.log(data);
                    //var i;
                    i = i+1;
                    adddelstyle(data.users[i-1],1,lista,container);
                    
                });        
            }
            });
        }
        }));
    }
});

}else{

// getconfig();
/*if(JSON.parse(localStorage.getItem('identity')).role == 'usuario'){
    pagination(clinicas);
}else{
    pagination(users);
}*/

location.reload();

}

}