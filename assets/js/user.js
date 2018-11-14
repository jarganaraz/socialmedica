'use strict'
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var Follow = require('../models/follow');
var MedicoxInsti = require('../models/medicoxinstitucion');
var Publication = require('../models/publication');
var jwt = require('../services/jwt');

var nodemailer = require('nodemailer');

// Métodos de prueba
function home(req, res){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

// Registro
function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if(params.name && params.email && params.password){

		user.name= params.name;
		user.surname= params.surname;
		user.email= params.email;
		user.password= params.password;
		user.role= params.role;
		user.image= 'null';
		user.activo= params.activo;
		user.telefono= params.telefono;
		user.domicilio= params.domicilio;
		user.pais= params.pais;
		user.studytipe= params.studytipe;
		user.perfil= params.perfil;
		user.curriculum= params.curriculum;
		user.doccurriculu= 'null';
		user.contact= params.contact;
		user.tporespuesta= params.tporespuesta;
		user.formadepago= params.formadepago;
		user.contacto= params.contacto;
		user.activo = 'false';

		// Controlar usuarios duplicados
		User.find({ $or: [
				 {email: user.email.toLowerCase()}
		 ]}).exec((err, users) => {
		 	if(err) return res.status(500).send({message: 'Error en la petición de usuarios'});

		 	if(users && users.length >= 1){
		 		return res.status(200).send({message: 'El usuario que intentas registrar ya existe!!'});
		 	}else{

		 		// Cifra la password y me guarda los datos 
				bcrypt.hash(params.password, null, null, (err, hash) => {
					user.password = hash;

					user.save((err, userStored) => {
						if(err) return res.status(500).send({message: 'Error al guardar el usuario'});

						if(userStored){

							var transporter = nodemailer.createTransport({
								host: 'smtpout.secureserver.net',
								pool : true,
								secure : true,
															
								auth: {
									type : 'AUTH LOGIN',
									user: 'jarganaraz@visualmedica.com',
									pass: 'ASDqwe123'
								}
							 });
							 
							 var mailOptions = {
								from: 'Jarganaraz@visualmedica.com',
								to: user.email,
								subject: 'Registro',
								text: 'Para activar su cuenta por favor ingrese al siguiente link http://localhost:3800/api/activate-user/'+userStored._id+''
							 };
							 
															// verify connection configuration
								transporter.verify(function(error, success) {
									if (error) {
										console.log(error);
									} else {
										console.log('Server is ready to take our messages');
									}
								});
 

							 transporter.sendMail(mailOptions, function(error, info){
								if (error){
									console.log(error);
									//res.status(500).send(error);
								} else {
									console.log("Email sent");
									//res.status(200).send({body, user:userStored});
								}
							});
							
							res.status(200).send({user: userStored, message:'E-Mail de confirmacion enviado'});

						}else{
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}

					});
				});

		 	}
		 });
		
	}else{
		res.status(200).send({
			message: 'Envia todos los campos necesarios!!'
		});
	}
}


// Login
function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email}, (err, user) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(user){
			bcrypt.compare(password, user.password, (err, check) => {
				if(check){
					if(user.activo){
						if(params.gettoken){
							//generar y devolver token
							return res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							//devolver datos de usuario
							user.password = undefined;
							return res.status(200).send({user});
						}
					}
					else{
						res.status(200).send({message:"el usuario no esta activo"});
					}
					
				}else{
					return res.status(404).send({message: 'El usuario no se ha podido identificar'});
					
				}
			});
		}else{
			console.log(err);
			return res.status(404).send({message: 'El usuario no se ha podido identificar!!'});
		}
	});
}

// Conseguir datos de un usuario
function getUser(req, res){
	var userId = req.params.id;

	User.findById(userId, (err, user) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!user) return res.status(404).send({message: 'El usuario no existe'});

		if(user) return res.status(200).send({user});

		MedicoxInsti.findOne({
			"medico": req.user.sub ,
			"institucion" : req.params.id
		}).exec((err,follow)=>{

			if (err) return res.status(200).send({user});

			if (follow) return res.status(200).send({user,following});

			if (!follow) return res.status(200).send({user});

		});

	});
}

function addDelMedico (req,res){

	var medicoId = req.body.id;
	var instiId = req.user.sub;
	var consulta = req.body.consulta;
	
	var medicoxInsti = new MedicoxInsti();

	

	if(medicoId && instiId){
		
		medicoxInsti.medico = medicoId;
		medicoxInsti.institucion = instiId;
	}


	MedicoxInsti.findOne({"medico":medicoId, "institucion":instiId}).exec((err,relstored) =>{

		if (err) return res.status(500).send({message : "Ocurrio un problema"});

		if (relstored){

			if (consulta == 1) 
			{
				res.status(200).send({message : "eso fue una consulta", type:1});

			}
			else
			{			
				MedicoxInsti.findByIdAndRemove(relstored._id,(err,ponse)=>{

					console.log("borro");

					if (err) res.status(500).send({message : "Ocurrio un error"});

					if (ponse) res.status(200).send({message : "El medico se borro correctamente", type: 1});

					if (!ponse) res.status(404).send({message : "No se encontro una relacion"});

				});
			}

		}

		if (!relstored){

			console.log("creo");

			if (consulta == 1){
				 res.status(200).send({message : "eso fue una consulta", type:0});
				}
			else{
				medicoxInsti.save((err,addmedicostored)=>{

					if (err) return res.status(500).send({message : "Error en la peticion"});

					if (!addDelMedico) res.status(404).send({message: "No se pudo añadir al medico"});

					if (addmedicostored) res.status(200).send({message : "Se agrego al medico", type : 0});

				});
			}
		}

	});

}


async function followThisUser(identity_user_id, user_id){
	var following = await Follow.findOne({"user":identity_user_id, "followed":user_id}).exec((err, follow) => {
			if(err) return handleError(err); 
			return follow;
		});

	var followed = await Follow.findOne({"user":user_id, "followed":identity_user_id}).exec((err, follow) => {
			if(err) return handleError(err); 
			return follow;
		});

	return {
		following: following,
		followed: followed
	}
}

// Devolver un listado de usuarios paginado
function getUsers(req, res){
	var identity_user_id = req.user.sub;
	console.log(identity_user_id);

	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}

	var itemsPerPage = 3;

	User.find(
		
		
			
				{_id: {'$ne' :identity_user_id},
				role: 'usuario'}
		
		
	).sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

		followUserIds(identity_user_id).then((value) => {
			

			return res.status(200).send({
				users,
				users_following: value.following,
				users_follow_me: value.followed,
				total,
				pages: Math.ceil(total/itemsPerPage),
				actual : page
			});
		
		});

	});	
}

async function followUserIds(user_id){
	var following = await Follow.find({"user":user_id}).select({'_id':0, '__v':0, 'user':0}).exec((err, follows) => {
		return follows;
	});

	var followed = await Follow.find({"followed":user_id}).select({'_id':0, '__v':0, 'followed':0}).exec((err, follows) => {
		return follows;
	});

	// Procesar following ids
	var following_clean = [];

	following.forEach((follow) => {
		following_clean.push(follow.followed);
	});
	
	// Procesar followed ids
	var followed_clean = [];

	followed.forEach((follow) => {
		followed_clean.push(follow.user);
	});
	
	return {
		following: following_clean,
		followed: followed_clean
	}
}


function getCounters(req, res){
	var userId = req.user.sub;
	if(req.params.id){
		userId = req.params.id;
	}

	getCountFollow(userId).then((value) => {
		return res.status(200).send(value);
	});
}

async function getCountFollow(user_id){
	var following = await Follow.count({"user":user_id}).exec((err, count) => {
		if(err) return handleError(err);
		return count;
	});

	var followed = await Follow.count({"followed":user_id}).exec((err, count) => {
		if(err) return handleError(err);
		return count;
	});

	var publications = await Publication.count({"user":user_id}).exec((err, count) => {
		if(err) return handleError(err);
		return count;
	});

	return {
		following: following,
		followed: followed,
		publications: publications
	}
}

// Edición de datos de usuario
function updateUser(req, res){
	var userId = req.params.id;
	var userupdt = req.body;

	// borrar propiedad password
	delete userupdt.password;

	//console.log(update);

	if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
	}

	User.find({ $or: [
				 {_id: userId},
		 ]}).exec((err, users) => {
		 
		 	var user_isset = false;
		 	users.forEach((user) => {
		 		if(user && user._id != userId) user_isset = true;
		 	});

		 	if(user_isset) return res.status(404).send({message: 'Los datos ya están en uso'});
		 	
		 	User.findByIdAndUpdate(userId, userupdt, {new:true}, (err, userUpdated) => {
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({user: userUpdated,message : "La informacion se actualizo correctamente"});
			});

		 });

}

// Subir archivos de imagen/avatar de usuario
function uploadImage(req, res){
	var userId = req.params.id;

	//console.log(req);

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];


		if(userId != req.user.sub){
			return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
		}

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
			 
			 // Actualizar documento de usuario logueado
			 User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				//return res.status(200).send({user: userUpdated});

				return res.status(200).send({message : "La imagen se modifico correctamente"});
			 });

		}else{
			return removeFilesOfUploads(res, file_path, 'Extensión no válida');
		}

	}else{
		return res.status(200).send({message: 'No se han subido imagenes'});
	}
}

function removeFilesOfUploads(res, file_path, message){
	fs.unlink(file_path, (err) => {
		return res.status(200).send({message: message});
	});
}

function borrarArchivo(file_path){
	fs.unlink(file_path, (err) => {
		return res.status(200).send("ok");
	});
}

function getImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/users/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

function uploadCurriculum(req, res){
	var userId = req.params.id;
	

	console.log(req.files);
    if(userId != req.user.sub){
		if(req.files.curriculum.path)
		removeFilesOfUploads(res,req.files.curriculum.path,"no tienes permisos para modificar otro usuario");
		else
        res.status(500).send({message : 'no tienes permisos para modificar otro usuario'
    });

    }else{
	if(req.files){
		var file_path = req.files.curriculum.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[3];

		var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
		if(file_ext == 'xls' || file_ext == 'pdf' || file_ext == 'docx' || file_ext == 'doc' || file_ext == 'txt'){

			User.findByIdAndUpdate(userId, {curriculumfile: file_name},{new : true}, (err, userUpdated) => {
				if(!userUpdated){
					borrarArchivo(file_path);
					res.status(404).send({message: 'No se ha podido actualizar el curriculum'});
					
				}else{
					res.status(200).send({curriculumfile: file_name, user: userUpdated});
				}
			});

		}else{
			borrarArchivo(file_path);
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ningun archivo...'});
    }
}
}

function getCurriculumFile(req, res){
    var curriculumFile = req.params.curriculumFile;
	
	
	var path_file = './uploads/curriculums/'+curriculumFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe curriculum...'});
		}
	});
}


function activateAcc(req, res){
	var userId = req.params.id;
		 	
			 User.findByIdAndUpdate(userId, {activo: true},{new : true}, (err, userUpdated) => {
				if(!userUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el estado'});
				}else{
					//res.status(200).send({activo: true, user: userUpdated});
					res.redirect('http:localhost/socialmedica2.0/views/login.html');
				}

		 });

}


function getUserData(req, res){

	User.findById(req.user.sub, (err, user) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!user) return res.status(404).send({message: 'El usuario no existe'});

		if(user) return  res.status(200).send(user);

	});
}







//return res.status(200).send(user);
module.exports = {
	home,
	pruebas,
	saveUser,
	loginUser,
	getUser,
	getUsers,
	getCounters,
	updateUser,
	uploadImage,
	getImageFile,
	uploadCurriculum,
	getCurriculumFile,
	activateAcc,
	getUserData,
	addDelMedico
}