import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Aquí es donde enviarías la información de inicio de sesión al servidor
    if (username !== "" && password !== "" ){
      try {
        const response = await axios.post('http://localhost:3001/users/login', {
          username,
          password,
        });
        if (response.status === 200){
          navigate('/home')
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
