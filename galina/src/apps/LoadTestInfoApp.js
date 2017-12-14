import './styles/LoadTestInfoApp.css';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import {
   testDbConnection,
   getAllTestRuns,
   getGraphData,
   getPageResultsByTestCase,
   getTestCaseResults,
   getMachinesInvolved
} from '../ServerApi'
import AllRunsInfoCmp from '../my_modules/AllRunsInfoCmp'
import DbStatusInfoCmp from "../my_modules/DbStatusInfoCmp"
import RunTestCasesInfoCmp from "../my_modules/RunTestCasesInfoCmp"
import TestCasePagesInfoCmp from "../my_modules/TestCasePagesInfoCmp"
import MachinesInfoCmp from "../my_modules/MachinesInfoCmp"
import MachinePlotCmp from "../my_modules/MachinePlotCmp"

class LoadTestInfoApp extends Component {

   constructor(props) {
      super(props);

      this.childrenCallback = this.childrenCallback.bind(this);

      this.state = {
         isDbOnline: false,
         allRunsInfo: [],
         selectedRunTestCaseInfo: [],
         selectedTestCase: "",
         selectedTestCasePageInfo: [],
         selectedRunMachineInfo: [],
         selectedMachine: "",
         selectedMachinePlotData: {},
         
         selectedRunId: "",
         selectedRunIndex: 0,

         testCasePagesDialogOpen: false,
         machinePlotDialogOpen: false,

         componentWaiting: {
            "DbStatusInfoCmp": false,
            "AllRunsInfoCmp": false,
            "MachinesInfoCmp": false,
            "TestCasePagesInfoCmp": false,
            "RunTestCasesInfoCmp": false,
            "MachinePlotCmp": false,
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

      let runTestCasesInfo = <RunTestCasesInfoCmp
         testCasesInfo={this.state.selectedRunTestCaseInfo}
         isWaiting={this.state.componentWaiting["RunTestCasesInfoCmp"]}
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

      let runMachinesInfo = <MachinesInfoCmp
         machineInfo={this.state.selectedRunMachineInfo}
         isWaiting={this.state.componentWaiting["MachinesInfoCmp"]}
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
               {runTestCasesInfo}
            </div>
            <div style={{ margin: "35px 00px 10px 0px" }}>
               {runMachinesInfo}
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
               selectedRunMachineInfo: [],
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
                        selectedRunMachineInfo: [],
                        selectedRunId:"",
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

         case "openTestCasePagesDialog":
            this.changeWaitingState("TestCasePagesInfoCmp", true);
            this.setState({ 
                  testCasePagesDialogOpen: true, 
                  selectedTestCase: data,
               })
            this.getTestCasePageResults(this.state.selectedRunId, data)
               .then(response => this.changeWaitingState("TestCasePagesInfoCmp", false))
            break;

         case "updateRunMachineInfo":
            this.changeWaitingState("MachinesInfoCmp", true);
            this.getRunMachinesInfo(this.state.selectedRunId)
               .then(response => this.changeWaitingState("MachinesInfoCmp", false))
            break;

         case "openMachinePlotDialog":
            this.changeWaitingState("MachinePlotCmp", true);
            this.setState({ 
                  machinePlotDialogOpen: true, 
                  selectedMachine: data
               })
            this.getSelectedMachinePlotInfo(this.state.selectedRunId, data)
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

   getRunMachinesInfo = function (runId) {
      return (
         getMachinesInvolved(runId)
            .then(response => {
               if (response.success === "true") {
                  response.data.push(response.data.shift());
                  this.setState({
                     selectedRunMachineInfo: response.data
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
      this.setState({ componentWaiting: updateObject(this.state.componentWaiting, component, newState) })
   }



}

export default LoadTestInfoApp;


const updateObject = function (obj, key, value) {
   obj[key] = value;
   return obj;
}