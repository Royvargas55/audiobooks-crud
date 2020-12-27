import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import '../assets/styles/components/AddAudioBook.scss';

const AddAudioBook = () => {
  return (
    <div className='AddAudioBook'>
      <Header />
      <div className='audio__book'>
        <h1 className='title'>Add a new audiobook</h1>
        <form className='form'>
          <div className='form__group'>
            <input type='text' placeholder='Title' className='form__input' />
          </div>

          <div className='form__group'>
            <input type='date' placeholder='Street date' className='form__input' />
          </div>

          <div className='form__group'>
            <input type='text' placeholder='Cost per play' className='form__input' />
          </div>

          <div className='form__group'>
            <input type='text' placeholder='Authors' className='form__input' />
            <button className='btn__add' type='button'>
              Add author
            </button>
          </div>

          <div className='form__group'>
            <input type='text' placeholder='Narrators' className='form__input' />
            <button className='btn__add' type='button'>
              Add narrator
            </button>
          </div>

          <div className='form__group'>
            <input type='text' placeholder='Duration' className='form__input' />
          </div>
          <div className='btn__group'>
            <button className='btn' type='submit'>Add new audiobook</button>
            <Link to='/' className='btn__cancel'>Cancel</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddAudioBook;
