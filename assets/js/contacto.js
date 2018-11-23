
var protocolo = location.protocol;
var path= "window.location.origin/socialmedica2.0/";
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

               // console.log(data[i-1].text+ "&#13;");

                i = i+1;           
                
 console.log(data[i-1].created_at)
                if(data[i-1].emitter._id == identity._id ){
                    
               
                var text = createdomele('h6');
                text.innerHTML = data[i-1].text + "&#13;";

                var nombre = createdomele('h6','style','font-weight:bold;color:#216190')
                nombre.innerHTML = data[i-1].emitter.name + ":";

                var date = createdomele('h6','style','font-size: smaller;color: #999fa5;');
                var dat = new Date(data[i-1].created_at);
                //dat = data[i-1].created_at;

               
               
                var day = dat.getDate();
                var month = dat.getMonth()+1;
                var year = dat.getFullYear();
                var hour = dat.getUTCHours();
                var min=dat.getMinutes();

                var msgtime = "  "+day+"/"+month+"/"+year+"  "+hour+":"+min;

           

                date.innerHTML = msgtime;

                var row = createdomele('div','class','row');

                if(i % 2 == 0){
                    row.setAttribute('style','background-color:#f2f2f2')
                    }else{
                    row.setAttribute('style','background-color:#ffffff')
                    }

                row.appendChild(nombre);
                row.appendChild(text);
                row.appendChild(date);


                document.getElementById('formenviados').appendChild(row);

            }else{


                var text = createdomele('h6');
                text.innerHTML = data[i-1].text + "&#13;";

                var nombre = createdomele('h6','style','font-weight:bold;color:#707171')
                nombre.innerHTML = data[i-1].emitter.name + ":";

                var date = createdomele('h6','style','font-size: smaller;color: #999fa5;');
                var dat = new Date(data[i-1].created_at);
                //dat = data[i-1].created_at;

                var day = dat.getDate();
                var month = dat.getMonth()+1;
                var year = dat.getFullYear();
                var hour = dat.getUTCHours();
                var min=dat.getMinutes();

                var msgtime = "  "+day+"/"+month+"/"+year+"  "+hour+":"+min;

          
                date.innerHTML = msgtime;

                var row = createdomele('div','class','row');

                if(i % 2 == 0){
                    
                row.setAttribute('style','background-color:#f2f2f2')
                }else{
                row.setAttribute('style','background-color:#ffffff')
                }

                row.appendChild(nombre);
                row.appendChild(text);
                row.appendChild(date);


                document.getElementById('formenviados').appendChild(row);

                
            }

                
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
	window.location = "inbox.html";
	}


function createdomele(element, atr,val){

    var ele = document.createElement(''+element+'');
    ele.setAttribute(atr,val)

    return ele;
}