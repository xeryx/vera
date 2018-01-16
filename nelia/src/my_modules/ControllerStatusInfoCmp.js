import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';


class ControllerStatusInfoCmp extends Component {
    
    constructor(props) {
        super(props); 
        this.updateButtonClick = this.updateButtonClick.bind(this); 
    }

    render() {  

        let color = "red";
        let content = "offline"

        if(this.props.isControllerOnline) {
            color = "green";
            content = "online" 
        }

        if(this.props.isWaiting) {
            content = <CircularProgress size={20}/>                      
        }

        return(

            <div style={{float:"right", fontSize:"16px"}}>
               <button style={{background:"transparent", border: "none", outline:"none", height:20, width:50}} 
                        onClick={this.updateButtonClick}>
               </button>
                <span>Controller connection status:</span>
                <span style={{color:color, padding:"10px"}}>{content}</span> 
            </div>
        )
    }

    updateButtonClick() {
      try {localStorage.clear();} catch(err){}
      this.props.callback("updateControllerState",{})
   }

}          


export default ControllerStatusInfoCmp;
