import React, {useState} from "react";
import "../estilos/NavBar.css"

function NavBar ( ){
    return (
        <>
            <nav>
                <ul>
                    <li><h1>FakeStore</h1></li>
                    <div className="containList">    
                        <li><a href="">Home</a></li>
                        <li><a href="#productos">Productos</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </div>
                </ul>
            </nav>
        </>
    );
};

export default  NavBar;
