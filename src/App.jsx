import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home-page'
import SupplierPage from './pages/Supplier-page'
import ClientPage from './pages/Client-page'
import EmployeePage from './pages/Employee-page'

function App() {

  return (
    <>
      <Routes>
        <Route path='/'          element={<HomePage />}     />
        <Route path='/supplier'  element={<SupplierPage />} />
        <Route path='/client'    element={<ClientPage />}   />
        <Route path='/employee'  element={<EmployeePage />} />
      </Routes>
    </>
  )
}

export default App
