import React, {useState, useEffect} from 'react';

const useValidacion = (stateInicial, validar, funcionOnSubmit) => {
    // Valores que el usuario coloca en los inputs
    const [valores, setValores] = useState(stateInicial);
    // Errores que se muestran en los inputs
    const [errores, setErrores] = useState({});
    // Flag para indicar si el formulario es valido o no y así poder ejecutarse
    const [submitForm, setSubmitForm] = useState(false);

    // useEffect que se ejecuta una sola vez
    useEffect(()=>{
        if(submitForm){
            // Validando si el objeto de errores esta vacio
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                // Si no hay errores se ejecuta la función onSubmit
                funcionOnSubmit();
            }
            
            setSubmitForm(false);
        }
    },[]);

    // Función que se ejecuta conforme el usuario escribe en los inputs
    const handleChange = e => {
        const {name, value} = e.target;
        // Almacenando en el state valores lo que el usuario escribe en los inputs
        setValores({
            ...valores,
            [name]: value
        });
    };

    // Función que se ejeucta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        // Validando si el formulario es valido
        const erroresValidacion = validar(valores);
        // Almacenando en el state errores lo que se obtiene de la validación
        setErrores(erroresValidacion);
        // Almacenando en el state submitForm el valor true para indicar que el formulario es valido
        setSubmitForm(true);
    };

    return {
        valores,
        errores,
        submitForm,
        handleChange,
        handleSubmit
    }
}
 
export default useValidacion;