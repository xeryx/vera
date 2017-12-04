import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class AllRunsInfoCmp extends Component {
    
    render() {  

        var runItems = [];
        var waitingCircle = "" ;
        var selectedRunInfo = "";


        if(this.props.runsInfo.length === 0) {
            runItems.push(<MenuItem key={0} value={0} primaryText={"None"} />)
        }
        else {
            for (let i = 0; i < this.props.runsInfo.length; i++ ) {
                runItems.push(<MenuItem value={i} primaryText={this.props.runsInfo[i].startTime}  key={i} />);
            }

            var selectedObj = this.props.runsInfo[this.props.menuValue];

            var selectedRunInfoTable = <table><tbody>
                    <tr><td>Users</td><td className="tdh">{selectedObj.users}</td></tr>
                    <tr><td>Duration</td><td className="tdh">{selectedObj.runDuration}</td></tr>
                    <tr><td>Outcome</td><td className="tdh">{selectedObj.outcome}</td></tr>
                    <tr><td>End Time</td><td className="tdh">{selectedObj.endTime}</td></tr>
                    </tbody></table>
                                
        }

        if(this.props.isWaiting) {
            waitingCircle = <span><CircularProgress size={25}/></span> 
        } 
        
 
        return(

            <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
            <div>
                <RaisedButton 
                    label="Load Test Runs" 
                    primary={true} 
                    style={{"margin":"0px 0px 15px 0px"}}
                    onClick={this.props.infoFunction} 
                    disabled={this.props.isWaiting}/>
                <DropDownMenu 
                    value={this.props.menuValue} 
                    onChange={this.handleChange}
                    >
                {runItems}
                </DropDownMenu>
                {waitingCircle}
                <div style={{"margin":"10px 0px 0px 0px"}}>
                {selectedRunInfoTable}
                </div>
                </div></MuiThemeProvider>

        )
    }




    handleChange = (event, index, value) => this.props.changeDropdownValue(value,this.props.runsInfo[value].runID);

}       




export default AllRunsInfoCmp;
