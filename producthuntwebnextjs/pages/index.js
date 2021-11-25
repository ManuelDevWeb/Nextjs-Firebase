import React, {useEffect, useState, useContext} from 'react';

// Context
import firebase from '../firebase';

// Components
import Layout from '../components/layout/Layout';

// Styles


const  Home=()=> {
  // State de los productos
  const [productos, setProductos] = useState([]);

  /*
    Podemos manejar extraer el Context firebase de la siguiente forma, 
    (Se debe importar {FirebaseContext} from '../firebase/index')
     const { firebase } = useContext(FirebaseContext);
  */

  // UseEffect para obtener los productos
  useEffect(()=>{
    const getProducts=()=>{
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(handleSnapshot);
    }
    getProducts();
  },[])

  // Función para manejar el snapshot que contiene la información de los productos de la BD
  function handleSnapshot(snapshot){
    // Creamos el array de objetos con cada uno de los productos del snapshot
    const productos=snapshot.docs.map(doc=>(
      {
        id: doc.id,
        ...doc.data()
      }
    ));
    // console.log(products);
    setProductos(productos);
  }

  return (
    <div>
      <Layout>
        <h1>Inicio</h1>
      </Layout>
    </div>
  )
}

export default Home;