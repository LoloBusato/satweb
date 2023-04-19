import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí es donde enviarías la información de inicio de sesión al servidor
    try {
      const response = await axios.get('http://localhost:3001/devices/type');
      if (response.status === 200){
        navigate("/device")
      } else {
        navigate("/error")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
        <h1>
            Hola mundo, esta es la pagina de home
        </h1>    
        <button type="submit" onClick={handleSubmit}>Get Types</button>
    </div>
  );
}

export default Home;
