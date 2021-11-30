import React from 'react';

// Components
import Layout from '../components/layout/Layout';
import DetalleProducto from '../components/layout/DetalleProducto';

// Hooks
import useProductos from '../hooks/useProductos';

const  Home=()=> {
  // Enviando el parametro al custom hook para obtener el valor del return
  const {productos} = useProductos('creado');

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                // Iterando sobre los productos
                productos.map(producto=>(
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
  )
}

export default Home;