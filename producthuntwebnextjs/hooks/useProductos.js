import React, { useState, useEffect, useContext } from "react";

// Context
import { FirebaseContext } from "../firebase";

const useProductos = (orden) => {
  // State de los productos
  const [productos, setProductos] = useState([]);

  // Firebase
  const {firebase} = useContext(FirebaseContext);

  // UseEffect para obtener los productos
  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("productos")
        .orderBy(orden, "desc")
        .onSnapshot(handleSnapshot);
    };
    getProducts();
  }, []);

  // Función para manejar el snapshot que contiene la información de los productos de la BD
  function handleSnapshot(snapshot) {
    // Creamos el array de objetos con cada uno de los productos del snapshot
    const productos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(products);
    setProductos(productos);
  }

  return {
    productos,
  };
};

export default useProductos;
