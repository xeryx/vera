import React, { Component } from 'react';
import * as utils from '../utils.js'; 
import CircularProgress from 'material-ui/CircularProgress';
//import RaisedButton from 'material-ui/RaisedButton';


class MachinesExtendedInfoCmp extends Component {


   render() {

      let nonStorageMachinesInfoElem = "";
      let storageMachinesInfoElem = "";
      let nonStorageMachineInfoRows = [];
      let storageMachineInfoRows = [];
      let nonStorageMachineInfoHeaders = [];
      let storageMachineInfoHeaders = [];

      let componentContent = "";
/*    let loadInfoButton = "";

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
*/
      if (this.props.isWaiting) {
         componentContent =
            <div>
               {/*<div>{loadInfoButton}</div>*/}
               <span className="section-waiting">Loading environment info...</span>
               <span><CircularProgress size={25} /></span>
            </div>

      } else {

         let nonStorageMachineNames = [];
         let storageMachineNames = [];

         (utils.getUniqueKeyValuesInObjectArray(this.props.machineInfo,"MachineName")).forEach(function(name) {
               if(utils.isStorageServer(name))  {
                  storageMachineNames.push(name);        
               } else {
                  nonStorageMachineNames.push(name);        
               }
         });

         let nonStorageMachineInfoObject = utils.getObjectofArraysByUniqueKeyValues(this.props.machineInfo, "MachineName",nonStorageMachineNames);
         let storageMachineInfoObject = utils.getObjectofArraysByUniqueKeyValues(this.props.machineInfo, "MachineName",storageMachineNames);

         if (this.props.machineInfo.length > 0) {

            nonStorageMachineInfoHeaders = [
               <td key={0} className="header-1">Machine name</td>,
               <td key={1} className="header-1">% CPU time</td>,
               <td key={2} className="header-1">Avail mem at end (GB)</td>,
              ];

            for (let i = 0; i < nonStorageMachineNames.length; i++) {
               let machineInfoObj = nonStorageMachineInfoObject[nonStorageMachineNames[i]];
               
               let cpuCounterObject = utils.geObjectWithKeyValueFromArray(machineInfoObj, "CounterName", "% Processor Time");
               let memoryCounterObject = utils.geObjectWithKeyValueFromArray(machineInfoObj, "CounterName", "Available MBytes");

               nonStorageMachineInfoRows.push(<tr key={i}>
                  <td className="row-data-1" onClick={(e) => 
                     this.handleNonStorageMachineClick(e, nonStorageMachineNames[i])}>{nonStorageMachineNames[i]}
                  </td>
                  <td className="row-data-2">{parseFloat(cpuCounterObject.CumulativeValue).toFixed(2)}</td>
                  <td className="row-data-2">{parseFloat(memoryCounterObject.CumulativeValue / 1024).toFixed(2)}</td>
               </tr>)
            }

            nonStorageMachinesInfoElem =
               <div>
                  <div className="section-title">Environment info:</div>
                  <div style={{ "margin": "10px 0px 0px 0px" }}>
                     <table><tbody>
                        <tr>
                        {nonStorageMachineInfoHeaders}
                        </tr>
                        {nonStorageMachineInfoRows}
                     </tbody></table>
                  </div>
               </div>

/////////////////////////////////////////////////////////////////////////

            storageMachineInfoHeaders = [
               <td key={0} className="header-1">Machine name (storage)</td>,
               <td key={1} className="header-1">Disk idle %</td>,
               <td key={2} className="header-1">Disk MB/s</td>
            ]; 

            for (let i = 0; i < storageMachineNames.length; i++) {
               let machineInfoObj = storageMachineInfoObject[storageMachineNames[i]];
               
               let diskIdleCounterObject = utils.geObjectWithKeyValueFromArray(machineInfoObj, "CounterName", "% Idle Time");
               let diskRateCounterObject = utils.geObjectWithKeyValueFromArray(machineInfoObj, "CounterName", "Disk Bytes/sec");

               storageMachineInfoRows.push(<tr key={i}>
                  <td className="row-data-1" onClick={(e) => 
                     this.handleStorageMachineClick(e, storageMachineNames[i])}>{storageMachineNames[i]}
                  </td>
                  <td className="row-data-2">{parseFloat(diskIdleCounterObject.CumulativeValue).toFixed(2)}</td>
                  <td className="row-data-2">{parseFloat(diskRateCounterObject.CumulativeValue / 1048576).toFixed(2)}</td>
               </tr>)
            }

            storageMachinesInfoElem =
               <div>
                  <div style={{ "margin": "10px 0px 0px 0px" }}>
                     <table><tbody>
                        <tr>
                        {storageMachineInfoHeaders}
                        </tr>
                        {storageMachineInfoRows}
                     </tbody></table>
                  </div>
               </div>



            componentContent =
               <div>
                  {/*loadInfoButton*/}
                  <div style={{ "margin": "20px 0px 0px 0px" }}>
                     {nonStorageMachinesInfoElem}
                  </div>
                  <div style={{ "margin": "20px 0px 0px 0px" }}>
                     {storageMachinesInfoElem}
                  </div>
               </div>
         } /*else {
            componentContent = loadInfoButton

         }*/
      }


      return (componentContent)
   }

   //handleUpdateMachinesInfoRequest = (event, index, value) => this.props.callback("updateRunMachineExtendedInfo", {});
   handleNonStorageMachineClick = function (event, data) {
      this.props.callback("openMachinePlotDialog", data);
   }
   handleStorageMachineClick = function (event, data) {
      this.props.callback("openMachineDiskPlotDialog", data);
   }
}


export default MachinesExtendedInfoCmp;



//memory 24,134 cpu 43.1