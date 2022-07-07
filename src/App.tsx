import React from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './components/Uploader';
import Preview from './components/Upload';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full flex items-center justify-center">
        <Routes>
          <Route path="/upload" element={<Uploader/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
