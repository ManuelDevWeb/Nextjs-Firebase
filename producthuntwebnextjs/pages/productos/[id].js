import React,{useEffect} from 'react';
import {useRouter} from 'next/router';

const Producto = (props) => {
    // Routing para obtener el id actual
    const router = useRouter();
    //console.log(router);
    const {query: {id}} = router;

    useEffect(() => {
        // Validamos que si venga un id por la url
        if(id){
            console.log(id);
        }
    }, [id]);


    return (
        <h1>Desde {id}</h1>
    );
}
 
export default Producto;