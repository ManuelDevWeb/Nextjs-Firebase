// Styles
import styled from "@emotion/styled";

const Formulario = styled.form `
    max-width:600px;
    width: 95%;
    margin: 5rem auto 0 auto;
`;

const Campo = styled.div `
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label{
        flex: 0 0 150px; // Width del flexbox
        font-size: 1.8rem;

    }

    input{
        flex: 1; // Toma el espacio restante
        padding: 1rem;
    }
`;

const InputSubmit = styled.input `
    background-color:var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;    

    &:hover{
        cursor: pointer;
    }
`;

const Error = styled.p `
    background-color: red;
    padding: 1rem;
    font-size: 1.4rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;


export { Formulario, Campo, InputSubmit, Error };