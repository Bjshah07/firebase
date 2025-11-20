import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import AddBooks from './pages/AddBooks'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'
import Orders from './pages/Orders'
import ViewOrders from './pages/ViewOrders'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/add-books' element={<AddBooks />} />
        <Route path='/books/view/:id' element={<BookDetail />} />
        <Route path='/books/orders' element={<Orders />} />
        <Route path='/books/orders/:bookId' element={<ViewOrders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
