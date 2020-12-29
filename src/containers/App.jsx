import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import AddAudioBook from '../components/AddAudioBook';
import EditAudioBook from '../components/EditAudioBook';
import AudioBookDetails from '../components/AudioBookDetails';
// import useInitialState from '../hooks/useInitialStates';

import '../assets/styles/App.scss';

const App = () => {
  return (
    <div className='App'>
      <Router exact path='/'>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/add' component={AddAudioBook} />
          <Route path='/edit/:id' component={EditAudioBook} />
          <Route path='/:id' component={AudioBookDetails} />
          <Redirect to='/home' />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
