import React from 'react';
import { Container, Row, Button } from "react-bootstrap";

export default function PersonalInfo(data) {
  return (
    <Container fluid>
      <div className='no-padding section'>
        <Row>
          <h2>PersonalInfo</h2>
        </Row>
        <Row className='row-info first-row'>
          <div className='info'>
            <div className='info-label'>NRIC/FIN</div>
            <div className='info-content'>{data.user.uinfin.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Principal Name</div>
            <div className='info-content'>{data.user.name.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Sex</div>
            <div className='info-content'>{data.user.sex.desc}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Date of Birth</div>
            <div className='info-content'>{data.user.dob.value}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Country of Birth</div>
            <div className='info-content'>{data.user.birthcountry.desc}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Residential Status</div>
            <div className='info-content'>{data.user.residentialstatus.desc}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Nationality</div>
            <div className='info-content'>{data.user.nationality.desc}</div>
          </div>
        </Row>
        <Row className='row-info'>
          <div className='info'>
            <div className='info-label'>Race</div>
            <div className='info-content'>{data.user.race.desc}</div>
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