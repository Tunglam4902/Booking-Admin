import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Admin from './pages/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='admin' element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
