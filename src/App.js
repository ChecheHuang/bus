import './app.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SearchBus from './pages/SearchBus/SearchBus'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/searchBus" element={<SearchBus />} />
        </Routes>
      </HashRouter>
    </>
  )
}
export default App
