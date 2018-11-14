
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


var searchParams = new URLSearchParams(window.location.search);
searchParams.has('id'); 
var param = searchParams.get('id');
var identity = JSON.parse(localStorage.getItem('identity'));


function getdata(){

    if(!param || !identity)
    window.location = "index.html"

    
    $.ajax({
        type: 'GET',
        url: datosuser + param,
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        dataType: 'json',
        success: function (data) {

        if(data){
            if(data.user.name && data.user.surname)
            document.getElementById('formpara').value = data.user.name + " " + data.user.surname;
            if(data.user.name && !data.user.surname)
            document.getElementById('formpara').value = data.user.name ;
            if(!data.user.name && data.user.surname)
            document.getElementById('formpara').value =  data.user.surname;
        }      
            
        },
        error: function(err){

        }
    
    });


/** llenar mensajes enviados A ESTE USER**/

    $.ajax({
        type: 'POST',
        url: messages,
        data:{
            receiver : param
        },
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        dataType: 'json',
        success: function (data) {
            var texto,i=0;

 
            data.forEach(element => {

                i = i+1;           

                var text = createdomele('h6');
                text.innerHTML = data[i-1].text + "&#13;";

                var nombre = createdomele('h6','style','font-weight:bold;')
                nombre.innerHTML = data[i-1].emitter.name + ":";

                var date = createdomele('h6','style','font-size: smaller;color: #999fa5;');
                var dat = new Date();
                dat = data[i-1].created_at;

                date.innerHTML = data[i-1].created_at;

                var row = createdomele('div','class','row');
                row.appendChild(nombre);
                row.appendChild(text);
                row.appendChild(date);


                document.getElementById('formenviados').appendChild(row);

                
            });

            
            
        },
        error: function(err){

        }
    
    });


}



function enviarmensaje(){

    $.ajax({
        type: 'POST',
        url: messagesend,
        data:{
            receiver: param,
            text: CKEDITOR.instances.formenviar.getData()
        },
        headers: {
            'Authorization':localStorage.getItem("token"),
        },
        dataType: 'json',
        success: function (data) {

        if("status == 'success'"){
            $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
            setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 
            document.getElementById('formenviar').value = "";
            $( "#here" ).load(window.location.href + " #here" );
            $("#formenviados").load(location.href+" #formenviados>*","");
            getdata();

        }      
            
        },
        error: function(err){
            $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
            setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 
        }
    
    });

}

	function salir(){
	 console.log("salir");
	window.location = "listausers.html";
	}


function createdomele(element, atr,val){

    var ele = document.createElement(''+element+'');
    ele.setAttribute(atr,val)

    return ele;
}