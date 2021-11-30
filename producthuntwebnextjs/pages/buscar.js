import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";

// Components
import Layout from '../components/layout/Layout';
import DetalleProducto from '../components/layout/DetalleProducto';

// Hooks
import useProductos from '../hooks/useProductos';

const Buscar = () => {
  // Accediendo a los parámetros que vienen desde el componente Buscar
  const router = useRouter();
  //console.log(router);
  const {
    query: { q },
  } = router;

  // Todos los productos
  const {productos}=useProductos('creado');

  // State que almacena los productos que coinciden con la búsqueda
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Filtrado de productos
    const busqueda = q.toLowerCase();
    const filtroProductos=productos.filter(producto=>(
      producto.nombre.toLowerCase().includes(busqueda) || 
      producto.descripcion.toLowerCase().includes(busqueda)
    ));
    setResultados(filtroProductos);
  }, [q, productos]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                // Iterando sobre los productos
                resultados.map(producto=>(
                  <DetalleProducto 
                    key={producto.id}
                    producto={producto}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
