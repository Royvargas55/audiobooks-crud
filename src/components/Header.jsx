import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Header.scss';

import logo from '../assets/static/logo-beek.png';
import addIcon from '../assets/static/add-icon.png';

const Header = () => (
  <header className='header'>
    <img className='header__img' src={logo} alt='Beek Icon' />
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src={addIcon} alt='' />
        <p>Options</p>
      </div>
      <ul>
        <li><Link to='/add'>Add Audiobook</Link></li>
        <li><Link to='/home'>Home</Link></li>
      </ul>
    </div>
  </header>
);

export default Header;
