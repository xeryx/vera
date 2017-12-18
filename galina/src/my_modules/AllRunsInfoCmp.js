import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
//import ReqsPerSecCmp from './ReqsPerSecCmp'


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
        let selectedRunGeneralInfoTable = "";      
        let menuDisabled = false;
        let selectedObj = {};

        let componentContent = "";


        if(this.props.isWaiting) {
            componentContent = 
            <div>
                <span style={{fontSize:"16px", padding:"0px 20px 0px 0px"}}>Loading runs info...</span>
                <span><CircularProgress size={25}/></span> 
            </div>
             
        } else {
            if(this.props.runsInfo.length === 0) {
                
                runItems.push(<MenuItem key={0} value={0} primaryText={"None"} />)
                menuDisabled = true;
                componentContent =
                        <div>
                            <div>Load test runs:</div>
                            <div style={{float:"left", width:"250px"}}>    
                                <DropDownMenu 
                                    value={this.props.menuValue} 
                                    disabled={menuDisabled}
                                    >
                                {runItems}
                                </DropDownMenu>
                            </div>
                        </div>
                  
            }
            else {
                for (let i = 0; i < this.props.runsInfo.length; i++ ) {
                    runItems.push(<MenuItem value={i} primaryText={this.props.runsInfo[i].startTime}  key={i} />);
                }
    
                selectedObj = this.props.runsInfo[this.props.menuValue];
            
            
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
                {/*<ReqsPerSecCmp 
                    runReqsPerSec = "N/A"
                    isWaiting = {this.state.componentWaiting["ReqsPerSecCmp"]}
                />*/}
                </tbody></table>
            
                componentContent = 
                    <div>
                    <div>Load test runs:</div>
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
                    <div style={{float:"left", padding:"10px 0px 0px 0px"}}>
                        {selectedRunGeneralInfoTable}
                    </div>
                
                    <div style={{ clear:"both"}}></div>
                </div>
            }

        }

       return(componentContent)
        
    }

    handleChangeMenu = (event, index, value) => this.props.callback("runMenuChange", value);

}       




export default AllRunsInfoCmp;
