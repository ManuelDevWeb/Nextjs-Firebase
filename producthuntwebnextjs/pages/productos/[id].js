import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

// Context
/*
    También, podemos manejar extraer el Context firebase de la siguiente forma, 
    (Se debe importar firebase from '../firebase')     
*/
import { FirebaseContext } from "../../firebase";

// Componentes
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";

const Producto = () => {
  // State para manejar el producto
  const [producto, setProducto] = useState({});
  // State para manejar el error
  const [error, setError] = useState(false);

  // Context de firebase
  const { firebase } = useContext(FirebaseContext);

  // Routing para obtener el id actual
  const router = useRouter();
  //console.log(router);
  const {
    query: { id },
  } = router;

  useEffect(() => {
    // Validamos que si venga un id por la url
    if (id) {
      const obtenerProducto = async () => {
        // Obtenemos por id, el producto de firebase
        const productoQuery = await firebase.db.collection("productos").doc(id);
        // Almacenamos el producto en una variable para enviarlo al estado
        const producto = await productoQuery.get();
        // console.log(producto.data());

        // Validando que exista el producto
        if (producto.exists) {
          // Almacenamos el producto en el state
          setProducto(producto.data());
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  return (
    <Layout>
      <>
        {
          // Si error es verdadero retornamos componente Error404
          error && <Error404 /> 
        }        
      </>
    </Layout>
  );
};

export default Producto;
