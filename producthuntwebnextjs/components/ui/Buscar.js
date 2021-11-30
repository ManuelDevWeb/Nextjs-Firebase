import React, {useState} from 'react';
import Router from 'next/router';

// Styles
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const InputText= styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    // Ocultar texto de la etiqueta
    text-indent: -9999px; 

    &:hover {
        cursor: pointer;
    }
`;

const Buscar = () => {
    // State para manejar lo que el usuario escribe
    const [busqueda, setBusqueda]=useState('');

    // Función para guardar en el state lo que el usuario digita
    const handleChange= e => {
        setBusqueda(e.target.value);
    }

    // Función que se ejecuta cuando el usuario da submit en buscar
    const buscarProducto= e => {
        e.preventDefault();

        // Validar que haya una busqueda
        if(busqueda.trim()==='') return;

        // Redireccionar al usuario y enviando parámetros a la page buscar
        Router.push({
            pathname: '/buscar',
            query:{
                // Lo que el usuario busca, se pasa como q
                q: busqueda
            }
        })

    }

    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={buscarProducto}
        >
            <InputText 
                type="text" 
                placeholder="Buscar productos"
                onChange={handleChange}
            />
            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
    );
}
 
export default Buscar;