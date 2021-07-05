const Usuario = require('../models/Usuario');
const { UsuarioRepositorio, ProductoRepositorio } = require('../persistencia/repository');
const Producto = require('../models/Producto');

var currentUser = undefined;

class Controlador {

    static async createUsuario(nombre, apellidos, usuario, contrasena, email, credito, provincia) {
        var res = await UsuarioRepositorio.get(usuario);
        if (res !== undefined)
            return false
        var nuevoUsuario = new Usuario(nombre, apellidos, usuario, contrasena, email, credito, provincia);
        await UsuarioRepositorio.add(nuevoUsuario);
        return true;
    }

    static async login(usuario, contrasena) {
        var aux = await UsuarioRepositorio.login(usuario, contrasena);
        if (aux === undefined) return undefined;
        currentUser = new Usuario(aux.nombre, aux.apellidos, aux.usuario, aux.contrasena, aux.email, aux.credito, aux.provincia);
        currentUser.id = aux.id;
        return currentUser;
    }

    static getCurrentUser() {
        return currentUser;
    }

    static async updateUsuario(nombre, apellidos, contrasena, email, credito, provincia) {
        currentUser.nombre = nombre;
        currentUser.apellidos = apellidos;
        currentUser.contrasena = contrasena;
        currentUser.email = email;
        currentUser.credito = credito;
        currentUser.provincia = provincia;

        await UsuarioRepositorio.update(currentUser);
        return currentUser;
    }

    static logout() {
        currentUser = undefined;
    }

    //Productos
    static async createProduct(nombre, precio, descripcion, imagen, fecha, categoria, estado) {
        var currentId = Controlador.getCurrentUser().id;
        var visualizaciones = 0;
        var producto = new Producto(nombre, precio, descripcion, imagen, fecha, categoria, estado, visualizaciones, currentId);
        await ProductoRepositorio.add(producto);
    }

    static async searchCurrentUserProducts() {
        var currentId = Controlador.getCurrentUser().id;
        var productos = await ProductoRepositorio.getByusuario(currentId);
        return productos;
    }

    static async searchProducts() {
        var currentId = Controlador.getCurrentUser().id;
        var productos = await ProductoRepositorio.getAllNoMine(currentId);
        productos.forEach(p => {
            p.visualizaciones += 1;
            ProductoRepositorio.update(p);
        });
        return productos;
    }

    static async customSearch(nombre, estado, precioMin, precioMax, categoria) {

        var currentId = Controlador.getCurrentUser().id;
        if (nombre === '' && estado === '' && precioMin === '' && precioMax === '' && categoria === '') {
            const productos = await Controlador.searchProducts();
            return productos;
        }


        var queryString = "SELECT * FROM productos WHERE ( usuario != " + currentId;
        queryString += " AND"

        if (nombre !== '') {
            queryString += " nombre LIKE '%" + nombre + "%' AND";
        }

        if (estado !== '') {
            queryString += " estado = '" + estado + "' AND";
        }

        if (precioMin !== '') {
            queryString += " precio > " + precioMin + " AND";
        }

        if (precioMax !== '') {
            queryString += " precio < " + precioMax + " AND";
        }

        if (categoria !== '') {
            queryString += " categoria = '" + categoria + "' AND";
        }

        queryString += " comprador is NULL AND cambiado_por is NULL)";


        const productos = await ProductoRepositorio.customQuery(queryString);
        console.log("CONTROLADOR ", productos);
        productos.forEach(p => {
            p.visualizaciones += 1;
            ProductoRepositorio.update(p);
        });
        return productos;

    }

    static async comprarProducto(idProducto, currentUser) {

        console.log(idProducto);

        var producto = await ProductoRepositorio.get(idProducto);

        var vendedor = await UsuarioRepositorio.getById(producto.usuario);
        //var ok = currentUser.comprarProducto(producto, vendedor);

        if (currentUser.credito < producto.precio)
            return false;

        currentUser.credito -= producto.precio;
        vendedor.credito += parseInt(producto.precio);
        producto.comprador = currentUser.id;

        await UsuarioRepositorio.update(currentUser);
        await UsuarioRepositorio.update(vendedor);
        await ProductoRepositorio.update(producto);

        return true;
    }
}

module.exports = Controlador;