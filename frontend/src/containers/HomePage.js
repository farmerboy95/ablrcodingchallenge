import React, { Component } from 'react';
import { Container, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';

import { connect } from 'react-redux';
import { userActions } from '../actions/UserActions';
import { alertActions } from '../actions/AlertActions';
import FullPageLoader from '../components/FullPageLoader';
import Header from '../components/Header';
import ContactInfo from '../components/ContactInfo';
import PersonalInfo from '../components/PersonalInfo';
import IncomeInfo from '../components/IncomeInfo';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyTab: 'contact',
    }

    this.logout = this.logout.bind(this);
    this.goToLoginUrl = this.goToLoginUrl.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.setKey = this.setKey.bind(this);
    this.nextInfo = this.nextInfo.bind(this);
  }

  logout() {
    this.props.dispatch(userActions.logout());
    this.setKey('contact');
  }

  setKey(key) {
    this.setState({ keyTab: key });
  }

  goToLoginUrl() {
    this.props.dispatch(userActions.goToLoginUrl());
  }

  removeAlert() {
    this.props.dispatch(alertActions.clear());
  }

  nextInfo() {
    if (this.state.keyTab === 'contact') {
      this.setKey('personal');
    } else if (this.state.keyTab === 'personal') {
      this.setKey('income');
    }
  }

  render() {
    const { user, alertMessage, alertType, loading } = this.props;
    const { keyTab } = this.state;
    return (
      <div className='main'>
        <Container fluid>
          <Header buttonName={user ? 'Logout' : 'Login'} buttonOnClick={user ? this.logout : this.goToLoginUrl} />
          {alertType &&
          <Row>
            <Col className='no-padding margin-top'>
              <Alert className='no-margin-bottom' variant={(alertType == 'alert-success' ? 'success' : 'danger')} onClose={() => this.removeAlert()} dismissible>
                {alertMessage}
              </Alert>
            </Col>
          </Row>
          }
          {!!user &&
          <Row>
            <Col className='no-padding margin-top'>
              <Tabs defaultActiveKey="contact" activeKey={keyTab} onSelect={(k) => this.setKey(k)} id="info-tabs">
                <Tab eventKey="contact" title="Contact Info">
                  <ContactInfo user={user} nextInfo={this.nextInfo} />
                </Tab>
                <Tab eventKey="personal" title="Personal Info">
                  <PersonalInfo user={user} nextInfo={this.nextInfo} />
                </Tab>
                <Tab eventKey="income" title="Income Info">
                  <IncomeInfo user={user} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
          }
        </Container>
        <FullPageLoader loading={loading}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { type, message } = state.alert;
  const { loading, user, token } = state.userPage;
  return {
    alertType: type,
    alertMessage: message,
    loading,
    user,
    token,
  };
}

export default connect(mapStateToProps)(HomePage);