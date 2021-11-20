// Envolvemos nuestra aplicación en el contexto

import App from 'next/app';

// Importando elementos para conectar firebase con el context de nuestra aplicación
import firebase, {FirebaseContext} from '../firebase';

const MyApp=props=>{
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