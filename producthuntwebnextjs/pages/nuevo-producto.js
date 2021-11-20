import React, { useState, useContext } from "react";
import Router, {useRouter} from "next/router";

// Context
import {FirebaseContext} from "../firebase/index";

// Components
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

// Styles
import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  //imagen: "",
  url:"",
  descripcion:""
};

const NuevoProducto = () => {
  // State para manejar el error
  const [error, setError] = useState(false);

  // Implementando custom hook useValidacion
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  // Destructuring a los valores del custom hook useValidacion
  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Hook de routing para redireccionar
  const router=useRouter();

  // Extrayendo del Context las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  // Función que se ejecuta cuando el usuario hace submit en el formulario
  async function crearProducto() {
    // Si el usuario no está autenticado, redireccionar al login
    if(!usuario){
      return router.push("/login");
    }

    // Crear el objeto de nuevo producto
    const producto={
      nombre,
      empresa,
      url,
      descripcion,
      votos:0,
      comentarios:[],
      creado: Date.now()
    }

    // Insertar el producto en la BD
    await firebase.db.collection("productos").add(producto);
  }

  return (
    <div>
      <Layout>
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
                  placeholder="Tu nombre"
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

              {/* <Campo>
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  value={imagen}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {
                // Si hay un error en el campo imagen, se muestra
                errores.imagen ? <Error>{errores.imagen}</Error> : null
              } */}

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
      </Layout>
    </div>
  );
};

export default NuevoProducto;
