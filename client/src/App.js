import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Posts from './components/Posts';
import Login from './components/Login';
import Header from './components/Header';

import './App.css';
import Register from './components/Register';

function App() {
  const [jwt, setJwt] = useState("") // setting jwt and user in browser, refresh makes it disappear
  const [user, setUser] = useState({}) // doesn't really do anything (all this used for h2), relic from week13 base

  return (
    <Router>
          <div className="App">
            <Header />
            <h2>{jwt ? `Welcome ${user.username}!` : ""}</h2>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data/:id" element={<Posts />} />
              <Route path="/login" element={<Login setJwt={setJwt} setUser={setUser} jwt={jwt} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
    </Router>
  );
}

export default App;
