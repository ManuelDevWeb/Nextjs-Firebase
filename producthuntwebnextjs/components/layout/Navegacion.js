import React from 'react';
import Link from "next/link";

const Navegacion = () => {
    return (
        <nav>
            <Link href="/">Inicio</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/nosotros">Nuevo Producto</Link>
        </nav>
    );
}
 
export default Navegacion;