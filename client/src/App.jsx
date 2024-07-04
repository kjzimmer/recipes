import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UnprotectedRoutes } from './components/UnprotectedRoutes'
import { ProtectedRoutes } from './components/ProtectedRoutes'



function App() {
  return (
    <>
    <h1>App Name Here (Healthy Eating?)</h1>
    <Routes>
      <Route path='/*' element={<UnprotectedRoutes/>}/>
      <Route path='/recipes/*' element={<ProtectedRoutes/>}/>
    </Routes>
    </>
  )
}

export default App
