import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import { history } from '../helpers';
import CallbackPage from './CallbackPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/callback" component={CallbackPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;