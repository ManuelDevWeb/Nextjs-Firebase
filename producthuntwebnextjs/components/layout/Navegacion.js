import React from 'react';
import Link from "next/link";

// Styles
import styled from '@emotion/styled';

const Nav= styled.nav`
    padding-left: 2rem;

    a{
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;
    }

    &:last-of-type{
        margin-right: 0;
    }
`;

const Navegacion = () => {
    return (
        <Nav>
            <Link href="/">Inicio</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/nosotros">Nuevo Producto</Link>
        </Nav>
    );
}
 
export default Navegacion;