import './app.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SearchBus from './pages/SearchBus/SearchBus'
import BusDetail from './pages/BusDetail/BusDetail'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/searchBus" element={<SearchBus />} />
          <Route path="/searchBus/:city/:routeName" element={<BusDetail />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </HashRouter>
    </>
  )
}
export default App
