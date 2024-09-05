import './App.css'
import { Route, Routes } from 'react-router-dom'

import { ClientRoutes } from './routes/ClientRoutes'
import { ProviderRoutes } from './routes/ProviderRoutes'
import { UserLogin } from './views/UserLogin'
import { UserCreate } from './views/UserCreate'
import { userServices } from './services/user.services'



function App() {
  return (
    <>
    <h1> Healthy Eating </h1>
    <Routes>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/register' element={<UserCreate submitHandler={userServices.register}/>}/>
      <Route path='/provider/*' element={<ProviderRoutes/>}/>
      <Route path='/*' element={<ClientRoutes/>}/>
    </Routes>
    </>
  )
}

export default App
