import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/SignIn.jsx'
import Signup from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
