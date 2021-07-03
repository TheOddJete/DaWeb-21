class Product {
    constructor(nombre, precio, descripcion, foto, fecha, visualizaciones, estado, categoria, usuario){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.foto = foto;
        this.fecha = fecha;
        this.visualizaciones = visualizaciones;
        this.estado = estado;
        this.categoria = categoria;
        this.usuario = usuario;
    }
}

module.exports = Product;