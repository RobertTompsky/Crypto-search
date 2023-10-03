import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './features/coins'
import Coin from './features/coin'
import Navbar from './components/Navbar'

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/coin/:id' element={<Coin />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
