//import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import React, { Component } from 'react';
import {getRunInfo} from '../ServerApi'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import JSONTree from 'react-json-tree';

class RawJsonCmp extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      displayJson:{},
      command:"",
      runId:"",
      }
  }

   render() {    


    var contents = <JSONTree data={this.state.displayJson}/>;


    return (<div>
          <Paper style={style} zDepth={2}>
          <div>
          <TextField
            id="commandTxt"
            value={this.state.command}
            onChange={this.handleTextChange}
          />
        </div>
        <TextField
            id="idTxt"
            value={this.state.runId}
            onChange={this.handleTextChange}
          />
          <div>
          <RaisedButton 
                        label="Get Json" 
                        primary={true} 
                        onClick={this.handleClick} 
                    />
        </div>
          {contents}
          </Paper>
      </div>);
  }



  handleClick = (event, index, value) => {
    getRunInfo(this.state.command, this.state.runId).then(responseJson =>  this.setState({displayJson : responseJson}))
    .catch(error => alert("Error: " + error.message + "\n" + error.stack))
  }
  
  handleTextChange = (event) => {
    if(event.target.id === "commandTxt") {
      this.setState({
        command: event.target.value,
      });
    } 
    if(event.target.id === "idTxt") {
      this.setState({
        runId: event.target.value,
      });
    } 

  };

}

const style = {
  width: 500,
  height: 200,
  margin: "0,20,0,20",
  padding: "10,10,10,10",
  textAlign: 'left',
  display: 'inline-block',
};


export default RawJsonCmp;

