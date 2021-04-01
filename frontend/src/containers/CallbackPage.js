import React, { Component } from 'react';

import { connect } from 'react-redux';
import { userActions } from '../actions/UserActions';
import FullPageLoader from '../components/FullPageLoader';
import { history } from '../helpers';

const queryString = require('query-string');

class CallbackPage extends Component {

  constructor(props) {
    super(props);

    this.detectLogin = this.detectLogin.bind(this);
  }

  componentDidMount() {
    this.detectLogin();
  }

  componentDidUpdate() {
    this.detectLogin();
  }

  detectLogin() {
    var parsed = queryString.parse(this.props.location.search);
    if (parsed.code && parsed.state === 'blahblah') {
      this.props.dispatch(userActions.exchangeToken(parsed.code));
      history.replace({
        'pathname': this.props.location.pathname,
        'search': '',
      });
    } else if (!this.props.loading && !this.props.user && this.props.token) {
      this.props.dispatch(userActions.getUserInfo(this.props.token));
    }
  }

  render() {
    return <FullPageLoader loading={true}/>;
  }
}

function mapStateToProps(state) {
  const { loading, user, token } = state.userPage;
  return {
    loading,
    user,
    token,
  };
}

export default connect(mapStateToProps)(CallbackPage);