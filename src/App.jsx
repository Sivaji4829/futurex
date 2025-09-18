import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Entry from './pages/Entry.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Faqs from './pages/Faqs.jsx';

function App() {
  const location = useLocation();
  const isEntryPage = location.pathname === '/';

  return (
    <div className="min-h-screen">
      {!isEntryPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
      </main>
      {!isEntryPage && <Footer />}
    </div>
  );
}

export default App;