/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import axios from 'axios';
import Categories from './Categories';
import AudioBook from './AudioBook';
import AudioBookSection from './AudioBookSection';

const apiUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX';
const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class AudioBookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
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
        <Categories title='My list'>
          <AudioBookSection>
            {this.state.data.map((item) => (
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
};

export default AudioBookList;

