const Usuario = require('../models/users');
const { UsuarioRepositorio, ProductoRepositorio} = require('../persistencia/repository');

var currentUser = undefined;

class Controlador {

    static async createUsuario(nombre, apellidos, usuario, contrasena, email, credito, provincia) {
        var res = await UsuarioRepositorio.get(usuario);
        if(res !== undefined)
            return false
        
        var nuevoUsuario = new Usuario(nombre, apellidos, usuario, contrasena, email, credito, provincia);
        await UsuarioRepositorio.add(nuevoUsuario);
        return true;
    }

    static async login(usuario, contrasena) {
        var aux = await UsuarioRepositorio.login(usuario, contrasena);
        if(aux === undefined) return undefined;
        currentUser = new Usuario(aux.nombre, aux.apellidos, aux.usuario, aux.contrasena, aux.email, aux.credito, aux.provincia);
        currentUser.id = aux.id;
        console.log(currentUser);
        return currentUser;
    }

    //Puede que no haga falta si se usa como variable glboal.
    static getCurrentUser(){
        return currentUser;
    }

    static async updateProfile(nombre, apellidos, email, credito, provincia){
        currentUser.nombre = nombre;
        currentUser.apellidos = apellidos;
        currentUser.mail = email;
        currentUser.credito = credito;
        currentUser.provincia = provincia;

        await UsersRepository.update(currentUser);
        return currentUser;
    }

    static logout(){
        currentUser = undefined;
    }

    static async getBoughtProducts(){
        var products = ProductsRepository.getBoughtProducts(currentUser.id);
        return products;
    }
}

module.exports = Controlador;