import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import "../estilos/MainComponent.css";
import NavBar from "./NavBar";

function MainComponent (){
    const [productos,setProductos] = useState([]);
    const [search, setSearch] = useState('')
    const [productosFiltrados, setProductosFiltrados] = useState([])
    const [limit, setLimit] = useState(1)
    let baseURL = 'https://fakestoreapi.com/products?limit=1';

    useEffect(()=>{
        baseURL =  `https://fakestoreapi.com/products?limit=${limit}`
        axios.get(baseURL).then((res) => {
        setProductos(res.data);
        setProductosFiltrados(res.data);
        });
    },[limit]);

    useEffect(() => {
        const results = productos.filter((producto)=>{
            return producto.title.includes(search);
        })
        setProductosFiltrados(results);
    },[search,productos])

    const limitChange = (event) =>{
        setLimit(event.target.value);
    
    };

    const searchChange = (event) => {
        setSearch(event.target.value);
    }



    return (
        <>
            <NavBar />
            <div className="inicio">
                <input className='inputNumber' type="number" onChange={limitChange} placeholder="Ingresa un numero de productos......"    />
                <input className='inputSearch' type="text" placeholder="Buscar producto..." value={search} onChange={searchChange}/>
            </div>
            <section id="productos">    
                <div className='mainContainer'>
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((product) => (
                            <div className='contenedorCardsProducts'>
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                                <img src={product.image} alt={product.title} width="100" />
                            </div>
                        ))
                    ) : (
                        <h2>No se encontraron productos.</h2>
                    )}
                </div>
            </section>
        </>
    );
};

export default MainComponent;