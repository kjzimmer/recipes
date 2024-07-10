import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UnprotectedRoutes } from './routes/UnprotectedRoutes'
import { ProtectedRoutes } from './routes/ProtectedRoutes'



function App() {
  return (
    <>
    <h1> Healthy Eating </h1>
    <Routes>
      <Route path='/*' element={<UnprotectedRoutes/>}/>
      <Route path='/recipes/*' element={<ProtectedRoutes/>}/>
    </Routes>
    </>
  )
}

export default App
