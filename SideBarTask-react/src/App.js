import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar'
import { Routes, Route } from 'react-router';
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Sidebar/>}>
        <Route path="home" element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="contact" element={<Contact/>} />
        </Route>
      </Routes>
     
    </div>
  );
}

export default App;
