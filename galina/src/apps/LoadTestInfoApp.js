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
import RunMachinesDataCmp from "../my_modules/RunMachinesDataCmp"
import RunTestCasesInfoCmp from "../my_modules/RunTestCasesInfoCmp"
import TestCasePagesInfoCmp from "../my_modules/TestCasePagesInfoCmp"
//import RawJsonCmp from "../my_modules/RawJsonCmp"

class LoadTestInfoApp extends Component {

  constructor(props) {
    super(props); 

    this.changeWaitingState = this.changeWaitingState.bind(this); 
    this.childrenCallback = this.childrenCallback.bind(this); 
    
    this.state = {
                  databaseStatus:false,
                  allRunsInfo:[], 
                  currentRunPageInfo:[],
                  currentRunTestCaseInfo:[],
                  currentRunMachineInfo:[],

                  currentRunPlotData:{},

                  selectedRunId:"",
                  selectedRun:0,
                  selectedMachine:0,

                  testCasePagesOpen:false,
                  selectedTestCase:"",
                  currentRunSelectedTestCasePagesInfo:[],

                  componentWaiting:{
                    "DbStatusInfoCmp":false,
                    "AllRunsInfoCmp":false,
                    "RunMachinesDataCmp":false,
                    "TestCasePagesInfoCmp":false,
                    "RunTestCasesInfoCmp":false,                    
                  },
                };
  }

  render() {  

    let dbStatusCmp = <DbStatusInfoCmp 
                        isDbOnline = {this.state.databaseStatus}
                        isWaiting = {this.state.componentWaiting["DbStatusInfoCmp"]}
                        callback = {this.childrenCallback}
                      />

    let  allRunsInfoCmp = <AllRunsInfoCmp
                            runsInfo = {this.state.allRunsInfo}
                            isWaiting = {this.state.componentWaiting["AllRunsInfoCmp"]}
                            callback = {this.childrenCallback}
                            menuValue = {this.state.selectedRun}
                          />    
    
    let  runTestCasesInfoCmp = <RunTestCasesInfoCmp
                            testCasesInfo = {this.state.currentRunTestCaseInfo}
                            isWaiting = {this.state.componentWaiting["RunTestCasesInfoCmp"]}
                            callback = {this.childrenCallback}
                          />    

    let runMachineData = <RunMachinesDataCmp
                        machineInfo = {this.state.currentRunMachineInfo}
                        isWaiting = {this.state.componentWaiting["RunMachinesDataCmp"]}
                        callback = {this.childrenCallback}
                        menuValue = {this.state.selectedMachine}
                        plotData = {this.state.currentRunPlotData}
                        /> 
    let testCasePageData = <TestCasePagesInfoCmp
                      isOpen = {this.state.testCasePagesOpen}
                      callback = {this.childrenCallback}
                      pagesInfo = {this.state.currentRunSelectedTestCasePagesInfo}
                      testCaseName = {this.state.selectedTestCase}
                      isWaiting = {this.state.componentWaiting["TestCasePagesInfoCmp"]}
                      /> 


   // let rawJson = <RawJsonCmp/>    
                        

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div>
        
        <div style={{margin:"20px 0px 10px 0px"}}>
          {dbStatusCmp}
        </div>
        <div style={{margin:"10px 00px 10px 0px"}}>
            {allRunsInfoCmp}
        </div>
        <div style={{margin:"10px 00px 10px 0px"}}>
          {runTestCasesInfoCmp}
        </div>
        <div style={{margin:"35px 00px 10px 0px"}}>
          {runMachineData}
        </div>        
        
        <div style={{margin:"20px 0px 10px 0px"}}>
          {testCasePageData}
        </div>     
      </div></MuiThemeProvider>
    )
    
  }

  childrenCallback = function(childrenCmp, message, data) {

    switch(message) {
      
      default:
      break;

      case "runMenuChange":
      this.setState({
        selectedRun:data,
        selectedRunId:this.state.allRunsInfo[data].runID,
        currentRunPlotData:{},
        currentRunTestCaseInfo:[],
        currentRunMachineInfo:[],
        selectedMachine:0,
      }); 
      break;
      case "machineMenuChange":
      this.setState({
        selectedMachine:data,
      }); 
      break;

      case "updateDbState":
        this.changeWaitingState(childrenCmp, true);
        this.testDbConnectionInfo()
        .then(response => this.changeWaitingState(childrenCmp, false))
        break;
      
      case "updateAllRunsInfo":
        this.changeWaitingState(childrenCmp, true);
        this.getAllTestRunsInfo()
        .then(response => this.changeWaitingState(childrenCmp, false))
        break;

      case "updateRunTestCasesInfo":
        this.changeWaitingState(childrenCmp, true);
        this.getRunTestCasesInfo()
        .then(response => this.changeWaitingState(childrenCmp, false))
        break;
        
      case "openTestCasePagesDialog":
        this.changeWaitingState("TestCasePagesInfoCmp", true);
        this.setState({testCasePagesOpen:true, selectedTestCase:data})
        this.setState({currentRunSelectedTestCasePagesInfo:[]})
        this.getTestCasePageResults(data)  
        .then(response => this.changeWaitingState("TestCasePagesInfoCmp", false))
        break;

      case "closeTestCasePagesDialog":
        this.closeTestCaseDialog()
        break;

      case "updateRunMachineInfo":
        this.changeWaitingState(childrenCmp, true);
        this.getRunMachineInfo()
        .then(response => this.changeWaitingState(childrenCmp, false))
        break;

        case "updateMachinePlotInfo":
        this.changeWaitingState(childrenCmp, true);
        this.getCurrentRunMachinePlotInfo()
        .then(response => this.changeWaitingState(childrenCmp, false))
        break;


        

    }
  }

  testDbConnectionInfo = function() { 
    return(    
      testDbConnection()
      .then(response => {
                          if(response.success === "true") { 
                            this.setState({
                              databaseStatus:((response.data === "True") ? true : false)
                            }) 
                          }
                        })
      .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }

  getAllTestRunsInfo = function() {
    return(
      getAllTestRuns()
      .then(response => {
                          if(response.success === "true") {
                            
                            let completedRuns=[]
                            for(let i=0;i<response.data.length;i++) {
                              if(response.data[i].outcome==="Completed") {
                                completedRuns.push(response.data[i])
                              }
                            }
                            this.setState({
                              allRunsInfo:completedRuns,
                              selectedRun:0,
                              selectedRunId:completedRuns[0].runID
                            }); 
                          }
                        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }

  getRunTestCasesInfo = function() {
    return(
      getTestCaseResults(this.state.selectedRunId)
      .then(response => {
                          if(response.success === "true") { 
                            this.setState({
                              currentRunTestCaseInfo:response.data
                            }); 
                          }
                        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }  
  
  getRunMachineInfo = function() {
    return(
      getMachinesInvolved(this.state.selectedRunId)
      .then(response => {
                          if(response.success === "true") {
                            response.data.push(response.data.shift());
                            this.setState({
                              currentRunMachineInfo:response.data
                            }); 
                          }
                        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }  

  getCurrentRunMachinePlotInfo = function() {
    let promise1 = getGraphData(this.state.selectedRunId, 
                                this.state.currentRunMachineInfo[this.state.selectedMachine], 
                                "Processor", 
                                "%25%20Processor%20Time");
    let promise2 = getGraphData(this.state.selectedRunId, 
                                this.state.currentRunMachineInfo[this.state.selectedMachine], 
                                "Memory", 
                                "Available MBytes");
    return(Promise.all([promise1, promise2])
          .then(responses => {
            if((responses[0].success === "true")&&(responses[1].success === "true")) { 
              responses[1].data[1] = responses[1].data[1].map(x => x / 1024)
              let tempPlotData = {
                x:responses[0].data[0],
                y1:responses[0].data[1],
                y2:responses[1].data[1],
                title:this.state.currentRunMachineInfo[this.state.selectedMachine],
                xtitle:"time (mins)",
                y1title:"% CPU",
                y2title:"Available Memory",
                y1DataName:"CPU",
                y2DataName:"Memory",
              }
              this.setState({currentRunPlotData:tempPlotData});
            }
        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }
  
  getTestCasePageResults = function(testCaseName) {
    return(
      getPageResultsByTestCase(this.state.selectedRunId, testCaseName)
      .then(response => {
                          if(response.success === "true") { 
                            this.setState({
                              currentRunSelectedTestCasePagesInfo:response.data
                            }); 
                          }
                        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }   

  closeTestCaseDialog = function(testCaseName) {
    this.setState({testCasePagesOpen:false})
  }


///////////////////////////////////////////////////////////
//Internal function to update state object for waiting state

  changeWaitingState = function(component, newState) {
    this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, component, newState)})
  }
  updateObject = function(obj, key, value) {
    obj[key] = value;
    return obj;
  }
 

}

export default LoadTestInfoApp;
