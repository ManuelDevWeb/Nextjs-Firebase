import React, { useState, useEffect } from 'react';

// Firebase
import firebase from "../firebase/index";

// Custom hook para detectar si el usuario esta autenticado y guardar la sesión
const useAutenticacion = () => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setUsuarioAutenticado(usuario);
            } else {
                setUsuarioAutenticado(null);
            }
        });

        return () => unsuscribe();
    }, []);

    return usuarioAutenticado;
}

export default useAutenticacion;