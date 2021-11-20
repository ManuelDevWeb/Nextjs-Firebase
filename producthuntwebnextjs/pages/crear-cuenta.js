import React,{useState} from "react";
import Router from "next/router";

// Firebase
import firebase from "../firebase/index";

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
import validarCrearCuenta from "../validacion/validarCrearCuenta";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  // State para manejar el error
  const [error, setError] = useState(false);

  // Implementando custom hook useValidacion
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  // Destructuring a los valores del custom hook useValidacion
  const { nombre, email, password } = valores;

  // Función que se ejecuta cuando el usuario hace submit en el formulario
  async function crearCuenta() {
    try {
      // Llamando la función registrar del componente firebase
      await firebase.registrar(nombre, email, password);

      // Redireccionando al usuario a la página principal
      Router.push("/");
    } catch (error) {
      console.log("Hubo un error al crear el usuario", error.message);
      setError(error.message);
    }
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
            Crear Cuenta
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Si hay un error en el campo email, se muestra
              errores.email ? <Error>{errores.email}</Error> : null
            }

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Si hay un error en el campo password, se muestra
              errores.password ? <Error>{errores.password}</Error> : null
            }

            {
              // Si existe un error, se muestra
              error &&  <Error>{error}</Error>
            }

            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
