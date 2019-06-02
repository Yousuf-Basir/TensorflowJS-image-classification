import React, { Component } from 'react';
import axios from 'axios';
import Output from './Output'
const outputx = [ 
      { 
        className: 'Loading',
        probability: "Uploading data to server"
      },
      { 
        className: '',
        probability: ''
      },
      { 
        className: '',
        probability: ''
      } 
    ]
class CapturePanel extends Component{
    state ={
      show: 'false',
      output: outputx
    }
    constructor(){
      
    }

    componentDidMount(){
      var imageEl = document.getElementById("snapImage");
      this.toggle(imageEl);
    }
    getScreenshot = (videoEl) => {
      const w = videoEl.videoWidth/3; const h = videoEl.videoHeight/3;
      const canvas = document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;
      
      canvas.getContext('2d').drawImage(videoEl, 0, 0, w, h);

      const image = new Image()
      image.src = canvas.toDataURL('image/jpeg');
      
      return image;
    }


      toggle = (x) => {
        if (x.style.display === "none") {
          x.style.display = "block";
          this.setState({
            show: 'true'
          })
        } else {
          x.style.display = "none";
          this.setState({
            show: 'false',
            output: outputx
          })
        }
      }

    capture =() => {
      var topBar = document.getElementById('resultText');
      var videoEl = document.getElementsByTagName("video")[0];
      

      const img = this.getScreenshot(videoEl);
      var preview = document.getElementById("snapImage");
      preview.src = img.src;
      this.toggle(preview);
      

        const postUrl = 'https://TensorOnRepl--gourabyousuf.repl.co/upload';
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "https://mobilenetui.stackblitz.io",
          }
        };
      

        if (preview.style.display === "block") {
          topBar.innerHTML = 'Uploading image data to server...';

          axios.post(postUrl, {
            imageHeight: videoEl.videoHeight,
            imageWidth: videoEl.videoWidth,
            imageData: img.src
          }, axiosConfig)
          .then((data) => {
            console.log(data)
            const preds = data.data;
            this.setState({
              output: preds
            })
            topBar.innerHTML = "";
            }, (errorResponse) => {
            console.log(errorResponse)
          })
        } else{
          topBar.innerHTML = 'Capture image to recognize an object';
        }
        

      

    }

  render(){
    return(
      <div className="capturePanelRoot">
        {this.state.show == 'true'?<Output preds={this.state.output}/>:<p></p>}
        <button id="captureBtn" onClick={this.capture}>
          {
            this.state.show == 'true'?
            'Close':
            ''
          }
        </button>
      </div>
    )
  }
}

export default CapturePanel;