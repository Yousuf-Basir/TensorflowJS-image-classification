import React, { Component } from 'react';
import Webcam from "react-webcam";

 
class WebcamSetup extends React.Component {
  render() {

    const videoConstraints = {
      facingMode: { exact: "environment" }
    };
    return(
      <div>
        <Webcam height={'100%'} width={'100%'} videoConstraints={videoConstraints} /> <br/>
        <img id="snapImage" src="" />
      </div>
    );
  }
}

export default WebcamSetup;