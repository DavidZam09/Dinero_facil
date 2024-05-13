import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
