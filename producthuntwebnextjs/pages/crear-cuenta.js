import React from "react";

// Components
import Layout from "../components/layout/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

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
  // Implementando custom hook useValidacion
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  // Destructuring a los valores del custom hook useValidacion
  const {nombre, email, password} = valores;

  // Función que se ejecuta cuando el usuario hace submit en el formulario
  function crearCuenta() {
    console.log("Creando cuenta...");
  };

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
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
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

            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
