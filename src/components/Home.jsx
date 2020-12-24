import React from 'react';
import Header from './Header';
import Search from './Search';
import Footer from './Footer';
import AudioBookList from './AudioBookList';

// import useInitialState from '../hooks/useInitialStates';

const Home = () => {
  return (
    <div>
      <Header />
      <Search />
      <AudioBookList />
      <Footer />
    </div>
  );
};

export default Home;
