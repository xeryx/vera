import './styles/LoadTestInfoApp.css';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import {
  testDbConnection,
  getAllTestRuns,
  getGraphData,
  getPageResults
} from '../ServerApi'
import AllRunsInfoCmp from '../my_modules/AllRunsInfoCmp'
import DbStatusInfoCmp from "../my_modules/DbStatusInfoCmp"
import DataPlotCmp from "../my_modules/DataPlotCmp"
import RunPagesInfoCmp from "../my_modules/RunPagesInfoCmp"



class LoadTestInfoApp extends Component {

  constructor(props) {
    super(props); 

    this.changeWaitingState = this.changeWaitingState.bind(this); 
    this.childrenCallback = this.childrenCallback.bind(this); 
    
    this.state = {
                  databaseStatus:false,
                  allRunsInfo:[], 

                  selectedRunId:"",
                  selectedRun:0,
                  selectedGraph:0,

                  currentRunPageInfo:[],

                  currentRunPlotData:{},
                  currentMachine:"LOADMASTERCB.PERFTESTMV.LOCAL", 
                  currentCounterCategory:"Processor",
                  currentCounter:"%25%20Processor%20Time",

                  componentWaiting:{
                    "DbStatusInfoCmp":false,
                    "AllRunsInfoCmp":false,
                    "DataPlotCmp":false,
                    "RunPagesInfoCmp":false
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
    
    let  runPagesInfoCmp = <RunPagesInfoCmp
                            pagesInfo = {this.state.currentRunPageInfo}
                            isWaiting = {this.state.componentWaiting["RunPagesInfoCmp"]}
                            callback = {this.childrenCallback}
                          />    

    let runGraph = <DataPlotCmp
                        plotData = {this.state.currentRunPlotData}
                        isWaiting = {this.state.componentWaiting["DataPlotCmp"]}
                        callback = {this.childrenCallback}
                        menuValue = {this.state.selectedGraph}
                        /> 

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div>
        <div style={{margin:"20px 0px 10px 0px"}}>
          {dbStatusCmp}
        </div>
        <div style={{margin:"10px 00px 10px 0px"}}>
            {allRunsInfoCmp}
        </div>
        <div style={{margin:"10px 00px 10px 0px"}}>
          {runPagesInfoCmp}
        </div>
        <div style={{margin:"35px 00px 10px 0px"}}>
          {runGraph}
        </div>        
      </div></MuiThemeProvider>
    )
    
  }

  childrenCallback = function(childrenCmp, message, data) {

    switch(message) {
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

      case "runMenuChange":
        this.setState({
          selectedRun:data,
          selectedRunId:this.state.allRunsInfo[data].runID,
          currentRunPlotData:{},
          currentRunPageInfo:[],

        }); 
        break;

        case "updateRunPagesInfo":
        this.changeWaitingState(childrenCmp, true);
        this.getRunPagesInfo()
        .then(response => this.changeWaitingState(childrenCmp, false))
        break;

      case "updateRunPlotInfo":
        this.changeWaitingState(childrenCmp, true);
        this.getCurrentRunPlotInfo()
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

  getRunPagesInfo = function() {
    return(
      getPageResults(this.state.selectedRunId)
      .then(response => {
                          if(response.success === "true") { 
                            this.setState({
                              currentRunPageInfo:response.data
                            }); 
                          }
                        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
  }  
  getCurrentRunPlotInfo = function() {
    return(
      getGraphData(this.state.selectedRunId, this.state.currentMachine, this.state.currentCounterCategory, this.state.currentCounter)
      .then(response => {
                          if(response.success === "true") { 
                            let tempPlotData = {
                              x:response.data[0],
                              y:response.data[1],
                              title:"Processor (% Processor Time)",
                              xtitle:"time (mins)",
                              ytitle:"% CPU",
                            }
                            this.setState({currentRunPlotData:tempPlotData}); 
                          }
                        })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
    )
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
