const Usuario = require('../models/Usuario');
const { UsuarioRepositorio, ProductoRepositorio } = require('../persistencia/repository');
const Producto = require('../models/Producto');

var usuarioActual = undefined;

class Controlador {

    static async crearUsuario(nombre, apellidos, usuario, contrasena, email, credito, provincia) {
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
        usuarioActual = new Usuario(aux.nombre, aux.apellidos, aux.usuario, aux.contrasena, aux.email, aux.credito, aux.provincia);
        usuarioActual.id = aux.id;
        return usuarioActual;
    }

    static getUsuarioActual() {
        return usuarioActual;
    }

    static async updateUsuario(nombre, apellidos, contrasena, email, credito, provincia) {
        usuarioActual.nombre = nombre;
        usuarioActual.apellidos = apellidos;
        usuarioActual.contrasena = contrasena;
        usuarioActual.email = email;
        usuarioActual.credito = credito;
        usuarioActual.provincia = provincia;

        await UsuarioRepositorio.update(usuarioActual);
        return usuarioActual;
    }

    static logout() {
        usuarioActual = undefined;
    }

    //Productos
    static async crearProducto(nombre, precio, descripcion, imagen, fecha, categoria, estado) {
        var currentId = Controlador.getUsuarioActual().id;
        var visualizaciones = 0;
        var producto = new Producto(nombre, precio, descripcion, imagen, fecha, categoria, estado, visualizaciones, currentId);
        await ProductoRepositorio.add(producto);
    }

    static async getProductoById(id) {
        const producto = await ProductoRepositorio.get(id);
        return producto;
    }

    static async buscarProductosUsuarioActual() {
        var currentId = Controlador.getUsuarioActual().id;
        var productos = await ProductoRepositorio.getByusuario(currentId);
        return productos;
    }

    static async buscarProductos() {
        var currentId = Controlador.getUsuarioActual().id;
        var productos = await ProductoRepositorio.getAllSinMisProductos(currentId);
        productos.forEach(p => {
            p.visualizaciones += 1;
            ProductoRepositorio.update(p);
        });
        return productos;
    }

    static async buscarConFiltro(nombre, estado, precioMin, precioMax, categoria) {

        var currentId = Controlador.getUsuarioActual().id;
        if (nombre === '' && estado === '' && precioMin === '' && precioMax === '' && categoria === '') {
            const productos = await Controlador.buscarProductos();
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


        const productos = await ProductoRepositorio.buscarConFiltros(queryString);
        productos.forEach(p => {
            p.visualizaciones += 1;
            ProductoRepositorio.update(p);
        });
        return productos;

    }

    static async comprarProducto(idProducto, usuarioActual) {

        var producto = await ProductoRepositorio.get(idProducto);
        var vendedor = await UsuarioRepositorio.getById(producto.usuario);
        if (usuarioActual.credito < producto.precio)
            return false;

        usuarioActual.credito -= producto.precio;
        vendedor.credito += parseInt(producto.precio);
        producto.comprador = usuarioActual.id;

        await UsuarioRepositorio.update(usuarioActual);
        await UsuarioRepositorio.update(vendedor);
        await ProductoRepositorio.update(producto);

        return true;
    }

    static async cambiarProducto(productoId, miProductoId) {
        const miProducto = await ProductoRepositorio.get(miProductoId);
        const producto = await ProductoRepositorio.get(productoId);

        //Tratar fallo
        if (miProducto.precio < producto.precio) {
            return false;
        }
        else {
            producto.cambiado_por = Controlador.getUsuarioActual().id;
            await ProductoRepositorio.update(producto);

            miProducto.cambiado_por = producto.usuario;
            await ProductoRepositorio.update(miProducto);

            return true;
        }

    }

    static async borrarProducto(idProducto) {
        await ProductoRepositorio.delete(idProducto);
    }
}

module.exports = Controlador;