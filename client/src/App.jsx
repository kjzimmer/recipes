import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UnprotectedRoutes } from './components/UnprotectedRoutes'
import { ProtectedRoutes } from './components/ProtectedRoutes'



function App() {
  return (
    <>
    <Routes>
      <Route path='/*' element={<UnprotectedRoutes/>}/>
      <Route path='/recipes/*' element={<ProtectedRoutes/>}/>
    </Routes>
    </>
  )
}

export default App
