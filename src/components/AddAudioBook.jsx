/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

import '../assets/styles/components/AddAudioBook.scss';

const apiUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries';
const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class AddAudioBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        streetDate: '',
        costPerPlay: 0,
        author: '',
        authors: [],
        narrator: '',
        narrators: [],
        duration: 0,
      },
    };
  }

  handleChange=async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  }

  addAuthor = () => {
    this.setState((state) => {
      const list = state.form.authors.push(state.form.author);
      // eslint-disable-next-line no-param-reassign
      state.form.author = '';
      return {
        list,
        author: '',
      };
    });
  };

  addNarrator = () => {
    this.setState((state) => {
      const list = state.form.narrators.push(state.form.narrator);
      // eslint-disable-next-line no-param-reassign
      state.form.narrator = '';
      return {
        list,
        narrator: '',
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios.post(apiUrl, {
      'fields': {
        'title': {
          'es-MX': this.state.form.title,
        },
        'is_original': {
          'es-MX': false,
        },
        'street_date': {
          'es-MX': this.state.form.streetDate,
        },
        'cost_per_play': {
          'es-MX': parseInt(this.state.form.costPerPlay),
        },
        'authors': {
          'es-MX': this.state.form.authors,
        },
        'narrators': {
          'es-MX': this.state.form.narrators,
        },
        'duration': {
          'es-MX': parseInt(this.state.form.duration),
        },
        'cover': {
          'es-MX': 'http://dummyimage.com/800x600.png/FF7A90/ffffff',
        },
      },
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Contentful-Content-Type': 'audiocontent-v1',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className='AddAudioBook'>
        <Header />
        <div className='audio__book'>
          <h1 className='title'>Add a new audiobook</h1>
          <form onSubmit={this.submitHandler} className='form'>
            <div className='form__group'>
              <input
                type='text'
                name='title'
                placeholder='Title'
                className='form__input'
                onChange={this.handleChange}
              />
            </div>

            <div className='form__group'>
              <input
                type='date'
                name='streetDate'
                placeholder='Street date'
                className='form__input'
                onChange={this.handleChange}
              />
            </div>

            <div className='form__group'>
              <input
                type='text'
                name='costPerPlay'
                placeholder='Cost per play'
                className='form__input'
                onChange={this.handleChange}
              />
            </div>

            <div className='form__group'>
              <input
                type='text'
                name='author'
                placeholder='Authors'
                className='form__input'
                value={this.state.form.author}
                onChange={this.handleChange}
              />
              <button className='btn__add' type='button' onClick={this.addAuthor}>
                Add author
              </button>
            </div>

            <div className='form__group'>
              <input
                type='text'
                name='narrator'
                placeholder='Narrators'
                className='form__input'
                value={this.state.form.narrator}
                onChange={this.handleChange}
              />
              <button className='btn__add' type='button' onClick={this.addNarrator}>
                Add narrator
              </button>
            </div>

            <div className='form__group'>
              <input
                type='text'
                name='duration'
                placeholder='Duration'
                className='form__input'
                onChange={this.handleChange}
              />
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
  }
}

export default AddAudioBook;
