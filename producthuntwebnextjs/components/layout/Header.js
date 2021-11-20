import React,{useContext} from "react";
import Link from "next/link";

// Components
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Boton from "../ui/Boton";

// Context
import {FirebaseContext} from '../../firebase';

// Styles
import styled from "@emotion/styled";
import { css } from "@emotion/react";


const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem; // 40px
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

const Header = () => {
  // Destructuring a los elementos que necesitamos del context
  const {usuario, firebase} = useContext(FirebaseContext);

  return (
    <header
      // Estilos header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <ContenedorHeader>
        <div
            css={css`
                display: flex;
                align-items: center;
            `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Buscar />
          
          <Navegacion />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {
            // Validando si el usuario esta autenticado
            usuario ? (
              <>
                <p
                  css={css`
                    margin-right: 2rem;
                  `}
                >
                  Hola: {usuario.displayName}
                </p>

                <Boton 
                  bgColor
                  // Al dar click se ejecuta la función para cerrar sesión
                  onClick={() => firebase.logout()}
                >Cerrar Sesión</Boton>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Boton bgColor>Login</Boton>
                </Link>

                <Link href="/crear-cuenta">
                  <Boton>Crear Cuenta</Boton>
                </Link>
              </>
            )
          }
        </div>
      </ContenedorHeader>
    </header>
  );
};

export default Header;
