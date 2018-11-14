

var protocolo = location.protocol;
var path= protocolo + "192.168.2.236/socialmedica2.0/";
var unviewedmsg = protocolo + "//192.168.2.236:3800/api/unviewed-messages/";

function menu (){

	if(!localStorage.getItem('identity')){
		
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item homebutton' id='home'> <a class='nav-link' href='../'> Home</a></li>");
	
	}else if(JSON.parse(localStorage.getItem('identity')).role == 'clinica'){

		messagesbotoninbox();

		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='home'> <a class='nav-link' href='gateway.html'> Solicitar Instalacion GT</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='perfil'> <a class='nav-link' href='perfil.html'> Perfil</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='medicos'> <a class='nav-link' href='listausers.html'> Medicos Informantes </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item notification-container' id='inbox'> <a class='nav-link' href='inbox.html'> <span class='notification-counter animated flash visualizarfalse' id='globenotif'></span>Inbox </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='estudios'> <a class='nav-link logout' href='listamedicos.html'> Informantes Contratados </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='listaest'> <a class='nav-link' onclick='viewerdirect()'> Lista Estudios </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' onclick='logout()' > Log Out </a></li>");

	}else{

		messagesbotoninbox();

		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='perfil'> <a class='nav-link' href='perfil.html'> Perfil</a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='insti'> <a class='nav-link' href='listausers.html'> Instituciones </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item notification-container' id='inbox'> <a class='nav-link' href='inbox.html'> <span class='notification-counter animated flash visualizarfalse' id='globenotif'></span>Inbox </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='estudios'> <a class='nav-link logout' onclick='viewerdirect()'> Estudios </a></li>");
		$("#navbarSupportedContent").append("<li class='text-nowrap divmenuitems nav-item' id='logout'> <a class='nav-link logout' onclick='logout()' > Log Out </a></li>");

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
			document.getElementById('inbox').classList.add('animated' , 'flash' ,'inboxtrue');
			document.getElementById('globenotif').classList.add('animated' , 'flash' ,'inboxtrue','vizualizartrue');
			document.getElementById('globenotif').innerHTML = data.unviewed ;
			
		}else{
			document.getElementById('inbox').classList.remove('animated' , 'flash' ,'inboxtrue');
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

