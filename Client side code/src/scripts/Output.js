import React, {Component} from 'react'

class Output extends Component{
  render(){
    return(
      <div id="outputPanel" className="outputRoot">
        <ul>
          {
            this.props.preds[0].className == "Loading"?
            <p>Predicting ...</p> :
            this.props.preds.map(pred => (
              <li>
                 <span>{Math.floor(pred.probability*100)} % chance it's a </span>
                 {pred.className}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Output;