import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';



const compName = "ReqsPerSecCmp";

class ReqsPerSecCmp extends Component {
    
    render() {  

        let content = "";

        if(this.props.isWaiting) {
            content = <CircularProgress size={20}/>                      
        } else {
            content = this.props.runReqsPerSec;
        }

        return(
            <tr><td>Requests/sec</td><td className="tdh">{content}</td></tr>
        )
    }

}          


export default ReqsPerSecCmp;
