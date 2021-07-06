function alerta()
    {
    var mensaje;
    var opcion = confirm("¿Está seguro que desea realizar esta compra?");
    if (opcion == true) {
        mensaje = "Has clickado OK";
	} else {
	    mensaje = "Has clickado Cancelar";
	}
	document.getElementById("ejemplo").innerHTML = mensaje;
}