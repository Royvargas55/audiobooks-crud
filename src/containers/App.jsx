import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
// import useInitialState from '../hooks/useInitialStates';

import '../assets/styles/App.scss';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Search />

      <Categories title='Mi lista'> </Categories>

      {/* <Categories title='Tendencias'> </Categories>

      <Categories title='Originales de Platzi Video'> </Categories> */}

      <Footer />

    </div>
  );
};
export default App;
