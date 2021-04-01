import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { buttonName, buttonOnClick } = this.props;
    return (
      <Row>
        <Col className='header'>
          <div className='float-left header-vertical-center'>
            ABLR Coding Challenge
          </div>
          <div className='float-right'>
            <Button onClick={buttonOnClick}>{buttonName}</Button>
          </div>
        </Col>
      </Row>
    );
  }
}