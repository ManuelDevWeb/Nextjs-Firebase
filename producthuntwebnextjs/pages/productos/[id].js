import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
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
import Boton from "../../components/ui/Boton";

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

const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Producto = () => {
  // State para manejar el producto
  const [producto, setProducto] = useState({});
  // State para manejar el error
  const [error, setError] = useState(false);
  // State para manejar los comentarios
  const [comentario, setComentario] = useState({});
  // State para consultar BD
  const [consultarDB, setConsultarDB] = useState(true);

  // Context de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  // Routing para obtener el id actual
  const router = useRouter();
  //console.log(router);
  const {
    query: { id },
  } = router;

  useEffect(() => {
    // Validamos que si venga un id por la url
    if (id && consultarDB) {
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
          // Reseteamos consultarDB
          setConsultarDB(false);
        } else {
          setError(true);
          // Reseteamos consultarDB
          setConsultarDB(false);
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
    creador,
    usuariosVotaron,
  } = producto;

  // Función para administrar y validar los votos
  const votarProducto = () => {
    // Si no existe ningun usuario enviamos al login
    if (!usuario) {
      return Router.push("/login");
    }

    // Obtener y sumar un nueveo voto
    const nuevoTotal = votos + 1;

    // Verificar si el usuario actual ha votado o no
    if (usuariosVotaron.includes(usuario.uid)) {
      return;
    }

    // Guardar el ID del usuario que ha votado
    const nuevoUsuarioVoto = [...usuariosVotaron, usuario.uid];

    // Actualizar en la BD
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ votos: nuevoTotal, usuariosVotaron: nuevoUsuarioVoto });

    // Actualizar el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });

    // Reseteamos consultarDB
    setConsultarDB(true);
  };

  // Función para almacenar comentarios en el state
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  // Función para agregar comentario en el producto
  const agregarComentario = (e) => {
    e.preventDefault();

    // Si no existe ningun usuario enviamos al login
    if (!usuario) {
      return router.push("/login");
    }

    // Información extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // Agregando comentarios al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ comentarios: nuevosComentarios });

    // Actualizar el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    // Reseteamos consultarDB
    setConsultarDB(true);
  };

  // Función que identifica si el comentario es del creador del producto
  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };

  // Función que revisa que el creados del producto sea el mismo que está autenticado
  const puedeBorrar = () => {
    // Validando si hay un usuario autenticado
    if (!usuario) return false;

    // Validando que el usuario logeado sea el creador del producto
    if (creador.id === usuario.uid) {
      return true;
    }
  };

  // Función para eliminar producto de la BD
  const eliminarProducto = async()=>{
    // Validando que si haya un usuario logeado
    if(!usuario){
      return router.push("/login");
    }

    // Validando que el usuario logeado sea el creador del producto
    if (creador.id !== usuario.uid) {
      return router.push("/login");
    }

    try {
      // Eliminando producto de la BD
      await firebase.db.collection("productos").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <>
        {
          // Si error es verdadero retornamos componente Error404
          error ? (
            <Error404 />
          ) : (
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

                  <p>
                    Publicador por: {creador.nombre}, de {empresa}
                  </p>

                  <img src={urlImagen} alt={nombre} />

                  <p>{descripcion}</p>

                  {
                    // Validando que haya un usuario logeado
                    usuario && (
                      <>
                        <h2>Agrega tu comentario</h2>
                        <form onSubmit={agregarComentario}>
                          <Campo>
                            <input
                              type="text"
                              name="mensaje"
                              onChange={comentarioChange}
                            />
                          </Campo>
                          <InputSubmit
                            type="submit"
                            value="Agregar Comentario"
                          />
                        </form>
                      </>
                    )
                  }

                  <h2
                    css={css`
                      margin: 2rem 0;
                    `}
                  >
                    Comentarios
                  </h2>

                  {comentarios.length === 0 ? (
                    "Aún no hay comentarios"
                  ) : (
                    <ul>
                      {
                        // Mapeando sobre los comentarios del producto
                        comentarios.map((comentario, i) => (
                          <li
                            key={`${comentario.usuarioId}-${i}`}
                            css={css`
                              border: 1px solid #e1e1e1;
                              padding: 2rem;
                            `}
                          >
                            <p>{comentario.mensaje}</p>
                            <p>
                              Escrito por:
                              <span
                                css={css`
                                  font-weight: bold;
                                `}
                              >
                                {" "}
                                {comentario.usuarioNombre}
                              </span>
                            </p>
                            {
                              // Se muestra si esCreador() retorna true
                              esCreador(comentario.usuarioId) && (
                                <CreadorProducto>Es Creador</CreadorProducto>
                              )
                            }
                          </li>
                        ))
                      }
                    </ul>
                  )}
                </div>

                <aside>
                  <Boton target="_blank" bgColor="true" href={url}>
                    Visitrar URL
                  </Boton>

                  <div
                    css={css`
                      margin-top: 5rem;
                    `}
                  >
                    <p
                      css={css`
                        text-align: center;
                      `}
                    >
                      {votos} Votos
                    </p>

                    {
                      // Validando que haya un usuario logeado
                      usuario && <Boton onClick={votarProducto}>Votar</Boton>
                    }
                  </div>
                </aside>
              </ContenedorProducto>

              {
                // Se ejecuta si puede borrar retorna true
                puedeBorrar() && (
                  <Boton
                    css={css`
                      color: #000000;
                    `}
                    onClick={eliminarProducto}
                  >
                    Eliminar Producto
                  </Boton>
                )
              }
            </div>
          )
        }
      </>
    </Layout>
  );
};

export default Producto;
