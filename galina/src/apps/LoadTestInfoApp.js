import './styles/LoadTestInfoApp.css';
import React, { Component } from 'react';
import * as utils from '../utils.js'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import {
   testDbConnection,
   getAllTestRuns,
   getGraphData,
   getPageResultsByTestCase,
   getPageResults,
   getTestCaseResults,
   getSystemUnderTestResources
} from '../ServerApi'
import AllRunsInfoCmp from '../my_modules/AllRunsInfoCmp'
import DbStatusInfoCmp from "../my_modules/DbStatusInfoCmp"
import RunTestCasesExtendedInfoCmp from "../my_modules/RunTestCasesExtendedInfoCmp"
import TestCasePagesInfoCmp from "../my_modules/TestCasePagesInfoCmp"
import MachinesExtendedInfoCmp from "../my_modules/MachinesExtendedInfoCmp"
import MachinePlotCmp from "../my_modules/MachinePlotCmp"

class LoadTestInfoApp extends Component {

   constructor(props) {
      super(props);

      this.childrenCallback = this.childrenCallback.bind(this);

      this.state = {
         isDbOnline: false,
         allRunsInfo: [],

         selectedRunTestCaseInfo: [],
         selectedRunTestCaseExtendedInfo: [],

         selectedTestCase: "",
         selectedTestCasePageInfo: [],
         selectedRunMachineExtendedInfo:[],
         selectedMachine: "",
         selectedMachinePlotData: {},
         
         selectedRunId: "",
         selectedRunIndex: 0,

         testCasePagesDialogOpen: false,
         machinePlotDialogOpen: false,

         componentWaiting: {
            "DbStatusInfoCmp": false,
            "AllRunsInfoCmp": false,
            "TestCasePagesInfoCmp": false,
            "MachinePlotCmp": false,
            "MachinesExtendedInfoCmp":false,
            "RunTestCasesExtendedInfoCmp":false,
         },
      };
   }

   render() {

      let dbStatusCmp = <DbStatusInfoCmp
         isDbOnline={this.state.isDbOnline}
         isWaiting={this.state.componentWaiting["DbStatusInfoCmp"]}
         callback={this.childrenCallback}
      />

      let allRunsInfoCmp = <AllRunsInfoCmp
         isDbOnline={this.state.isDbOnline}
         runsInfo={this.state.allRunsInfo}
         isWaiting={this.state.componentWaiting["AllRunsInfoCmp"]}
         callback={this.childrenCallback}
         menuValue={this.state.selectedRunIndex}
      />

      let runTestCasesExtendedInfo = <RunTestCasesExtendedInfoCmp
         testCasesPagesInfo={this.state.selectedRunTestCaseExtendedInfo}
         testCasesOverallInfo={this.state.selectedRunTestCaseInfo}
         isWaiting={this.state.componentWaiting["RunTestCasesExtendedInfoCmp"]}
         runId={this.state.selectedRunId}
         callback={this.childrenCallback}
      />      

      let testCasePageDialog = <TestCasePagesInfoCmp
         isOpen={this.state.testCasePagesDialogOpen}
         callback={this.childrenCallback}
         pagesInfo={this.state.selectedTestCasePageInfo}
         testCaseName={this.state.selectedTestCase}
         isWaiting={this.state.componentWaiting["TestCasePagesInfoCmp"]}
      />

      let runMachinesExtendedInfo = <MachinesExtendedInfoCmp
         machineInfo={this.state.selectedRunMachineExtendedInfo}
         isWaiting={this.state.componentWaiting["MachinesExtendedInfoCmp"]}
         runId={this.state.selectedRunId}
         callback={this.childrenCallback}
      />

      let machinePlotDialog = <MachinePlotCmp
         isOpen={this.state.machinePlotDialogOpen}
         callback={this.childrenCallback}
         plotData={this.state.selectedMachinePlotData}
         machineName={this.state.selectedMachine}
         isWaiting={this.state.componentWaiting["MachinePlotCmp"]}
      />

      return (
         <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div>
            <div style={{ margin: "20px 0px 10px 0px" }}>
               {dbStatusCmp}
            </div>
            <div style={{ margin: "10px 00px 10px 0px" }}>
               {allRunsInfoCmp}
            </div>
            <div style={{ margin: "10px 00px 10px 0px" }}>
               {runTestCasesExtendedInfo}
            </div>
            <div style={{ margin: "35px 00px 10px 0px" }}>
               {runMachinesExtendedInfo}
            </div>
            <div style={{ margin: "20px 0px 10px 0px" }}>
               {testCasePageDialog}
            </div>
            <div style={{ margin: "20px 0px 10px 0px" }}>
               {machinePlotDialog}
            </div>            
         </div></MuiThemeProvider>
      )
   }

   childrenCallback = function (command, data) {

      switch (command) {

         default:
            break;

         case "runMenuChange":
            this.setState({
               selectedRunIndex: data,
               selectedRunId: this.state.allRunsInfo[data].runID,
               selectedRunTestCaseInfo: [],
               selectedRunTestCaseExtendedInfo: [],
               selectedTestCasePageInfo: [],
               selectedRunMachineExtendedInfo: [],
            });
            break;

         case "updateDbState":
            this.changeWaitingState("DbStatusInfoCmp", true);
            this.testDbConnectionInfo()
               .then(response => this.changeWaitingState("DbStatusInfoCmp", false))
               .then(response => {
                  if (this.state.isDbOnline) {
                     this.setState({
                        selectedRunTestCaseInfo: [],
                        selectedRunTestCaseExtendedInfo: [],
                        selectedTestCasePageInfo: [],
                        selectedRunMachineExtendedInfo: [],
                        selectedRunId:"",
                        selectedMachine: "",
                        selectedMachinePlotData: {},
                  });
                  this.changeWaitingState("AllRunsInfoCmp", true);
                  this.getAllTestRunsInfo()
                     .then(response => this.changeWaitingState("AllRunsInfoCmp", false))
                  }
               })
            break;

         case "updateAllRunsInfo":
            this.changeWaitingState("AllRunsInfoCmp", true);
            this.getAllTestRunsInfo()
               .then(response => this.changeWaitingState("AllRunsInfoCmp", false))
            break;

         case "updateRunTestCasesInfo":
            this.changeWaitingState("RunTestCasesInfoCmp", true);
            this.getRunTestCasesInfo(this.state.selectedRunId)
               .then(response => this.changeWaitingState("RunTestCasesInfoCmp", false))
            break;

            case "updateRunTestCasesExtendedInfo":
            this.changeWaitingState("RunTestCasesExtendedInfoCmp", true);
            this.getRunTestCasesExtendedInfo(this.state.selectedRunId)
               .then(response => this.changeWaitingState("RunTestCasesExtendedInfoCmp", false))
            break;


         case "openTestCasePagesDialog":
            this.changeWaitingState("TestCasePagesInfoCmp", true);
            this.setState({ 
               selectedTestCasePageInfo: [],
               testCasePagesDialogOpen: true, 
               selectedTestCase: data,
            })
            this.getTestCasePageResults(this.state.selectedRunId, data)
               .then(response => this.changeWaitingState("TestCasePagesInfoCmp", false))
            break;

         case "updateRunMachineExtendedInfo":
            this.changeWaitingState("MachinesExtendedInfoCmp", true);
            this.getRunMachinesExtendedInfo(this.state.selectedRunId)
               .then(response => this.changeWaitingState("MachinesExtendedInfoCmp", false))
            break;            

         case "openMachinePlotDialog":
            this.changeWaitingState("MachinePlotCmp", true);
            this.setState({ 
               selectedMachinePlotData: {},
               machinePlotDialogOpen: true, 
               selectedMachine: data
            })
            this.getSelectedMachinePlotInfo(this.state.selectedRunId, data)
               .then(response => this.changeWaitingState("MachinePlotCmp", false))
            break;

         case "openMachineDiskPlotDialog":
            this.changeWaitingState("MachinePlotCmp", true);
            this.setState({ 
               selectedMachinePlotData: {},
               machinePlotDialogOpen: true, 
               selectedMachine: data
            })
            this.getSelectedMachineDiskPlotInfo(this.state.selectedRunId, data)
               .then(response => this.changeWaitingState("MachinePlotCmp", false))
            break;

         case "closeTestCasePagesDialog":
            this.closeTestCaseDialog()
            break;

         case "closeMachinePlotDialog":
            this.closeMachinePlotDialog()
            break;
      }
   }

   testDbConnectionInfo = function () {
      return (
         testDbConnection()
            .then(response => {
               if (response.success === "true") {
                  this.setState({
                     isDbOnline: ((response.data === "True") ? true : false)
                  })
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))

      )
   }

   getAllTestRunsInfo = function () {
      return (
         getAllTestRuns()
            .then(response => {
               if (response.success === "true") {

                  let completedRuns = []
                  for (let i = 0; i < response.data.length; i++) {
                     if (response.data[i].outcome === "Completed") {
                        completedRuns.push(response.data[i])
                     }
                  }
                  this.setState({
                     allRunsInfo: completedRuns,
                     selectedRunIndex: 0,
                     selectedRunId: completedRuns[0].runID
                  });
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   getRunTestCasesInfo = function (runId) {
      return (
         getTestCaseResults(runId)
            .then(response => {
               if (response.success === "true") {
                  this.setState({
                     selectedRunTestCaseInfo: response.data
                  });
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }


   getRunTestCasesExtendedInfo = function (runId) {

      let promise1 = getTestCaseResults(runId);
      let promise2 = getPageResults(runId);
      return (Promise.all([promise1, promise2])
         .then(responses => {
            if ((responses[0].success === "true") && (responses[1].success === "true")) {
                  this.setState({
                     selectedRunTestCaseExtendedInfo: responses[1].data,
                     selectedRunTestCaseInfo: responses[0].data
                  });
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   getRunMachinesExtendedInfo = function (runId) {
      return (
         getSystemUnderTestResources(runId)
            .then(response => {
               if (response.success === "true") {
                  response.data.push(response.data.shift());
                  this.setState({
                     selectedRunMachineExtendedInfo: response.data
                  });
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   getSelectedMachinePlotInfo = function (runId, machineName) {
      let promise1 = getGraphData(
         runId,
         machineName,
         "Processor",
         "%25%20Processor%20Time");
      let promise2 = getGraphData(
         runId,
         machineName,
         "Memory",
         "Available MBytes");
      return (Promise.all([promise1, promise2])
         .then(responses => {
            if ((responses[0].success === "true") && (responses[1].success === "true")) {
               responses[1].data[1] = responses[1].data[1].map(x => x / 1024)
               let tempPlotData = {
                  x: responses[0].data[0],
                  y1: responses[0].data[1],
                  y2: responses[1].data[1],
                  title: "CPU and Memory counters info",
                  xtitle: "time (mins)",
                  y1title: "% CPU",
                  y2title: "Available Memory",
                  y1DataName: "CPU",
                  y2DataName: "Memory",
               }
               this.setState({ selectedMachinePlotData: tempPlotData });
            }
         })
         .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   getSelectedMachineDiskPlotInfo = function (runId, machineName) {
      let promise1 = getGraphData(
         runId,
         machineName,
         "PhysicalDisk",
         "%25%20Idle%20Time");
      let promise2 = getGraphData(
         runId,
         machineName,
         "PhysicalDisk",
         "Disk%20Bytes%2Fsec");
      return (Promise.all([promise1, promise2])
         .then(responses => {
            if ((responses[0].success === "true") && (responses[1].success === "true")) {
               responses[1].data[1] = responses[1].data[1].map(x => x / 1048576)
               let tempPlotData = {
                  x: responses[0].data[0],
                  y1: responses[0].data[1],
                  y2: responses[1].data[1],
                  title: "Disk counters info",
                  xtitle: "time (mins)",
                  y1title: "% Idle time",
                  y2title: "Disk MB/s",
                  y1DataName: "Disk Idle %",
                  y2DataName: "Disk usage",
               }
               this.setState({ selectedMachinePlotData: tempPlotData });
            }
         })
         .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   getTestCasePageResults = function (runId, testCaseName) {
      return (
         getPageResultsByTestCase(runId, testCaseName)
            .then(response => {
               if (response.success === "true") {
                  this.setState({
                     selectedTestCasePageInfo: response.data
                  });
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   closeTestCaseDialog = function () {
      this.setState({ testCasePagesDialogOpen: false })
   }
   closeMachinePlotDialog = function () {
      this.setState({ machinePlotDialogOpen: false })
   }

   changeWaitingState = function (component, newState) {
      this.setState({ componentWaiting: utils.updateObject(this.state.componentWaiting, component, newState) })
   }

}

export default LoadTestInfoApp;


