class Usuario {
    constructor(nombre, apellidos, usuario, contrasena, email, credito, provincia){
        this.id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.email = email;
        this.credito = credito;
        this.provincia = provincia;
    }

    comprarProducto(producto, vendedor){
        console.log('VENDEDOR DENTRO 1: ', vendedor);
        if(this.credito < producto.precio)
            return false;

        this.credito -= producto.precio;
        vendedor.credito += parseInt(producto.precio);
        producto.comprador = this.id;

        console.log('VENDEDOR DENTRO: 2', vendedor);

        return true;
    }

}

module.exports = Usuario;