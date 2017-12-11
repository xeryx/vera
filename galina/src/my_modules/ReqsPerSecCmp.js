import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class ReqsPerSecCmp extends Component {
    
    render() {  

        let content = "";

        if(this.props.isWaiting) {
            content = <CircularProgress size={20}/>                      
        } else {
            content = this.props.runReqsPerSec;
        }

        return(
            <tr><td className="row-data-1">Requests/sec</td><td className="row-data-2">{content}</td></tr>
        )
    }

}          


export default ReqsPerSecCmp;
