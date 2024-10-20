import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const [productos,setProductos] = useState([]);
  const [limit, setLimit] = useState(1)
  let baseURL = `https://fakestoreapi.com/products?limit=1`;

  
  
  useEffect(()=>{
      baseURL =  `https://fakestoreapi.com/products?limit=${limit}`
      axios.get(baseURL).then((res) => {
        setProductos(res.data);
        
      });
  },[limit]);

  const limitChange = (event) =>{
    setLimit(event.target.value)
    
  };



  return (
    <>
      <h1>Fakestore</h1> 
      <h2>Ingrese la cantidad de productos que desea ver del 1 al 19</h2>
      <input type="number" onChange={limitChange}/>
      {productos.map((p)=> (
        <>
          <div>{p.title}</div>
          <img style={{width : "300px", borderRadius: "10px", marginTop: "10px"}} src={p.image} alt="" />
        </>
      ))}
    </>
  )
}

export default App
