var datosuser = "http://192.168.2.236:3800/api/user/";
var messages = "http://192.168.2.236:3800/api/messagesperuser";
var personal;
var imageuser = "http://192.168.2.236:3800/api/get-image-user/";
var messagesend = "http://192.168.2.236:3800/api/message/";
var searchParams = new URLSearchParams(window.location.search);
searchParams.has('id'); 
var param = searchParams.get('id');
var identity = JSON.parse(localStorage.getItem('identity'));


function llenarcampos(){




    
}


