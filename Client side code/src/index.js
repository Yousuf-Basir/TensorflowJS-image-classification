import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';


import WebcamSetup from './scripts/WebcamSetup'
import CapturePanel from './scripts/CapturePanel'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="rootDiv">
        <div id="resultText" className="topBar">Capture image to recognize an object</div>
        <WebcamSetup />
        <CapturePanel />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
