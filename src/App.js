import './app.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SearchBus from './pages/SearchBus/SearchBus'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/searchBus" element={<SearchBus />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
