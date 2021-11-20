const validarCrearProducto = (valores) => {
    let errores = {};

    // Validar el nombre del producto
    if (!valores.nombre) {
        errores.nombre = 'El nombre del producto es obligatorio';
    }

    // Validar empresa
    if (!valores.empresa) {
        errores.empresa = 'El nombre de la empresa es obligatorio';
    }

    // Validar url
    if (!valores.url) {
        errores.url = 'La url es obligatoria';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'La url no es valida o está mal formateada';
    }

    // Validar descripcion
    if (!valores.descripcion) {
        errores.descripcion = 'La descripción es obligatoria';
    }

    return errores;

}

export default validarCrearProducto;