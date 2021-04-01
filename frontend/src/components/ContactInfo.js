import React from 'react';
import { Container, Row, Button } from "react-bootstrap";

export default function ContactInfo(data) {
  return (
    <Container fluid>
      <div className='no-padding section'>
        <Row>
          <h2>Contact Info</h2>
        </Row>
        <Row className='row-info first-row'>
          <div className='info'>
            <div className='info-label'>Mobile Number</div>
            <div className='info-content'>{data.user.mobileno.nbr.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Email</div>
            <div className='info-content'>{data.user.email.value}</div>
          </div>
        </Row>
      </div>
      <div className='no-padding section'>
        <Row>
          <h2>Registered Address</h2>
        </Row>
        <Row className='row-info first-row'>
          <div className='info'>
            <div className='info-label'>Block Number</div>
            <div className='info-content'>{data.user.regadd.block.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Street Name</div>
            <div className='info-content'>{data.user.regadd.street.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Building Name</div>
            <div className='info-content'>{data.user.regadd.building.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Floor & Unit No</div>
            <div className='info-content'>#{data.user.regadd.floor.value}-{data.user.regadd.unit.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Postal Code</div>
            <div className='info-content'>{data.user.regadd.postal.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Type of Housing</div>
            <div className='info-content'>{data.user.hdbtype.desc}</div>
          </div>
        </Row>
      </div>
      <div className='no-padding section'>
        <Row>
          <Button onClick={() => data.nextInfo()}>Continue</Button>
        </Row>
      </div>
    </Container>
  );
}