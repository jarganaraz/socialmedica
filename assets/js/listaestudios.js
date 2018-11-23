var protocolo = location.protocol;
var path= window.location.origin +"/socialmedica2.0/";
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
var getestudioslista = window.location.origin +":3000/institucion/getestudiosmedico/";
var getestudiosinstilista = window.location.origin +":3000/institucion/getestudiosinsti/";

var primera = true;
var entrando = true;


function direct(){

    if(JSON.parse(localStorage.getItem('identity')).role == 'clinica'){

        pagination(getestudiosinstilista);

    }else{

        pagination(getestudioslista);

    }
}


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
            type: 'POST',
                data: {
                    mail : JSON.parse(localStorage.getItem('identity')).email,
                    page : 1,
                },
                headers: {
                    'Authorization':localStorage.getItem("token"),
                },
                url: url,
                dataType: 'json',
            success: function (data) {

                console.log(data);
                if(data.respuesta.length>0){
                var totalPages = data.total;
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
                            mail : JSON.parse(localStorage.getItem('identity')).email,
                            page : page
                        },
                        headers: {
                            'Authorization':localStorage.getItem("token"),
                        },
                        url: url,
                        dataType: 'json',
                    success: function(data){
                        var lista = document.getElementById('tablallenar');
                        var i=0;
                       
    
                        if(!primera){
                            lista.innerHTML = "";
                        }
                        

                        data.respuesta.forEach(element => {
                   
                            i = i+1;
                            primera=false;


                            var fecha = data.respuesta[i-1].studydate;
                            anio = fecha.slice(0,4);
                            mes = fecha.slice (4,6);
                            dia = fecha.slice(6,8);

                            cambiada = dia + "/" + mes + "/" + anio;

                            var td00 = createdomele('td','class','col1');
                            td00.innerHTML = data.respuesta[i-1].studydescription;
                            var td1 = createdomele('td','class','col2');
                            td1.innerHTML=data.respuesta[i-1].modality;
                            var td2 = createdomele('td','class','col3');
                            td2.innerHTML=cambiada;
                            var td3 = createdomele('td','class','col4');
                            td3.innerHTML=data.respuesta[i-1].patientsname;
                            var td4 = createdomele('td','class','col5');
                            td4.innerHTML=data.respuesta[i-1].patientssex;
                            var td5 = createdomele('td','class','col6');
                            td5.innerHTML=data.respuesta[i-1].patientuid;
                            var td6 = createdomele('td','class','col7');
                            td6.innerHTML=data.respuesta[i-1].studyinstanceuid;

                            var tr1 = createdomele('tr');
                            var tbody = createdomele('tbody')

                            tr1.appendChild(td00);
                            tr1.appendChild(td1);
                            tr1.appendChild(td2);
                            tr1.appendChild(td3);
                            tr1.appendChild(td4);
                            tr1.appendChild(td5);
                            tr1.appendChild(td6);

                            lista.appendChild(tr1);

                           
                            
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

