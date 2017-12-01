//import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import React, { Component } from 'react';
import {
  testDbConnection,
  getAllTestRuns,
  getSystemUnderTestResources,
  getPageResults,
  getOverallResults,
} from '../serverapi/loaddbapi'
import AllRunsInfoCmp from '../my_modules/AllRunsInfoCmp'
import DbStatusInfoCmp from "../my_modules/DbStatusInfoCmp"
import RunPageInfoCmp from "../my_modules/RunPageInfoCmp"


import './LoadTestInfoApp.css';

class LoadTestInfoApp extends Component {

  constructor(props) {
    super(props); 

    this.getAllTestRunsInfo = this.getAllTestRunsInfo.bind(this); 
    this.getRunPagesInfo = this.getRunPagesInfo.bind(this); 
    this.testDbConnectionInfo = this.testDbConnectionInfo.bind(this); 
    this.setselectedRun = this.setselectedRun.bind(this);
    this.updateObject = this.updateObject.bind(this);

    this.state = {
                  databaseStatus:false,
                  allRunsInfo:[], 
                  runPagesInfo:[],
                  selectedRunId:"N/A",
                  selectedRun:0,
                  selectedTest:0,
                  componentWaiting:{
                    "DbStatusInfoCmp":false,
                    "AllRunsInfoCmp":false,
                    "RunPageInfoCmp":false
                  }
                }; 
  }

  render() {    

    return(
      <div>
        <div style={{"margin":"20px 0px 10px 0px"}}>
        <DbStatusInfoCmp 
            isDbOnline = {this.state.databaseStatus}
            isWaiting = {this.state.componentWaiting["DbStatusInfoCmp"]}
            testDbFunction = {this.testDbConnectionInfo}
            />
        </div>
        <div style={{"margin":"10px 00px 10px 0px"}}>
        <AllRunsInfoCmp
            runsInfo = {this.state.allRunsInfo}
            isWaiting = {this.state.componentWaiting["AllRunsInfoCmp"]}
            infoFunction = {this.getAllTestRunsInfo}
            changeDropdownValue = {this.setselectedRun}
            menuValue = {this.state.selectedRun}
        />
        </div>
        <div style={{"margin":"10px 00px 10px 0px"}}>
        <RunPageInfoCmp
            pagesInfo = {this.state.runPagesInfo}
            isWaiting = {this.state.componentWaiting["RunPageInfoCmp"]}
            infoFunction = {this.getRunPagesInfo}
        />
        </div>
      </div>
    )
  }


  testDbConnectionInfo = function() {
    this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, "DbStatusInfoCmp", true)})
    testDbConnection().then(response => {
                            if(response.success === "true") { 
                              this.setState({databaseStatus:((response.data === "True") ? true : false)}) 
                            }
                            this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, "DbStatusInfoCmp", false)})
    })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }  


  getAllTestRunsInfo = function() {
    this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, "AllRunsInfoCmp", true)})
    getAllTestRuns().then(response => {
                            if(response.success === "true") { 
                              this.setState({
                                allRunsInfo:response.data,
                                selectedRunId:response.data[this.state.selectedRun].runID
                              }); 
                            }
                            this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, "AllRunsInfoCmp", false)})
    })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }  

  
  getRunPagesInfo = function() {
    this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, "RunPageInfoCmp", true)})
    getPageResults(this.state.selectedRunId).then(response => {
                            if(response.success === "true") { 
                              this.setState({runPagesInfo:response.data}); 
                            }
                            this.setState({componentWaiting:this.updateObject(this.state.componentWaiting, "RunPageInfoCmp", false)})
    })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }  





  setselectedRun = function(runIndex, runId) {
    this.setState({selectedRun:runIndex, selectedRunId:runId})

  }


  componentDidMount() {
    this.testDbConnectionInfo();

  }



//Internal function to update state object for waiting state
  updateObject = function(obj, key, value) {
    obj[key] = value;
    return obj;
  }




}

export default LoadTestInfoApp;

