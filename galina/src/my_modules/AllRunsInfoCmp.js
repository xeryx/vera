import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ReqsPerSecCmp from './ReqsPerSecCmp'

const compName = "AllRunsInfoCmp";


class AllRunsInfoCmp extends Component {
    constructor(props) {
        super(props); 
        
        this.state = {componentWaiting:{
                        "DbStatusInfoCmp":false,
                    },
        }
    }


    render() {  

        let runItems = [];
        let waitingCircle = "" ;
        let selectedRunInfo = "";
        let selectedRunGeneralInfoTable = "";      
        let menuDisabled = false;
        let selectedObj = {};

        if(this.props.runsInfo.length === 0) {
            runItems.push(<MenuItem key={0} value={0} primaryText={"None"} />)
            selectedObj = {users:"-", runDuration:"-", endTime:"-", startTime:"-"}
        }
        else {
            for (let i = 0; i < this.props.runsInfo.length; i++ ) {
                runItems.push(<MenuItem value={i} primaryText={this.props.runsInfo[i].startTime}  key={i} />);
            }

            selectedObj = this.props.runsInfo[this.props.menuValue];
        }
        
        let durationMins = "-"

        if(!isNaN(selectedObj.runDuration)){
            durationMins = (selectedObj.runDuration)/60;
        } else {
            durationMins = selectedObj.runDuration;
        }

        selectedRunGeneralInfoTable = <table><tbody>
        <tr><td>Users</td><td className="tdh">{selectedObj.users}</td></tr>
        <tr><td>Duration (mins)</td><td className="tdh">{durationMins}</td></tr>
        <tr><td>Start Time</td><td className="tdh">{selectedObj.startTime}</td></tr>
        <tr><td>End Time</td><td className="tdh">{selectedObj.endTime}</td></tr>
        <ReqsPerSecCmp 
            runReqsPerSec = "N/A"
            isWaiting = {this.state.componentWaiting["ReqsPerSecCmp"]}
        />
        </tbody></table>


        if(this.props.isWaiting) {
            waitingCircle = <span><CircularProgress size={25}/></span> 
            menuDisabled = true;
        } 
        if(this.props.runsInfo.length<1) {
            menuDisabled = true;
        }
        

 
        return(
            <div>
                <div style={{float:"left", padding:"20px 0px 0px 0px"}}>  
                    <RaisedButton 
                        label="Load Test Runs" 
                        primary={true} 
                        onClick={this.handleChangeButton} 
                        disabled={this.props.isWaiting}
                    />
                </div> 
                <div style={{float:"left", width:"250px"}}>    
                    <DropDownMenu 
                        value={this.props.menuValue} 
                        onChange={this.handleChangeMenu}
                        disabled={menuDisabled}
                        autoWidth={false}
                        >
                    {runItems}
                    </DropDownMenu>
                </div>
                <div style={{float:"left"}}>
                    {selectedRunGeneralInfoTable}
                </div>
                {waitingCircle}
                <div style={{ clear:"both"}}></div>
            </div>

        )
    }




    handleChangeMenu = (event, index, value) => this.props.callback(compName, "runMenuChange", value);
    handleChangeButton = (event, index, value) => this.props.callback(compName,"updateAllRunsInfo",{});

}       




export default AllRunsInfoCmp;
