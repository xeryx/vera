import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';


class DbStatusInfoCmp extends Component {
    
    constructor(props) {
        super(props); 
        this.componentDidMount = this.componentDidMount.bind(this); 
    }

    render() {  

        let color = "red";
        let content = "offline"

        if(this.props.isDbOnline) {
            color = "green";
            content = "online" 
        }

        if(this.props.isWaiting) {
            content = <CircularProgress size={20}/>                      
        }

        return(

            <div style={{float:"right", fontSize:"16px"}}>
                <button style={{background:"transparent", border: "none", outline:"none", height:20, width:50}} onClick={this.componentDidMount}></button>
                <span>DB connection status:</span>
                <span style={{color:color, padding:"10px"}}>{content}</span> 
            </div>
        )
    }

    componentDidMount() {
        this.props.callback("updateDbState",{})
    }

}          


export default DbStatusInfoCmp;
