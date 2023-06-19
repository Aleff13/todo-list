import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todos from './pages/todos';
import Login from './pages/login';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<Todos/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
