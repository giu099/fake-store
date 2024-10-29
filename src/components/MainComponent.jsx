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
    const [categoriaSeleccionada,setCategoriaSeleccionada] = useState("all")
    const categoriaMatch = categoriaSeleccionada === "all" || productos.categoria === categoriaSeleccionada;
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
    };

    const changeCategoria = (event) => {
        setCategoriaSeleccionada(event.target.value)
    };


    return (
        <>
            <NavBar />
            <div className="inicio">
                <select onChange={changeCategoria} value={categoriaSeleccionada} name="" id="">
                    <option value="all">Todas las categorias</option>
                    <option value="jewelery">Joyeria</option>
                    <option value="women's clothing">Electronica</option>
                    <option value="men's clothing">Ropa hombre</option>
                    <option value="electronics">Ropa de Mujer</option>
                </select>
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