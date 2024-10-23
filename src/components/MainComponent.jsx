import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import "../estilos/MainComponent.css";
import SearchBar from "./SearchBar";





function MainComponent (){
    const [productos,setProductos] = useState([]);
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(1)
    let baseURL = 'https://fakestoreapi.com/products?limit=1';

    useEffect(()=>{
        baseURL =  `https://fakestoreapi.com/products?limit=${limit}`
        axios.get(baseURL).then((res) => {
        setProductos(res.data);
        
        });
    },[limit]);

    const limitChange = (event) =>{
        setLimit(event.target.value);
    
    };

    return (
        <>
            
            <h1>Fakestore</h1> 
            <h2>Ingrese la cantidad de productos que desea ver del 1 al 19</h2>
            <input className='inputNumber' type="number" onChange={limitChange}/>
            <div className="contenedorCards">
                {productos.map((p)=> (
                <>
                    
                    <div className='contenedorCatalogo'>
                        <h3>{p.title}</h3>
                        <img className='imgCatalogo' src={p.image} alt="" />
                        <h3>El precio del producto es <br></br> {p.price}</h3>
                        
                    </div>
                    
                </>
            ))}
            </div>
            <SearchBar/>
        </>
    );
};

export default MainComponent;