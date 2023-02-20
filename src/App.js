import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import React, { useEffect, useState } from 'react'
import Nav from './Components/Nav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Logout from './Pages/Logout'
import Orders from './Pages/Orders'
import Checkout from './Pages/Checkout'
import { ContactData } from './Pages/ContactData'
import NotFound from './Pages/NotFound'

function App() {
  const [user, setUser] = useState({})
  const [activeItem, setActiveItem] = useState(
    window.location.pathname === '/auth' ? 'Login' : 'Burger Builder'
  )
  //without using react routing, we'll use window.location.pathname to indentify the current location
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    } else {
      setUser(null)
    }
  }, [])

  return (
    <Router>
      <Nav activeItem={activeItem} setActiveItem={setActiveItem} user={user} />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home user={user} setUser={setUser} setActiveItem={setActiveItem} />}
        />
        <Route
          path='/auth'
          element={<Login user={user} setUser={setUser} setActiveItem={setActiveItem} />}
        />
        <Route path='/logout' element={<Logout user={user} setUser={setUser} />} />
        <Route path='/orders' element={<Orders user={user} setUser={setUser} />} />
        <Route
          path='/checkout'
          element={<Checkout user={user} setUser={setUser} setActiveItem={setActiveItem} />}
        >
          <Route path='contact-data' element={<ContactData />} />
        </Route>
        <Route path='*' element={<NotFound setActiveItem={setActiveItem} />} />
      </Routes>
    </Router>
  )
}

export default App
