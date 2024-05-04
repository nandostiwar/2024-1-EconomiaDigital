import './App.css';
import Form from './components/MainFrame';


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
          element={<Form />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;