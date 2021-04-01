import React from 'react';
import { Container, Row, Table } from "react-bootstrap";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function numberFormat(value) {
  return value.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
}

function dateFormat(date) {
  var elem = date.split('-');
  var year = elem[0], month = elem[1], day = elem[2];
  return day + " " + months[parseInt(month) - 1] + " " + year;
}

function monthFormat(monthStr) {
  var elem = monthStr.split('-');
  var year = elem[0], month = elem[1];
  return months[parseInt(month) - 1] + " " + year;
}

export default function IncomeInfo(data) {
  return (
    <Container fluid>
      
      <div className='no-padding section'>
        <Row>
          <h2>Notice of Assessment (History)</h2>
        </Row>
        {data.user.noahistory.noas &&
        <Row className='row-info first-row'>
          <Table borderless={true}>
            <thead>
              <tr>
                <th>Year of Assessment</th>
                {data.user.noahistory.noas.map((noa, index) => 
                <th className='cell-right' key={index}>{noa.yearofassessment.value}</th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employment</td>
                {data.user.noahistory.noas.map((noa, index) => 
                <td className='cell-right' key={index}>{numberFormat(noa.employment.value)}</td>
                )}
              </tr>
              <tr>
                <td>Trade</td>
                {data.user.noahistory.noas.map((noa, index) => 
                <td className='cell-right' key={index}>{numberFormat(noa.trade.value)}</td>
                )}
              </tr>
              <tr>
                <td>Interest</td>
                {data.user.noahistory.noas.map((noa, index) => 
                <td className='cell-right' key={index}>{numberFormat(noa.interest.value)}</td>
                )}
              </tr>
              <tr>
                <td>Rent</td>
                {data.user.noahistory.noas.map((noa, index) => 
                <td className='cell-right' key={index}>{numberFormat(noa.rent.value)}</td>
                )}
              </tr>
              <tr className='cell-bold'>
                <td>Total Income</td>
                {data.user.noahistory.noas.map((noa, index) => 
                <td className='cell-right' key={index}>{numberFormat(noa.employment.value + noa.trade.value + noa.interest.value + noa.rent.value)}</td>
                )}
              </tr>
              <tr className='cell-bold'>
                <td>Tax Clearance</td>
                {data.user.noahistory.noas.map((noa, index) => 
                <td className='cell-right' key={index}>{noa.taxclearance.value}</td>
                )}
              </tr>
            </tbody>
          </Table>
        </Row>
        }
      </div>
      <div className='no-padding section'>
        <Row>
          <h2>Other Income Information</h2>
        </Row>
        <Row className='row-info first-row'>
          <div className='info'>
            <div className='info-label'>Ownership of Private Residential Property</div>
            <div className='info-content'>{data.user.ownerprivate.value === 'false' ? 'No' : 'Yes'}</div>
          </div>
        </Row>
      </div>
      <div className='no-padding section'>
        <Row>
          <h2>CPF Account Balance</h2>
        </Row>
        <Row className='row-info first-row'>
          <Table borderless={true}>
            <tbody>
              {data.user.cpfbalances.oa && 
              <tr>
                <td>Ordinary Account (OA) (S$)</td>
                <td className='cell-right cell-bold'>{numberFormat(data.user.cpfbalances.oa.value)}</td>
              </tr>
              }
              {data.user.cpfbalances.sa && 
              <tr>
                <td>Special Account (SA) (S$)</td>
                <td className='cell-right cell-bold'>{numberFormat(data.user.cpfbalances.sa.value)}</td>
              </tr>
              }
              {data.user.cpfbalances.ma && 
              <tr>
                <td>Medisave Account (MA) (S$)</td>
                <td className='cell-right cell-bold'>{numberFormat(data.user.cpfbalances.ma.value)}</td>
              </tr>
              }
            </tbody>
          </Table>
        </Row>
      </div>
      
      <div className='no-padding section'>
        <Row>
          <h2>CPF Contribution History</h2>
        </Row>
        {data.user.cpfcontributions.history && 
        <Row className='row-info first-row'>
          <Table striped borderless={true}>
            <thead>
              <tr>
                <th className='cell-center'>For Month</th>
                <th className='cell-right'>Paid On</th>
                <th className='cell-right'>Amount (S$)</th>
                <th>Employer</th>
              </tr>
            </thead>
            <tbody>
              {data.user.cpfcontributions.history.map((contrib, index) =>
              <tr key={index}>
                <td className='cell-center'>{monthFormat(contrib.month.value)}</td>
                <td className='cell-right'>{dateFormat(contrib.date.value)}</td>
                <td className='cell-right'>{numberFormat(contrib.amount.value)}</td>
                <td>{contrib.employer.value}</td>
              </tr>
              )}
            </tbody>
          </Table>
        </Row>
        }
      </div>
    </Container>
  );
}