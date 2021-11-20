// Envolvemos nuestra aplicación en el contexto

import App from 'next/app';

// Importando elementos para conectar firebase con el context de nuestra aplicación
import firebase, {FirebaseContext} from '../firebase';

// Iniciar sesion
import useAutenticacion from '../hooks/useAutenticacion';

const MyApp=props=>{
    const usuario=useAutenticacion();
    console.log(usuario);

    // Componente actual y sus props
    const {Component, pageProps}=props;

    return(        
        <FirebaseContext.Provider 
            value={{firebase}}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp;