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
                        "ReqsPerSecCmp":false,
                    },
        }
    }


    render() {  

        let runItems = [];
        let waitingCircle = "" ;
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
        <tr><td className="row-data-1">Users</td><td className="row-data-2">{selectedObj.users}</td></tr>
        <tr><td className="row-data-1">Duration (mins)</td><td className="row-data-2">{durationMins}</td></tr>
        <tr><td className="row-data-1">Start Time</td><td className="row-data-2">{selectedObj.startTime}</td></tr>
        <tr><td className="row-data-1">End Time</td><td className="row-data-2">{selectedObj.endTime}</td></tr>
        <tr><td className="row-data-1">ID</td><td className="row-data-2">{selectedObj.runID}</td></tr>
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
