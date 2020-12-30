/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-return-assign */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';

import '../assets/styles/components/Search.scss';

import Categories from './Categories';
import AudioBook from './AudioBook';
import AudioBookSection from './AudioBookSection';

const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audiobooks: null,
      loadgin: false,
      showResult: true,
      value: '',
    };
  }

  timeConvert = (n) => {
    n = Number(n);
    const h = Math.floor(n / 3600);
    const m = Math.floor(n % 3600 / 60);
    const s = Math.floor(n % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  search = async (val) => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?query=${val}&select=fields,sys.id&locale=es-MX`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      },
    );
    const audiobooks = await res.data.items;

    this.setState({ audiobooks, loading: false });
  };

  onChangeHandler = async (e) => {
    this.search(this.state.value);
    if (this.state.value.length > 1) {
      this.state.showResult = true;
    } else {
      this.state.showResult = false;
    }
    this.setState({ value: e.target.value });
  };

  get renderAudioBooks() {
    let audiobooks;
    if (this.state.audiobooks) {
      audiobooks = (
        <div className='search__container'>
          <Categories title='My search results'>
            <AudioBookSection>
              {this.state.audiobooks.slice(0, 7).map((item) => (
                <AudioBook
                  key={item.sys['id']}
                  id={item.sys['id']}
                  title={item.fields.title['es-MX']}
                  streetDate={item.fields.street_date['es-MX']}
                  costPerPlay={item.fields.cost_per_play['es-MX']}
                  authors={item.fields.authors['es-MX']}
                  narrators={item.fields.narrators['es-MX']}
                  duration={this.timeConvert(item.fields.duration['es-MX'])}
                  cover={item.fields.cover['es-MX']}
                />
              ))}
            </AudioBookSection>
          </Categories>
        </div>
      );
    }
    return audiobooks;
  }

  render() {
    return (
      <div>
        <section className='main'>
          <h2 className='main__title'>What do you want to listen today?</h2>
          <input
            value={this.state.value}
            onChange={(e) => this.onChangeHandler(e)}
            type='search'
            className='input'
            placeholder='Search...'
          />
        </section>
        <div className='search__result'>
          { this.state.showResult && (
            this.renderAudioBooks
          )}
        </div>
      </div>
    );
  }
}

export default Search;
