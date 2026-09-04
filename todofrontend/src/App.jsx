import { useState, useEffect } from 'react';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    
      <Route
        path="/"
        element={
          < ProtectedRoutes>
          <TodoPage />
          </ProtectedRoutes>
        }
      />

    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
