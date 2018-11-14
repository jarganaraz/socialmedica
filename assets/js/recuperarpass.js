

function enviarmailrecuperacion(){

    document.getElementById('loading').setAttribute('display','inline');


    $("form" ).submit(function( event ) {
        var data =  $(this).serializeArray();



        var formjson = {};
			$(data).each(function(index, obj){
				formjson[obj.name] = obj.value;
            });


        $.ajax({
            type: 'POST',
            data: {
                email:formjson.email,

            },
            url: "http://192.168.2.236:3800/api/solicitarcambiocontrasenia/",
            dataType: 'json',
            success: function (data) {

                if (data) {

                        if(data){

                            
                            $('#alerplaceholder').html('<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+data.message+'</div>')
                            setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );
    

                        }else{
                            console.log("si pero fallo")
                            
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

                         }
                    
                }else{    
                    console.log("else");
                    
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+data.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, ); 

                }
            },
            error: function(err){
                console.log(err);
                console.log("error1");
                
                        $('#alerplaceholder').html('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert"> '+err.responseJSON.message+'</div>')
                        setTimeout(function () { $('#alert').removeClass("show"); }, 2000, );

            },
            complete:function(){
                console.log("complete");
				document.getElementById('loading').removeAttribute('style');
                document.getElementById('loading').setAttribute('display','none');
                document.getElementById("loading").style.display = "none";
            }
        
        });
        
        event.preventDefault();
        event.stopImmediatePropagation();





    }

    )}

