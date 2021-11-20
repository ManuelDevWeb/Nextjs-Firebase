// Inicializando firebase

import app from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configuración Firebase
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
    }

    // Función que registra un usuario
    async registrar(nombre, email, password) {
        // Creamos el usuario
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        // Al mismo tiempo, actualizamos el nombre del usuario
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    // Función para iniciar sesión
    async login(email, password) {
        // Iniciamos sesión
        return await this.auth.signInWithEmailAndPassword(email, password);
    }
}

const firebase = new Firebase();

export default firebase;