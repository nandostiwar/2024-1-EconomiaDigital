import './App.css';
import Form from './components/Form';
import AdminHome from './components/AdminHome';
import MeseroHome from './components/MeseroHome';
import AdminProductos from './components/adminProductos';
import AdminPedidos from './components/AdminPedidos';
import CocinaHome from './components/CocinaHome';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Form callback={(userData) => { setUser(userData.role); setEmail(userData.email); }} />}
        />
        <Route path='/adminHome' element={<AdminHome user={user} />} />
        <Route path='/meseroHome' element={<MeseroHome user={user} email={email} />} />
        <Route path='/adminProductos' element={<AdminProductos />} />
        <Route path='/adminPedidos' element={<AdminPedidos user={user} />} />
        <Route path='/cocinaHome' element={<CocinaHome user={user}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;