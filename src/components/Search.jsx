/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-state */
import React from 'react';
import '../assets/styles/components/Search.scss';

//const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className='main'>
        <h2 className='main__title'>¿Qué quieres escuchar hoy?</h2>
        <input type='text' className='input' placeholder='Buscar...' />
      </section>
    );
  }
}

export default Search;
