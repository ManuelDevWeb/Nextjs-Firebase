import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

// Context
/*
    También, podemos manejar extraer el Context firebase de la siguiente forma, 
    (Se debe importar firebase from '../firebase')     
*/
import { FirebaseContext } from "../../firebase";

// Componentes
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import { Campo, InputSubmit } from "../../components/ui/Formulario";

// Styles
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    // Dividimos en 3 columnas
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

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

      setTimeout(() => {
        obtenerProducto();
      }, 1000);
    }
  }, [id]);

  // Si las keys del objeto producto es 0, mostramos mensaje de carga o spiner
  if (Object.keys(producto).length === 0 && !error) {
    return "Cargando...";
  }

  // Destructuring al objeto producto almacenado en el state
  const {
    nombre,
    empresa,
    url,
    urlImagen,
    descripcion,
    votos,
    comentarios,
    creado,
  } = producto;

  return (
    <Layout>
      <>
        {
          // Si error es verdadero retornamos componente Error404
          error && <Error404 />
        }
        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {nombre}
          </h1>

          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:{" "}
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>

              <img src={urlImagen} alt={nombre} />

              <p>{descripcion}</p>

              <h2>Agrega tu comentario</h2>
              <form action="">
                <Campo>
                  <input type="text" name="mensaje" />
                </Campo>
                <InputSubmit type="submit" value="Agregar Comentario" />
              </form>

              <h2
                css={css`
                    margin: 2rem 0;
                `}
              >Comentarios</h2>
              {
                  // Mapeando sobre los comentarios del producto
                  comentarios.map((comentario)=>(
                      <li>
                          <p>{comentario.nombre}</p>
                          <p>Escrito por: {comentario.usuarioNombre}</p>
                      </li>
                  ))
              }
            </div>

            <aside>2</aside>
          </ContenedorProducto>
        </div>
      </>
    </Layout>
  );
};

export default Producto;
