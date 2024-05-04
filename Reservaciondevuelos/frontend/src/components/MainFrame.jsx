import { useState, useEffect } from 'react';
import './styles/MainFrame.css';
import { useNavigate } from 'react-router-dom';
//Importamos Select para filtrar los paises por busqueda
import Select from 'react-select';

function FlightForm() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [countries, setCountries] = useState([]);
    const [flights, setFlights] = useState([]);
   // const [existingFlights, setExistingFlights] = useState(new Set()); // Conjunto para verificar vuelos existentes
    const goTo = useNavigate();

    //Estamos obteniendo todos los paises de la base de datos
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:5000/countries');
                if (response.ok) {
                    const data = await response.json();
                    // Convertir datos de países a formato aceptado por React Select
                    const formattedCountries = data.map(country => ({
                        value: country.name,
                        label: country.name
                    }));
                    setCountries(formattedCountries);
                } else {
                    console.error('Error al obtener los países:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los países:', error);
            }
        };

        // Llama a fetchCountries() al montar el componente
        fetchCountries();

        //Obtiene todos los vuelos y los muesta en una lista
        const fetchFlights = async () => {
            try {
                const response = await fetch('http://localhost:5000/flights/');
                if (response.ok) {
                    const data = await response.json();
                    setFlights(data);
                } else {
                    console.error('Error al obtener los vuelos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los vuelos:', error);
            }
        };

        // Llama a fetchFlights() al montar el componente
        fetchFlights();

        // Configura un intervalo para actualizar la lista de vuelos cada 5 segundos
        const intervalId = setInterval(fetchFlights, 5000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []); // Llamada solo al montar el componente




    //Metodo POST para almacenar un vuelo a la base de datos
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Verificar si se seleccionó el mismo país en ambos campos
        if (from.value === to.value) {
        alert('El país de origen y el país de destino no pueden ser iguales. Por favor, seleccione países diferentes.');
        return;
    }

       // Verificar si ya existe un vuelo con los mismos detalles
        const existingFlights = flights.find(flights => flights.from === from.value && flights.to === to.value && flights.date === date);
        if (existingFlights) {
        alert('Este vuelo ya existe. Por favor, elija otra combinación de origen, destino y fecha.');
        return;}

        try {
            const response = await fetch('http://localhost:5000/flights/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ from: from.value, to: to.value, date })
            });

            console.log("Se envio: " , from.value , "ha From")
            console.log("Se envio: " , to.value , "ha To")
            console.log("Se envio: " , date , "ha Date")
          


            if (response.ok) {
                // Limpiar los campos después de enviar la solicitud
                setFrom('');
                setTo('');
                setDate('');
               
                alert('Vuelo agregado con exito');
            } else {
                console.error('Error al agregar el vuelo:', response.statusText);
                alert('Error al agregar el vuelo. Por favor, inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('Error al agregar el vuelo:', error);
            alert('Error al agregar el vuelo. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flight-form">
                <Select 
                    options={countries}
                    value={from}
                    onChange={(selectedOption) => setFrom(selectedOption)}
                    placeholder="From"
                    className="flight-input"
                />
                <Select
                    options={countries}
                    value={to}
                    onChange={(selectedOption) => setTo(selectedOption)}
                    placeholder="To"
                    className="flight-input"
                />
                <input
                //type = date para que aparezca el calendario
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flight-input"
                />
                <button type="submit" className="flight-button">Agregar Vuelo</button>
            </form>    
            

            <div className="flight-list">
            <h2>Listado de Vuelos</h2>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight, index) => (
                        <tr key={index}>
                            <td>{flight.from}</td>
                            <td>{flight.to}</td>
                            <td>{flight.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default FlightForm;
