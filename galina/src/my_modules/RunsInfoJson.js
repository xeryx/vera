//import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import React, { Component } from 'react';
import {getAllTestRuns, getSystemUnderTestResources,getPageResults,testDbConnection} from '../serverapi/loaddbapi.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import JSONTree from 'react-json-tree';

class RunsInfoJson extends Component {
  constructor(props) {
    super(props); 

    this.getAllTestRunsInfo = this.getAllTestRunsInfo.bind(this); 
    this.testDbConnectionInfo = this.testDbConnectionInfo.bind(this); 

    this.state = {databaseStatus:false,runInfo:{}, waiting:false}; 

  }

   render() {    


    var contents = <JSONTree data={this.state.runInfo}/>;
    if(this.state.waiting) {
      contents = <div style={{"textAlign":"center"}}><CircularProgress/></div>;
    }


    return (<div>
      <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div> 
      <Paper style={style} zDepth={2}>

      {contents}

      </Paper>
      
      </div></MuiThemeProvider>  
    </div>);
  }

  componentWillMount = function() {
    this.setState({waiting : true});
  }

  componentDidMount = function() {
    this.getAllTestRunsInfo();

  }


  getAllTestRunsInfo = function() {
    getAllTestRuns().then(responseJson =>  this.setState({runInfo : responseJson, waiting:false}))
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }

  testDbConnectionInfo = function() {
    testDbConnection().then(response =>  {return(response)})
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }

}

const style = {
  width: 500,
  height: 200,
  margin: "0,20,0,20",
  padding: "10,10,10,10",
  textAlign: 'left',
  display: 'inline-block',
};


export default RunsInfoJson;

