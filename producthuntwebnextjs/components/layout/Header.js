import React from 'react';
import Link from 'next/link';

// Components
import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';

// Styles
import styled from '@emotion/styled';
import {css} from '@emotion/react';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;

    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo= styled.p`
    color: var(--naranja);
    font-size: 4rem; // 40px
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;




const Header = () => {
    return (  
        <header
            // Estilos header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    
                    <Buscar/>
                    <Navegacion />
                </div>
                <div>
                    <p>Hola: Manuel</p>
                    <button type="button">Cerrar Sesión</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear Cuenta</Link>
                </div>
            </ContenedorHeader>
        </header>
    );
}
 
export default Header;