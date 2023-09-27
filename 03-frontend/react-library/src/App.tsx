import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';

// works with react router 6
import { Route, Switch, Redirect } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      {/* Commented code for react router 6 */}
      <div className="flex-grow-1">
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          {/* <Route path='/reviewlist/:bookId'>
            <ReviewListPage />
          </Route> */}
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
