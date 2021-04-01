import React, { Component } from 'react';
import LoaderGif from '../../assets/img/loader.gif';

export default class FullPageLoader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;
    if (!loading) {
      return null;
    }
    return (
      <div className='loader-container'>
        <div className='loader'>
          <img src={LoaderGif} />
        </div>
      </div>
    );
  }
}