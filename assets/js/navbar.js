

var protocolo = location.protocol;
var path= protocolo + "192.168.2.236/socialmedica2.0/";
var unviewedmsg = protocolo + "//192.168.2.236:3800/api/unviewed-messages/";

function menu (){

	if(!localStorage.getItem('identity')){
		
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item homebutton' id='home'> <a class='nav-link' href='../'> Inicio</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout'  > Noticias </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout'  > Nosotros </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout'  > Contactenos </a></li>");
	
	}else if(JSON.parse(localStorage.getItem('identity')).role == 'clinica'){

		messagesbotoninbox();

		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='home'> <a class='nav-link' href='gateway.html'> Solicitar Instalacion GT</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='perfil'> <a class='nav-link' href='perfil.html'> Perfil</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='medicos'> <a class='nav-link' href='listausers.html'> Medicos  </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item notification-container' id='inbox'> <a class='nav-link' href='inbox.html'> <span class='notification-counter  visualizarfalse' id='globenotif'></span>Inbox </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='estudios'> <a class='nav-link logout' href='listamedicos.html'> Mis Medicos </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='listaest'> <a class='nav-link' onclick='viewerdirect()'> Lista Estudios </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' onclick='logout()' > Cerrar Sesion </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout'  > Noticias </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout'  > Nosotros </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout'  > Contactenos </a></li>");

	}else{

		messagesbotoninbox();

		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='perfil'> <a class='nav-link' href='perfil.html'> Perfil</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='insti'> <a class='nav-link' href='listausers.html'> Instituciones </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item notification-container' id='inbox'> <a class='nav-link' href='inbox.html'> <span class='notification-counter  visualizarfalse' id='globenotif'></span>Inbox </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='estudios'> <a class='nav-link logout' onclick='viewerdirect()'> Mis Estudios </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' onclick='logout()' > Cerrar Sesion </a></li>");

	}


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

		console.log(data.unviewed);

	if(data && document.getElementById('globenotif')){

	

		if(data.unviewed > 0 ){
			document.getElementById('globenotif').classList.remove('visualizarfalse');
			//document.getElementById('inbox').classList.add('animated' , 'flash' ,'inboxtrue');
			document.getElementById('globenotif').classList.add('animated' , 'flash' ,'inboxtrue','vizualizartrue','infinite','animated-slow');
			document.getElementById('globenotif').innerHTML = data.unviewed ;

			 
		}else{
			//document.getElementById('inbox').classList.remove('animated' , 'flash' ,'inboxtrue');
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



window.open("https://192.168.2.192/viewer/index.php/usuarios/fastreport/")


	
}

$('#inbox').click(function(){


	document.getElementById('globenotif').classList.remove('animated' , 'flash' ,'inboxtrue');
	document.getElementById('globenotif').innerHTML = ""; 
	document.getElementById('globenotif').classList.add('notification-counter-deactivated','visualizarfalse');


})

