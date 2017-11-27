//import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import React, { Component } from 'react';
import {testDbConnection,getAllTestRuns} from '../serverapi/loaddbapi'
import AllRunsInfo from '../my_modules/AllRunsInfo'
import DbStatusInfo from "../my_modules/DbStatusInfo"


import './LoadTestInfo.css';

class LoadTestInfo extends Component {

  constructor(props) {
    super(props); 

    this.getAllTestRunsInfo = this.getAllTestRunsInfo.bind(this); 
    this.testDbConnectionInfo = this.testDbConnectionInfo.bind(this); 

    this.state = {
                  databaseStatus:false,
                  runInfo:{}, 
                  dbStatusWaiting:false,
                  allRunsWaiting:false
                
                }; 

  }

  render() {    

    return(
      <div>
        <DbStatusInfo 
            isDbOnline = {this.state.databaseStatus}
            isWaiting = {this.state.dbStatusWaiting}
            />
        <AllRunsInfo/>
      </div>
    )
  }



  componentDidMount() {
    this.setState({dbStatusWaiting:true});
    this.testDbConnectionInfo();
  }
    


  testDbConnectionInfo = function() {
    testDbConnection().then(response => { 
                            if(response.success === "true") { 
                              this.setState({
                                databaseStatus:((response.data === "True")?true:false),
                                dbStatusWaiting:false
                              }) 
                            } 
    })
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }  

  getAllTestRunsInfo = function() {
    getAllTestRuns().then(responseJson =>  this.setState({runInfo : responseJson, allRunsWaiting:false}))
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }


}

export default LoadTestInfo;

