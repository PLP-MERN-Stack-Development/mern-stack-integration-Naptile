import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future routes: /post/:id, /create, /edit etc. */}
      </Routes>
    </Router>
  );
}

export default App;
