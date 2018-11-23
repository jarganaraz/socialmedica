var datosuser = window.location.origin +":3800/api/user/";
var messages = window.location.origin +":3800/api/messagesperuser";
var personal;
var imageuser = window.location.origin +":3800/api/get-image-user/";
var messagesend = window.location.origin +":3800/api/message/";
var searchParams = new URLSearchParams(window.location.search);
searchParams.has('id'); 
var param = searchParams.get('id');
var identity = JSON.parse(localStorage.getItem('identity'));


function llenarcampos(){




    
}


