import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';

// works with react router 6
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />

      {/* Commented code for react router 6 */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchBooksPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
