import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";


function Login() {
  const [brand, setBrand] = useState("Apple");
  const [type, setType] = useState("iPhone");
  const [model, setModel] = useState("");
  // const navigate = useNavigate();

  function handleBrandChange(event) {
    setBrand(event.target.value);
  }
  function handleTypeChange(event) {
    setType(event.target.value);
  }
  function handleModelChange(event) {
    setModel(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Aquí es donde enviarías la información de inicio de sesión al servidor
    try {
      const response = await axios.post('http://localhost:3001/devices', {
        brand,
        type,
        model,
      });
      if (response.status === 200){
        
        // navigate('/home')
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Marca:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={handleBrandChange}
        />
      </div>
      <div>
        <label htmlFor="type">Tipo:</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={handleTypeChange}
        />
      </div>
      <div>
        <label htmlFor="model">Modelo:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={handleModelChange}
        />
      </div>
      <button type="submit">Guardar equipo</button>
    </form>
  );
}

export default Login;
