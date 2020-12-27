/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import axios from 'axios';
import Categories from './Categories';
import AudioBook from './AudioBook';
import AudioBookSection from './AudioBookSection';

// import useInitialState from '../hooks/useInitialStates';
const apiUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX';
const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class AudioBookList extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  requestGet = () => {
    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        this.setState({ data: res.data.items });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.requestGet();
  }

  render() {
    return (
      <div>
        <Categories title='Mi lista'>
          <AudioBookSection>
            {this.state.data.map((item) => <AudioBook key={item.sys['id']} title={item.fields.title['es-MX']} streetDate={item.fields.street_date['es-MX']} costPerPlay={item.fields.cost_per_play['es-MX']} authors={item.fields.authors['es-MX']} narrators={item.fields.narrators['es-MX']} duration={item.fields.duration['es-MX']} cover={item.fields.cover['es-MX']} />)}
          </AudioBookSection>
        </Categories>
      </div>
    );
  }
};

export default AudioBookList;

