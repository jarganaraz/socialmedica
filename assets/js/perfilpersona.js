

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

var primera;
var identity = JSON.parse(localStorage.getItem("identity"));


function gatewayOpener(){
if(identity && identity != "null" && identity.role == "clinica" && identity.primera == 1){

    console.log("TEST")


    

     $('#modal').iziModal('destroy');
    
    $("#modal").iziModal({
        iframe: true,
        closeButton :true,
        title: "Gateway - Social Medica",
        //iframeHeight: 800,
       iframeURL: "./gateway.html"
    });
    
     
       // event.preventDefault();
        $('#modal').iziModal('open');
   
    


    identity.primera = 0;

    localStorage.setItem("identity",JSON.stringify(identity));


}

}




function validar(){

    renderview();

}


function renderview(){

    var searchParams = new URLSearchParams(window.location.search);
    searchParams.has('id'); 
    var param = searchParams.get('id');
    var identity = JSON.parse(localStorage.getItem('identity'));

    if( param && identity && param != identity._id){
        //caso abriendo logueado otro perfil
        personal = 0;
        obtaindata(param);

    }else if (param && !identity){
        //caso me pasaron un link
        obtaindata(param);
        personal = 0;
    }else{
        //caso entre a mi perfil sin parametros o mis parametros son iguales al id
        //o no tengo parametros y no estoy logueado
        if(identity){
            obtaindata(identity._id);
            personal = 1;
        }else{
            window.location = "index.html";
        }
    }

}

function createdomele(element, atr,val){

    var ele = document.createElement(''+element+'');
    ele.setAttribute(atr,val)

    return ele;
}

function renderperfilexterno(data,respuesta){


    if(data.studytipe){
        var estudios = JSON.parse(data.studytipe);
        }
    
    
        var body = document.getElementsByTagName('body')[0];
        var tree = document.createDocumentFragment();
    
    /** HEADER **/
    var header = createdomele('div','class','jumbotron header container media-custom');
    var div = createdomele('div','class','row');
    var div1 = createdomele ('div','class','col');
    
    labelpais = createdomele('img','class','labelpais');
if(data.pais)
labelpais.setAttribute('src','../assets/images/flags/'+data.pais+'.png');
header.appendChild(labelpais);
    
    if(data.image && data.image != "null"){
       
        var image = createdomele('img','src',imageuser+data.image);     
    }else{
        var image = createdomele('img','src','../assets/images/user.png');    
    }
    

    var imagenurl = imageuser + data.image;

    getMeta(imagenurl);

    function getMeta(url){   
       var img = new Image();
       img.addEventListener("load", function(){
           //alert( this.naturalWidth +' '+ this.naturalHeight );
   
           if(this.naturalHeight < 400){
               image.setAttribute('class','imageperfil1 img-fluid  rounded ');
           }else{
               image.setAttribute('class','imageperfil img-fluid  rounded ');
           }
       });
       img.src = url;
   }



//image.setAttribute('class','imageperfil img-fluid  rounded ');
image.setAttribute( 'alt' ,'Responsive image');
image.setAttribute('class','imageperfil img-fluid  rounded ');

var div2 = createdomele('div','class','col');

var estudiosdiv = createdomele('div','class','row');


for (var prop in estudios) {
    var estudio = createdomele('h6','class','btn btn-outline-success botonestudio');
    estudio.innerHTML = prop.toUpperCase();
    estudiosdiv.appendChild(estudio);
}



var loadbarcontainer = createdomele('div','class','row ');
var loadbar = createdomele('div','class','progress pgbar');
loadbar.setAttribute('style','height: 20px;');
var barra = createdomele('div','class','progress-bar');
barra.setAttribute('role', 'progressbar');
barra.setAttribute('aria-valuenow','25');
barra.setAttribute('aria-valuemin','0');
barra.setAttribute('aria-valuemax','100');
barra.setAttribute('style','width:25%;');

var custombuttons = createdomele('div','class','row botoncontainer');
var contactarbutton = createdomele('button','value','Contactar');
contactarbutton.innerHTML = 'Contactar';
contactarbutton.setAttribute('class', 'btn btn-primary editbutton');
contactarbutton.setAttribute('href','contacto.html?id=' + data._id);
contactarbutton.addEventListener("click",contactar);


var vercurriculum = createdomele('button','value','vercurriculum');
vercurriculum.innerHTML = 'Ver Curriculum';
vercurriculum.setAttribute('class', 'btn btn-primary editbutton');
if(data.curriculumfile){
    vercurriculum.setAttribute('href', apicurriculum + data.curriculumfile);
}
vercurriculum.addEventListener("click", vercurriculum1 );


var addel = createdomele('button', 'value', "adddel");

addel.setAttribute('class', 'editbutton btn btn-'+ respuesta.atribute);
addel.setAttribute('id','adddelbutton');
addel.innerHTML = respuesta.html;
addel.addEventListener("click", function(){adddelstyle(data,0)});



custombuttons.appendChild(contactarbutton);

if(data.curriculumfile){
    custombuttons.appendChild(vercurriculum);
}else{
    vercurriculum.setAttribute('disabled','true');
    custombuttons.appendChild(vercurriculum);
}

if(JSON.parse(localStorage.getItem('identity')).role === "clinica"){
    custombuttons.appendChild(addel);
}

var titulobarra = createdomele('h6',"style","margin-top : 16%;");
titulobarra.setAttribute('class','titulobarra');
titulobarra.innerHTML = "Cumplimiento: ";
loadbarcontainer.appendChild(titulobarra);

loadbarcontainer.appendChild(loadbar);
loadbar.appendChild(barra);

div2.appendChild(estudiosdiv);
div2.appendChild(loadbarcontainer);
div2.appendChild(custombuttons);
div1.appendChild(image);
div.appendChild(div1);
div.appendChild(div2);

header.appendChild(div,loadbar);

tree.appendChild(header);

/** BODY **/

var jumbotron = createdomele('div','class','jumbotron stats container media-custom');
var filajumbotron = createdomele('div','class','row');
var stat1 = createdomele('div','class','col');
var txtstat1 = createdomele('h5','class','textotamañores')
if(data.name && data.name != "null")
var text1 = data.name ;
if(data.surname && data.surname != "null")
var text1 =  data.surname;
if(data.name && data.surname)
var text1 = data.name +" "+ data.surname;

var stat2 = createdomele('div','class','col');
var txtstat2 = createdomele('h5','class','textotamañores');
if(data.telefono){
var text2 = data.telefono;
}
else{
    var text2 = "";
}
var stat3 = createdomele('div','class','col');
var txtstat3 = createdomele('h5','class','textotamañores');
if(data.email)
var text3 = data.email;



txtstat1.innerHTML = text1;
txtstat2.innerHTML = text2;
txtstat3.innerHTML = text3;

stat1.appendChild(txtstat1);
stat2.appendChild(txtstat2);
stat3.appendChild(txtstat3);

filajumbotron.appendChild(stat1);
filajumbotron.appendChild(stat2);
filajumbotron.appendChild(stat3);

jumbotron.appendChild(filajumbotron);

tree.appendChild(jumbotron);

/** CURRICULUM INFO **/

var cjumbotron = createdomele('div','class','jumbotron perfil container media-custom');
var perfil = createdomele('div','class','row');
var titleperfil = createdomele('h5','class','textotamañores');
titleperfil.innerHTML = "Perfil: ";
var textperfil = createdomele('h6');
if(data.perfil)
textperfil.innerHTML = '<br>'+data.perfil+'</br>';
var curriculum = createdomele('div','class','row');
var titlecurriculum = createdomele('h5','class','textotamañores');
titlecurriculum.innerHTML = "Curriculum: ";
var textcurriculum = createdomele('h6');
if(data.curriculum)
textcurriculum.innerHTML= '<br>'+data.curriculum+'</br>';

//curriculum.appendChild(titlecurriculum);
//curriculum.appendChild(textcurriculum);

perfil.appendChild(titleperfil);
perfil.appendChild(textperfil);

cjumbotron.appendChild(perfil);
cjumbotron.appendChild(curriculum);

tree.appendChild(cjumbotron);

body.appendChild(tree);

}


function renderperfilmio (data){

    
    if(data.studytipe){
        var estudios = JSON.parse(data.studytipe);
        }
    
    
        var body = document.getElementsByTagName('body')[0];
        var tree = document.createDocumentFragment();
    
    /** HEADER **/
    var header = createdomele('div','class','jumbotron header container media-custom');
    var div = createdomele('div','class','row');
    var div1 = createdomele ('div','class','col');
    
    labelpais = createdomele('img','class','labelpais');
    if(data.pais)
    labelpais.setAttribute('src','../assets/images/flags/'+data.pais+'.png');
header.appendChild(labelpais);
    
    if(data.image && data.image != "null"){
       
        var image = createdomele('img','src',imageuser+data.image);
    }else{
        var image = createdomele('img','src','../assets/images/user.png');    
    }
   
    var imagenurl = imageuser + data.image;

    getMeta(imagenurl);

    function getMeta(url){   
       var img = new Image();
       img.addEventListener("load", function(){
           //alert( this.naturalWidth +' '+ this.naturalHeight );
   
           if(this.naturalHeight < 400){
               image.setAttribute('class','imageperfil1 img-fluid  rounded ');
           }else{
               image.setAttribute('class','imageperfil img-fluid  rounded ');
           }
       });
       img.src = url;
   } 

//image.setAttribute('class','imageperfil img-fluid rounded ');
image.setAttribute( 'alt' ,'Responsive image');
image.setAttribute('class','imageperfil img-fluid  rounded ');

var div2 = createdomele('div','class','col');

var estudiosdiv = createdomele('div','class','row');



for (var prop in estudios) {
    var estudio = createdomele('h6','class','btn btn-outline-success botonestudio');
    estudio.innerHTML = prop.toUpperCase();
    estudiosdiv.appendChild(estudio);
}


var loadbarcontainer = createdomele('div','class','row ');
var loadbar = createdomele('div','class','progress pgbar');
loadbar.setAttribute('style','height: 20px;');
var barra = createdomele('div','class','progress-bar');
barra.setAttribute('role', 'progressbar');
barra.setAttribute('aria-valuenow','25');
barra.setAttribute('aria-valuemin','0');
barra.setAttribute('aria-valuemax','100');
barra.setAttribute('style','width:25%;');

var vercurriculum = createdomele('button','value','vercurriculum');
vercurriculum.innerHTML = 'Ver Curriculum';
vercurriculum.setAttribute('class', 'btn btn-primary editbutton');
if(data.curriculumfile){
    vercurriculum.setAttribute('href', apicurriculum + data.curriculumfile);
}
vercurriculum.addEventListener("click", vercurriculum1 );

var custombuttons = createdomele('div','class','row botoncontainer');
var editarbutton = createdomele('button','value','Editar');
editarbutton.innerHTML = 'Editar';
editarbutton.setAttribute('class', 'btn btn-primary editbutton');
editarbutton.addEventListener('click', editarperfil );

custombuttons.appendChild(editarbutton);

if(data.curriculumfile){
    custombuttons.appendChild(vercurriculum);
}else{
    vercurriculum.setAttribute('disabled','true');
    custombuttons.appendChild(vercurriculum);
}

var titulobarra = createdomele('h6',"style","margin-top : 16%;");
titulobarra.setAttribute('class','titulobarra');
titulobarra.innerHTML = "Cumplimiento:";
loadbarcontainer.appendChild(titulobarra);

loadbarcontainer.appendChild(loadbar);
loadbar.appendChild(barra);

div2.appendChild(estudiosdiv);
div2.appendChild(loadbarcontainer);
div2.appendChild(custombuttons);
div1.appendChild(image);
div.appendChild(div1);
div.appendChild(div2);

header.appendChild(div,loadbar);

tree.appendChild(header);

/** BODY **/

var jumbotron = createdomele('div','class','jumbotron stats container media-custom');
var filajumbotron = createdomele('div','class','row');
var stat1 = createdomele('div','class','col');
var txtstat1 = createdomele('h5','class','textotamañores')

if(data.name && data.name != "null")
var text1 = data.name ;
if(data.surname && data.surname != "null")
var text1 =  data.surname;
if(data.name && data.surname)
var text1 = data.name +" "+ data.surname;
var stat2 = createdomele('div','class','col');
var txtstat2 = createdomele('h5','class','textotamañores');
if(data.telefono){
var text2 = data.telefono;
}
else{
    var text2 = "";
}
var stat3 = createdomele('div','class','col');
var txtstat3 = createdomele('h5','class','textotamañores');
if(data.email)
var text3 = data.email;



txtstat1.innerHTML = text1;
txtstat2.innerHTML = text2;
txtstat3.innerHTML = text3;

stat1.appendChild(txtstat1);
stat2.appendChild(txtstat2);
stat3.appendChild(txtstat3);

filajumbotron.appendChild(stat1);
filajumbotron.appendChild(stat2);
filajumbotron.appendChild(stat3);

jumbotron.appendChild(filajumbotron);

tree.appendChild(jumbotron);

/** CURRICULUM INFO **/

var cjumbotron = createdomele('div','class','jumbotron perfil container media-custom');
var perfil = createdomele('div','class','row');
var titleperfil = createdomele('h5','class','textotamañores');
titleperfil.innerHTML = "Perfil:";
var textperfil = createdomele('h6');
textperfil.innerHTML = '<br>'+data.perfil+'</br>';
var curriculum = createdomele('div','class','row');
var titlecurriculum = createdomele('h5','class','textotamañores');
titlecurriculum.innerHTML = "Curriculum:";
var textcurriculum = createdomele('h6');
textcurriculum.innerHTML= '<br>'+data.curriculum+'</br>';

//curriculum.appendChild(titlecurriculum);
//curriculum.appendChild(textcurriculum);

perfil.appendChild(titleperfil);
perfil.appendChild(textperfil);

cjumbotron.appendChild(perfil);
cjumbotron.appendChild(curriculum);

tree.appendChild(cjumbotron);

body.appendChild(tree);

}


/** PERFIL CLINICA PERSONAL **/

function perfilclinicapersonal  (data){

    if(data.studytipe){
    var estudios = JSON.parse(data.studytipe);
    }


    var body = document.getElementsByTagName('body')[0];
    var tree = document.createDocumentFragment();

/** HEADER **/
var header = createdomele('div','class','jumbotron header container media-custom');
var div = createdomele('div','class','row');
var div1 = createdomele ('div','class','col');

if(data.image && data.image != "null"){
   
    var image = createdomele('img','src',imageuser+data.image);
}else{
    var image = createdomele('img','src','../assets/images/user.png');    
}

var imagenurl = imageuser + data.image;

getMeta(imagenurl);

function getMeta(url){   
   var img = new Image();
   img.addEventListener("load", function(){
       //alert( this.naturalWidth +' '+ this.naturalHeight );

       if(this.naturalHeight < 400){
           image.setAttribute('class','imageperfil1 img-fluid  rounded ');
       }else{
           image.setAttribute('class','imageperfil img-fluid  rounded ');
       }
   });
   img.src = url;
}


//image.setAttribute('class','imageperfil img-fluid  rounded ');
image.setAttribute( 'alt' ,'Responsive image');
image.setAttribute('class','imageperfil img-fluid  rounded ');

var div2 = createdomele('div','class','col');

var estudiosdiv = createdomele('div','class','row');



for (var prop in estudios) {
    var estudio = createdomele('h6','class','btn btn-outline-success botonestudio');
    estudio.innerHTML = prop.toUpperCase();
    estudiosdiv.appendChild(estudio);
}

labelpais = createdomele('img','class','labelpais');
if(data.pais)
labelpais.setAttribute('src','../assets/images/flags/'+data.pais+'.png');

var loadbarcontainer = createdomele('div','class','row ');
var loadbar = createdomele('div','class','progress pgbar');
loadbar.setAttribute('style','height: 20px;');
var barra = createdomele('div','class','progress-bar');
barra.setAttribute('role', 'progressbar');
barra.setAttribute('aria-valuenow','25');
barra.setAttribute('aria-valuemin','0');
barra.setAttribute('aria-valuemax','100');
barra.setAttribute('style','width:25%;');

var custombuttons = createdomele('div','class','row botoncontainer');
var editarbutton = createdomele('button','value','Editar');
editarbutton.innerHTML = 'Editar';
editarbutton.setAttribute('class', 'btn btn-primary editbutton');
editarbutton.addEventListener('click', editarperfilempresa );

custombuttons.appendChild(editarbutton);

var titulobarra = createdomele('h6',"style","margin-top : 16%;");
titulobarra.setAttribute('class','titulobarra');
titulobarra.innerHTML = "Cumplimiento: ";
loadbarcontainer.appendChild(titulobarra);

loadbarcontainer.appendChild(loadbar);
loadbar.appendChild(barra);



div2.appendChild(estudiosdiv);
div2.appendChild(loadbarcontainer);
div2.appendChild(custombuttons);
div1.appendChild(image);
div.appendChild(div1);
div.appendChild(div2);



header.appendChild(labelpais);
header.appendChild(div,loadbar);


tree.appendChild(header);


/** CURRICULUM INFO **/

var cjumbotron = createdomele('div','class','jumbotron perfil container media-custom');
var perfil = createdomele('div','class','col');

var divn = createdomele('div','class','row');
var nombre = createdomele('h5','class','textotamañores');
nombre.innerHTML = "Nombre de la Clinica: "
var nombreapi = createdomele('h5','class','textotamañores');
nombreapi.innerHTML = data.name;
divn.appendChild(nombre);
divn.appendChild(nombreapi);


var divf = createdomele('div','class','row');
var formadepago = createdomele('h5','class','textotamañores');
formadepago.innerHTML = "Forma de Pago: ";
var formadepagoapi = createdomele('h5','class','textotamañores');
formadepagoapi.innerHTML = data.formadepago;
//divf.appendChild(formadepago);
//divf.appendChild(formadepagoapi);


var divt = createdomele('div','class','row');
var tporespuesta = createdomele('h5','class','textotamañores');
tporespuesta.innerHTML = "Tiempo de Respuesta Requerido: ";
var tporespuestaapi = createdomele('h5','class','textotamañores');
tporespuestaapi.innerHTML = data.tporespuesta;
divt.appendChild(tporespuesta);
divt.appendChild(tporespuestaapi);


var divd = createdomele('div','class','row');
var domicilio = createdomele('h5','class','textotamañores');
domicilio.innerHTML="Domicilio de la institucion: ";
var domicilioapi = createdomele('h5','class','textotamañores');
domicilioapi.innerHTML = data.domicilio;
divd.appendChild(domicilio);
divd.appendChild(domicilioapi);

var divtel = createdomele('div','class','row');
var telefono = createdomele('h5','class','textotamañores');
telefono.innerHTML = "Telefono: ";
var telefonoapi = createdomele('h5','class','textotamañores');
telefonoapi.innerHTML = data.telefono;
divtel.appendChild(telefono);
divtel.appendChild(telefonoapi);

var divcon = createdomele('div','class','row');
var contacto = createdomele('h5','class','textotamañores');
contacto.innerHTML = "Contacto: ";
var contactoapi = createdomele('h5','class','textotamañores');
contactoapi.innerHTML = data.contacto;
divcon.appendChild(contacto);
divcon.appendChild(contactoapi);

perfil.appendChild(divn);
perfil.appendChild(divf);
perfil.appendChild(divt);
perfil.appendChild(divd);
perfil.appendChild(divtel);
perfil.appendChild(divcon);


cjumbotron.appendChild(perfil);

tree.appendChild(cjumbotron);

body.appendChild(tree);


   
}


/** PERFIL CLINICA EXTERNO **/

function perfilclinicaexterno  (data){

    if(data.studytipe){
    var estudios = JSON.parse(data.studytipe);

    }


    var body = document.getElementsByTagName('body')[0];
    var tree = document.createDocumentFragment();

/** HEADER **/
var header = createdomele('div','class','jumbotron header container media-custom');
var div = createdomele('div','class','row test');
var div1 = createdomele ('div','class','col');

labelpais = createdomele('img','class','labelpais');
if(data.pais)
labelpais.setAttribute('src','../assets/images/flags/'+data.pais+'.png');
header.appendChild(labelpais);

if(data.image && data.image != "null"){
   
    var image = createdomele('img','src',imageuser+data.image);
}else{
    var image = createdomele('img','src','../assets/images/user.png');    
}

 console.log(image.height);

 var imagenurl = imageuser + data.image;

 getMeta(imagenurl);

 function getMeta(url){   
    var img = new Image();
    img.addEventListener("load", function(){
        //alert( this.naturalWidth +' '+ this.naturalHeight );

        if(this.naturalHeight < 400){
            image.setAttribute('class','imageperfil1 img-fluid  rounded ');
        }else{
            image.setAttribute('class','imageperfil img-fluid  rounded ');
        }
    });
    img.src = url;
}


//image.setAttribute('class','imageperfil img-fluid  rounded ');
image.setAttribute( 'alt' ,'Responsive image');
image.setAttribute('class','imageperfil img-fluid  rounded ');

var div2 = createdomele('div','class','col');

var estudiosdiv = createdomele('div','class','row');



for (var prop in estudios) {
    var estudio = createdomele('h6','class','btn btn-outline-success botonestudio');
    estudio.innerHTML = prop.toUpperCase();
    estudiosdiv.appendChild(estudio);
}


var loadbarcontainer = createdomele('div','class','row ');
var loadbar = createdomele('div','class','progress pgbar');
loadbar.setAttribute('style','height: 20px;');
var barra = createdomele('div','class','progress-bar');
barra.setAttribute('role', 'progressbar');
barra.setAttribute('aria-valuenow','25');
barra.setAttribute('aria-valuemin','0');
barra.setAttribute('aria-valuemax','100');
barra.setAttribute('style','width:25%;');

var custombuttons = createdomele('div','class','row botoncontainer');
var contactarbutton = createdomele('button','value','Contactar');
contactarbutton.innerHTML = 'Contactar';
contactarbutton.setAttribute('class', 'btn btn-success editbutton');
contactarbutton.addEventListener("click",contactar);
contactarbutton.setAttribute('href','contacto.html?id=' + data._id);

custombuttons.appendChild(contactarbutton);

var titulobarra = createdomele('h6',"style","margin-top : 16%;");
titulobarra.setAttribute('class','titulobarra');
titulobarra.innerHTML = "Cumplimiento:";
loadbarcontainer.appendChild(titulobarra);

loadbarcontainer.appendChild(loadbar);
loadbar.appendChild(barra);



div2.appendChild(estudiosdiv);
div2.appendChild(loadbarcontainer);
div2.appendChild(custombuttons);
div1.appendChild(image);
div.appendChild(div1);
div.appendChild(div2);

header.appendChild(div,loadbar);

tree.appendChild(header);


/** CURRICULUM INFO **/

var cjumbotron = createdomele('div','class','jumbotron perfil container media-custom');
var perfil = createdomele('div','class','col');

var divn = createdomele('div','class','row');
var nombre = createdomele('h5','class','textotamañores');
nombre.innerHTML = "Nombre de la Clinica: "
var nombreapi = createdomele('h5','class','textotamañores');
nombreapi.innerHTML = data.name;
divn.appendChild(nombre);
divn.appendChild(nombreapi);


var divf = createdomele('div','class','row');
var formadepago = createdomele('h5','class','textotamañores');
formadepago.innerHTML = "Forma de Pago: ";
var formadepagoapi = createdomele('h5','class','textotamañores');
formadepagoapi.innerHTML = data.formadepago;
//divf.appendChild(formadepago);
//divf.appendChild(formadepagoapi);


var divt = createdomele('div','class','row');
var tporespuesta = createdomele('h5','class','textotamañores');
tporespuesta.innerHTML = "Tiempo de Respuesta Requerido: ";
var tporespuestaapi = createdomele('h5','class','textotamañores');
tporespuestaapi.innerHTML = data.tporespuesta;
divt.appendChild(tporespuesta);
divt.appendChild(tporespuestaapi);


var divd = createdomele('div','class','row');
var domicilio = createdomele('h5','class','textotamañores');
domicilio.innerHTML="Domicilio de la institucion: ";
var domicilioapi = createdomele('h5','class','textotamañores');
domicilioapi.innerHTML = data.domicilio;
divd.appendChild(domicilio);
divd.appendChild(domicilioapi);

var divtel = createdomele('div','class','row');
var telefono = createdomele('h5','class','textotamañores');
telefono.innerHTML = "Telefono: ";
var telefonoapi = createdomele('h5','class','textotamañores');
telefonoapi.innerHTML = data.telefono;
divtel.appendChild(telefono);
divtel.appendChild(telefonoapi);

var divcon = createdomele('div','class','row');
var contacto = createdomele('h5','class','textotamañores');
contacto.innerHTML = "Contacto: ";
var contactoapi = createdomele('h5','class','textotamañores');
contactoapi.innerHTML = data.contacto;
divcon.appendChild(contacto);
divcon.appendChild(contactoapi);

perfil.appendChild(divn);
perfil.appendChild(divf);
perfil.appendChild(divt);
perfil.appendChild(divd);
perfil.appendChild(divtel);
perfil.appendChild(divcon);


cjumbotron.appendChild(perfil);

tree.appendChild(cjumbotron);

body.appendChild(tree);
   
}



function editarperfil(){

    window.location = "editarperfiluser.html"
}

function editarperfilempresa(){

    window.location = "editarperfilclinica.html"
}

function contactar(){
    window.location = "contacto.html"
}



function obtaindata (id){

    $.ajax({
        type: 'GET',
        url: datosuser + id,
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        dataType: 'json',
        success: function (data) {
            

            if (data) {
                switch (data.user.role) {
                    case 'usuario':
                        switch (personal) {
                            case 1:
                               // console.log("render perfil personal usuario");
                                renderperfilmio(data.user);
                            break;
                        
                            case 0:
                           // console.log("render perfil externo usuario");
                                //renderperfilexterno(data.user);
                                adddelstyle(data.user,1);
                            break;
                        }                 
                    break;
                
                    case 'clinica':
                        switch (personal) {
                            case 1:
                                //console.log("render perfil personal clinica");                             
                                perfilclinicapersonal(data.user);       
                            break;
                        
                            case 0:
                               // console.log("render perfil externo clinica");
                                perfilclinicaexterno(data.user);
                            break;
                        }
                    break;
                }
                
                
            }else{
                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 
            }
        },
        error: function(err){
            console.log(err);
                    $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">Ocurrio un Problema</div>')
                    setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

        }
    
    });

}

function contactar () {
    window.location.href = this.getAttribute("href");

}

function vercurriculum1 () {

     window.open(this.getAttribute("href" ));
     
 }

 function adddelstyle (data,tipo){
     var respuesta;

     console.log(data);

    $.ajax({
        type: 'POST',
        url: adddelmedicoapi,
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        data:{
            id: data._id,
            consulta:tipo,
            email: data.email
        },
        dataType: 'json',
        success: function (data2) {

            if (data2.type == 1){
                if(primera){
                    document.getElementById('adddelbutton').setAttribute('class','editbutton btn btn-success');
                    document.getElementById('adddelbutton').innerHTML = 'Contratar';
                }else{
                    respuesta = {atribute : "danger", html : "Eliminar"};
                 
                  
                    primera = 1;
                    renderperfilexterno(data,respuesta);

            }
            }else{
                if(primera){
                    document.getElementById('adddelbutton').setAttribute('class','editbutton btn btn-danger');
                    document.getElementById('adddelbutton').innerHTML = 'Eliminar';
                }else{
                    respuesta = {atribute : "success", html : "Agregar"};
                
                    primera = 1;
                    renderperfilexterno(data,respuesta);
                }
            }

            

            }



        })

 }

