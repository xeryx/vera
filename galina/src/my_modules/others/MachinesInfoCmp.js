import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';


class MachinesInfoCmp extends Component {


   render() {

      let machinesInfoElem = "";
      let machineInfoRows = [];

      let componentContent = "";
      let loadInfoButton = "";

      if (this.props.runId !== "") {
         loadInfoButton =
            <RaisedButton
               label="Environment resources info"
               primary={true}
               style={{ "margin": "0px 0px 15px 0px" }}
               onClick={this.handleUpdateMachinesInfoRequest}
               disabled={this.props.isWaiting}
            />
      }

      if (this.props.isWaiting) {
         componentContent =
            <div>
               <div>{loadInfoButton}</div>
               <span style={{ fontSize: "16px", padding: "0px 20px 0px 0px" }}>Loading environment info...</span>
               <span><CircularProgress size={25} /></span>
            </div>

      } else {

         if (this.props.machineInfo.length > 0) {

            for (let i = 0; i < this.props.machineInfo.length; i++) {
               machineInfoRows.push(<tr key={i}>
                  <td className="row-data-1" onClick={(e) => this.handleMachineClick(e, this.props.machineInfo[i])}>{this.props.machineInfo[i]}</td>
               </tr>)
            }

            machinesInfoElem =
               <div>
                  <div>Environment info:</div>
                  <div style={{ "margin": "10px 0px 0px 0px" }}>
                     <table><tbody>
                        <tr>
                           <td key={0} className="header-1">Machine name</td>
                        </tr>
                        {machineInfoRows}
                     </tbody></table>
                  </div>
               </div>

            componentContent =
               <div>
                  {loadInfoButton}
                  <div style={{ "margin": "10px 0px 0px 0px" }}>
                     {machinesInfoElem}
                  </div>
               </div>
         } else {
            componentContent = loadInfoButton

         }
      }


      return (componentContent)
   }

   handleUpdateMachinesInfoRequest = (event, index, value) => this.props.callback("updateRunMachineInfo", {});
   handleMachineClick = function (event, data) {
      this.props.callback("openMachinePlotDialog", data);
   }

}


export default MachinesInfoCmp;
