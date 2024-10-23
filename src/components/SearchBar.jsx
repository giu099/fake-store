import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../estilos/SearchBar.css"


const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);


    const searchChange = (event) => {
    setSearch(event.target.value);
    };


    useEffect(() => {
        axios.get('https://fakestoreapi.com/products').then((res)=>{
            setProductos(res.data);
        })
        
    }, []);


    useEffect(() => {
        const results = productos.filter((producto)=>{
            return producto.title.includes(search);
        })
        setProductosFiltrados(results);
    },[search,productos])
    return (
        <>
            <h2>Aqui puedes buscar productos</h2>
            <div>
                <input
                    className='inputSearch'
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={searchChange}/>
            </div>
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
        </>
    );
};

export default SearchBar;