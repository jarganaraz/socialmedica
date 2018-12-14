

var protocolo = location.protocol;
var path= window.location.origin +"/socialmedica2.0/";
var unviewedmsg = window.location.origin +":3800/api/unviewed-messages/";
var viewerdirection = window.location.origin +":8300/medico/getuserinfo/";


if(location.pathname != "/socialmedica2.0/views/" && location.pathname != "/socialmedica2.0/" && location.pathname != "/socialmedica2.0/views/index.html" && location.pathname != "/socialmedica2.0/views/cambiocontrase%C3%B1a.html" && location.pathname != "/socialmedica2.0/views/noticias.html" && location.pathname != "/socialmedica2.0/views/contactenos.html" && location.pathname != "/socialmedica2.0/views/nosotros.html"){

	if(!localStorage.getItem('identity')){
		window.location.replace(location.origin);
		
	}
}

function menu (){

	if(!localStorage.getItem('identity')){
		
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='home'> <a class='nav-link' href='../'><i class='fas fa-home'></i>Inicio</a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='noticias'> <a class='nav-link logout' href='noticias.html' > <i class='far fa-newspaper'></i>Noticias </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='nosotros'> <a class='nav-link logout' href='nosotros.html' > <i class='fas fa-users'></i>Nosotros </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='contactenos'> <a class='nav-link logout' href='contactenos.html'  ><i class='far fa-envelope'></i>Contáctenos </a></li>");
	
	}else if(JSON.parse(localStorage.getItem('identity')).role == 'clinica'){

		messagesbotoninbox();

		//$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='home'> <a class='nav-link' href='gateway.html'> <i class='fas fa-exclamation animated flash infinite' style='color:red;'></i>Solicitar Instalacion GT</a></li>");

		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' href='noticias.html' > <i class='far fa-newspaper'></i>Noticias </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' href='nosotros.html' > <i class='fas fa-briefcase-medical'></i>Nosotros </a></li>");


		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='perfil'> <a class='nav-link' href='perfil.html'> <i class='fas fa-user-edit'></i>Perfil</a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='medicos'> <a class='nav-link' href='listausers.html'> <i class='fas fa-users'></i>Médicos Disponibles </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='estudios'> <a class='nav-link logout' href='listamedicos.html'> <i class='fas fa-users'></i>Médicos Elegidos </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='listaest'> <a class='nav-link' onclick='viewerdirect()'> <i class='far fa-plus-square'></i>Lista Estudios </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' href='contactenos.html'  ><i class='far fa-envelope'></i>Contáctenos </a></li>");

		$("#navbarright").append("<li class='text-nowrap divmenuitems nav-item notification-container' id='inbox'>  <a class='nav-link' href='inboxinstitucion.html'> <span class='notification-counter  visualizarfalse' id='globenotif'></span><i class='fas fa-inbox'></i></i>Inbox </a></li>");
		$("#navbarright").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' onclick='logout()' ><i class='fas fa-power-off'></i>Cerrar Sesión </a></li>");

	}else{

		messagesbotoninbox();

		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' href='noticias.html' > <i class='far fa-newspaper'></i>Noticias </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' href='nosotros.html' > <i class='fas fa-users'></i>Nosotros </a></li>");

		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='perfil'> <a class='nav-link' href='perfil.html'><i class='fas fa-user-edit'></i>Perfil</a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='insti'> <a class='nav-link' href='listausers.html'> <i class='fas fa-hospital'></i>Instituciones </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='estudios'> <a class='nav-link logout' onclick='viewerdirect()'> <i class='far fa-plus-square'></i> Mis Estudios </a></li>");
		$("#navbarleft").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' href='contactenos.html'  ><i class='far fa-envelope'></i>Contáctenos </a></li>");
		

		$("#navbarright").append("<li class='text-nowrap divmenuitems nav-item notification-container' id='inbox'><a class='nav-link' href='inbox.html' onclick='borrarglobo();'> <span class='notification-counter  visualizarfalse' id='globenotif'></span><i class='fas fa-inbox'></i>Inbox </a></li>");
		$("#navbarright").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' onclick='logout()' > <i class='fas fa-power-off'></i>Cerrar Sesión </a></li>");
	}


	$("body").append('<div class="footerdivmostrar"><img class="imgfooter" src="../assets/images/brand2.png" alt=""><div>')

}

function logout(){

window.location = './';
localStorage.clear();

document.cookie = 'cookiesocialmedica=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

}


function messagesbotoninbox(){

$.ajax({
	type: 'GET',
	url: unviewedmsg,
	headers: {
		'Authorization':localStorage.getItem("token"),
	},
	dataType: 'json',
	success: function (data) {

	

	if(data && document.getElementById('globenotif')){
		if(data.unviewed > 0 ){
			document.getElementById('globenotif').classList.remove('visualizarfalse');
			document.getElementById('globenotif').classList.add('animated' , 'flash' ,'inboxtrue','vizualizartrue','infinite','animated-slow');
			document.getElementById('globenotif').innerHTML = data.unviewed ;	 
		}else{
			document.getElementById('globenotif').classList.remove('animated' , 'flash' ,'inboxtrue');
			document.getElementById('globenotif').innerHTML = ""; 
			document.getElementById('globenotif').classList.add('notification-counter-deactivated','visualizarfalse');
		}	
	}      
	},
	error: function(err){
	}
});
}

function viewerdirect(){

//http://127.0.0.1/viewer/index.php/usuarios/fastReport/#######/######
//Esta es la url que tengo que armar para que lleve al viewer
//listo el posho

$.ajax({
	type: "POST",
	url: viewerdirection,
	data: {email : JSON.parse(localStorage.getItem('identity')).email},
	success: function (response) {
//console.log(response);
if(response && response.message && response && response.message == "no se encontro usuario")
window.open("http://192.168.2.192/viewer/index.php/");
else
var paramuri = response.toString();
paramuri = paramuri.replace('@','%40');
//console.log(paramuri);
window.open("http://192.168.2.192/viewer/index.php/usuarios/fastReport/"+paramuri);
	},
	error: function(err){
		alert("Ocurrio un error ponganse en contacto con el soporte")
	}
});

}

$('#inbox').click(function(){

	document.getElementById('globenotif').classList.remove('animated' , 'flash' ,'inboxtrue');
	document.getElementById('globenotif').innerHTML = ""; 
	document.getElementById('globenotif').classList.add('notification-counter-deactivated','visualizarfalse');

})

function borrarglobo(){

	document.getElementById('globenotif').classList.remove('animated' , 'flash' ,'inboxtrue');
	document.getElementById('globenotif').innerHTML = ""; 
	document.getElementById('globenotif').classList.add('notification-counter-deactivated','visualizarfalse');
}



