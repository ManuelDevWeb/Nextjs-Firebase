import React, { useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";

// Context
import { FirebaseContext } from "../firebase/index";

// Components
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import Error404 from "../components/layout/404";

// Styles
import { css } from "@emotion/react";

// Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  //imagen: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  // State para manejar el error
  const [error, setError] = useState(false);

  // State para manejar las imagenes
  const [nombreImagen, setNombreImagen] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState("");

  // Implementando custom hook useValidacion
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  // Destructuring a los valores del custom hook useValidacion
  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Hook de routing para redireccionar
  const router = useRouter();

  // Extrayendo del Context las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  // console.log(usuario);

  // Función que se ejecuta cuando el usuario hace submit en el formulario
  async function crearProducto() {
    // Si el usuario no está autenticado, redireccionar al login
    if (!usuario) {
      return router.push("/login");
    }

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        // Estos datos vienen del usuario del context
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      usuariosVotaron:[]
    };

    // Insertar el producto en la BD
    await firebase.db.collection("productos").add(producto);

    return router.push("/");
  }

  // Función que se ejecuta cuando se empieza a subir una imagen
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  // Función para saber el estado del progreso de la subida de la imagen
  const handleProgress = (progreso) => setProgreso(progreso);

  // Función que se ejecuta cuando hay un error al subir la imagen
  const handleUploadError = (error) => {
    setSubiendo(error);
    console.log(error);
  };

  // Función que se ejecuta cuando se termina de subir la imagen exitosamente
  const handleUploadSuccess = (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        // console.log(url);
        setUrlImagen(url);
      });
  };

  return (
    <div>
      <Layout>
        {
          // Si no hay un usuario logeado le mostramos el componente Error404
          !usuario ? (
            <Error404 />
          ) : (
            <>
              <h1
                css={css`
                  text-align: center;
                  margin-top: 5rem;
                `}
              >
                Nuevo Producto
              </h1>

              <Formulario onSubmit={handleSubmit} noValidate>
                <fieldset>
                  <legend>Información General</legend>

                  <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      placeholder="Nombre"
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>
                  {
                    // Si hay un error en el campo nombre, se muestra
                    errores.nombre ? <Error>{errores.nombre}</Error> : null
                  }

                  <Campo>
                    <label htmlFor="empresa">Empresa</label>
                    <input
                      type="text"
                      id="empresa"
                      placeholder="Nombre Empresa"
                      name="empresa"
                      value={empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>
                  {
                    // Si hay un error en el campo empresa, se muestra
                    errores.empresa ? <Error>{errores.empresa}</Error> : null
                  }

                  <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <FileUploader
                      accept="image/*"
                      id="imagen"
                      name="imagen"
                      randomizeFilename
                      storageRef={firebase.storage.ref("productos")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                    />
                  </Campo>

                  <Campo>
                    <label htmlFor="url">URL</label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      placeholder="URL del producto"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>
                  {
                    // Si hay un error en el campo imagen, se muestra
                    errores.url ? <Error>{errores.url}</Error> : null
                  }
                </fieldset>

                <fieldset>
                  <legend>Sobre tu producto</legend>

                  <Campo>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>
                  {
                    // Si hay un error en el campo imagen, se muestra
                    errores.descripcion ? (
                      <Error>{errores.descripcion}</Error>
                    ) : null
                  }
                </fieldset>

                {
                  // Si existe un error, se muestra
                  error && <Error>{error}</Error>
                }

                <InputSubmit type="submit" value="Crear Producto" />
              </Formulario>
            </>
          )
        }
      </Layout>
    </div>
  );
};

export default NuevoProducto;
