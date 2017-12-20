import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class AllRunsInfoCmp extends Component {

   render() {  

        let runItems = [];
        let selectedRunGeneralInfoTable = "";      
        let menuDisabled = false;
        let selectedObj = {};

        let componentContent = "";


        if(this.props.isWaiting) {
            componentContent = 
            <div>
                <span className="section-waiting">Loading runs info...</span>
                <span><CircularProgress size={25}/></span> 
            </div>
             
        } else {

            if(this.props.runsInfo.length > 0) {
                for (let i = 0; i < this.props.runsInfo.length; i++ ) {
                    runItems.push(<MenuItem value={i} primaryText={this.props.runsInfo[i].description + " (" + this.props.runsInfo[i].startTime + ")"}  key={i} />);
                }
    
                selectedObj = this.props.runsInfo[this.props.menuValue];
            
            
                let durationMins = "-"
        
                if(!isNaN(selectedObj.runDuration)){
                    durationMins = (selectedObj.runDuration)/60;
                } else {
                    durationMins = selectedObj.runDuration;
                }
        
                selectedRunGeneralInfoTable = <table><tbody>
                <tr><td className="row-data-1-nolink">Users</td><td className="row-data-2">{selectedObj.users}</td></tr>
                <tr><td className="row-data-1-nolink">Duration (mins)</td><td className="row-data-2">{durationMins}</td></tr>
                <tr><td className="row-data-1-nolink">Start Time</td><td className="row-data-2">{selectedObj.startTime}</td></tr>
                <tr><td className="row-data-1-nolink">End Time</td><td className="row-data-2">{selectedObj.endTime}</td></tr>
                <tr><td className="row-data-1-nolink">Description</td><td className="row-data-2">{selectedObj.description}</td></tr>
                <tr><td className="row-data-1-nolink">Analysis</td><td className="row-data-2">{selectedObj.comment.replace("[PERFTESTMV\\loadtester]","")}</td></tr>
                </tbody></table>
            
                componentContent = 
                    <div>
                    <div className="section-title">Load test runs:</div>
                    <div style={{float:"left"}}>    
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
