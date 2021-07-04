class Producto {
    constructor(nombre, precio, descripcion, imagen, fecha, categoria, estado, visualizaciones, usuario){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha = fecha;
        this.categoria = categoria;
        this.estado = estado;
        this.visualizaciones = visualizaciones;
        this.usuario = usuario;
    }
}

module.exports = Producto;