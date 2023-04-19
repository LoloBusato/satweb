import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function StockCount() {
  const [stock, setStock] = useState([]);
  const [searchStock, setsearchStock] = useState([]);

  const [codigoSearch, setCodigoSearch] = useState("");
  const [repuestoSearch, setRepuestoSearch] = useState("");
  const [cantidadSearch, setCantidadSearch] = useState("");
  const [precioSearch, setPrecioSearch] = useState("");
  const [proveedorSearch, setProveedorSearch] = useState("");
  const [fechaSearch, setFechaSearch] = useState("");

  const navigate = useNavigate();
  
  const handleSearch = () => {
    setsearchStock(stock.filter((item) => 
        item.idstock.toString().toLowerCase().includes(codigoSearch.toLowerCase()) &&
        item.repuesto.toLowerCase().includes(repuestoSearch.toLowerCase()) &&
        item.cantidad.toString().toLowerCase().includes(cantidadSearch.toLowerCase()) &&
        item.precio_compra.toString().toLowerCase().includes(precioSearch.toLowerCase()) &&
        item.nombre.toLowerCase().includes(proveedorSearch.toLowerCase()) &&
        item.fecha_compra.includes(fechaSearch)
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
        
        await axios.get('http://localhost:3001/stock')
        .then(response => {
          setStock(response.data);
          setsearchStock(response.data)
        })
        .catch(error => {
          console.error(error);
          // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
        });
    }
    fetchData()

  }, []);

  const eliminarElemento = async (id) => {
    try {        
        await axios.delete(`http://localhost:3001/stock/${id}`)
        setsearchStock(stock.filter((item) => item.idstock !== id));
        setStock(stock.filter((item) => item.idstock !== id));
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div className='bg-gray-500 min-h-screen'>
        <NavBar />
        <h1 className="flex justify-center text-5xl pt-5">Productos en stock</h1>  
        <div className="flex flex-col md:flex-row gap-4 justify-center my-10">
            <input
                className="px-4 py-2 rounded-lg shadow-md border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                type="text"
                placeholder="Buscar por Codigo"
                value={codigoSearch}
                onChange={(e) => setCodigoSearch(e.target.value)}
            />
            <input
                className="px-4 py-2 rounded-lg shadow-md border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                type="text"
                placeholder="Buscar por repuesto"
                value={repuestoSearch}
                onChange={(e) => setRepuestoSearch(e.target.value)}
            />

            <input
                className="px-4 py-2 rounded-lg shadow-md border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                type="text"
                placeholder="Buscar por cantidad"
                value={cantidadSearch}
                onChange={(e) => setCantidadSearch(e.target.value)}
            />

            <input
                className="px-4 py-2 rounded-lg shadow-md border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                type="text"
                placeholder="Buscar por precio"
                value={precioSearch}
                onChange={(e) => setPrecioSearch(e.target.value)}
            />

            <input
                className="px-4 py-2 rounded-lg shadow-md border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                type="text"
                placeholder="Buscar por proveedor"
                value={proveedorSearch}
                onChange={(e) => setProveedorSearch(e.target.value)}
            />

            <input
                className="px-4 py-2 rounded-lg shadow-md border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                type="text"
                placeholder="Buscar por fecha (aaaa/mm/dd)"
                value={fechaSearch}
                onChange={(e) => setFechaSearch(e.target.value)}
            />

            <button
                className="px-4 py-2 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                onClick={() => handleSearch()}
            >
                Buscar
            </button>
        </div>
        <div className="flex justify-center mb-10">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="py-2">Print Cod</th>
                        <th className="px-4 py-2">Cod</th>
                        <th className="px-4 py-2">Repuesto</th>
                        <th className="px-4 py-2">Cantidad</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">Proveedor</th>
                        <th className="px-4 py-2">Fecha (aaaa/mm/dd)</th>
                    </tr>
                </thead>
                <tbody>
                    {searchStock.map(stock => (
                    <tr key={stock.idstock}>
                        <td>
                            <button className="bg-blue-500 border px-4 py-2 color"
                            onClick={() => { navigate(`/printCode/${stock.idstock + stock.repuesto.split(" ")[0].slice(0,2) + stock.repuesto.split(" ")[1].slice(0,1) + stock.repuesto.split(" ")[3] + stock.repuesto.split(" ")[4].slice(0,1) + stock.fecha_compra.slice(0, 10).split("-")[0].slice(2,4) + stock.fecha_compra.slice(0, 10).split("-")[1] + stock.fecha_compra.slice(0, 10).split("-")[2]}`) }} >
                                Print
                            </button>
                        </td>
                        <td className="border px-4 py-2" values={stock.idstock}>
                            {stock.idstock + stock.repuesto.split(" ")[0].slice(0,2) + stock.repuesto.split(" ")[1].slice(0,1) + stock.repuesto.split(" ")[3] + stock.repuesto.split(" ")[4].slice(0,1) + stock.fecha_compra.slice(0, 10).split("-")[0].slice(2,4) + stock.fecha_compra.slice(0, 10).split("-")[1] + stock.fecha_compra.slice(0, 10).split("-")[2]} 
                        </td>
                        <td className="border px-4 py-2" value={stock.repuesto}>{stock.repuesto}</td>
                        <td className={`${stock.cantidad <= 3 ? "bg-red-600" : ""} border px-4 py-2`} value={stock.cantidad}>{stock.cantidad}</td>
                        <td className="border px-4 py-2" value={stock.precio_compra}>{stock.precio_compra} USD</td>
                        <td className="border px-4 py-2" value={stock.nombre}>{stock.nombre}</td>
                        <td className="border px-4 py-2" value={stock.fecha_compra}>{stock.fecha_compra.slice(0, 10)}</td>
                        <td>
                            <button className="bg-red-500 border px-4 py-2 color" onClick={() => eliminarElemento(stock.idstock)}>Eliminar</button>
                        </td>
                        <td>
                            <button className="bg-green-500 border px-4 py-2 color"
                            onClick={() => { navigate(`/updateStock/${stock.idstock}`) }} >
                                Editar
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default StockCount;