import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Header.scss';

import logo from '../assets/static/logo-beek.png';
import userIcon from '../assets/static/user-icon.png';

const Header = () => (
  <header className='header'>
    <img className='header__img' src={logo} alt='Beek Icon' />
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src={userIcon} alt='' />
        <p>Perfil</p>
      </div>
      <ul>
        <li><Link to='/add'>Add Audiobook</Link></li>
        <li><Link to='/home'>Home</Link></li>
      </ul>
    </div>
  </header>
);

export default Header;
