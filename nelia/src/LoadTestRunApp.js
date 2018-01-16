import './styles/LoadTestRunApp.css';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from './styles/myTheme';
import {
   testControllerConnection,
} from './ServerApi'
import ControllerStatusInfoCmp from "./my_modules/ControllerStatusInfoCmp"
import * as utils from "./utils"


class LoadTestRunApp extends Component {

   constructor(props) {
      super(props); 

      this.childrenCallback = this.childrenCallback.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);

      this.state = {
         controllerAgentStatus: {"RunningCount":0,
                                 "ReadyCount":0,
                                 "OfflineCount":0,
                                 "DisconnectedCount":0},
         isControllerOnline : false,                                 
         
         componentWaiting: {
            "ControllerStatusInfoCmp": false,
         },
      };
   }

   render() {

      let controllerStatusCmp = <ControllerStatusInfoCmp
         isControllerOnline={this.state.isControllerOnline}
         isWaiting={this.state.componentWaiting["ControllerStatusInfoCmp"]}
         callback={this.childrenCallback}
      />

      return (
         <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div>
            <div style={{ margin: "20px 0px 10px 0px" }}>
               {controllerStatusCmp}
            </div>
         </div></MuiThemeProvider>
      )
   }

   childrenCallback = function (command, data) {

      switch (command) {

         case "updateControllerState":
            this.changeWaitingState("ControllerStatusInfoCmp", true);
            this.setState({ 
               isDbOnline: false,
            })
            return(
               this.testControllerConnectionInfo()
                  .then(response => {
                     this.changeWaitingState("ControllerStatusInfoCmp", false)
                     return response;
                  })
            );

         default:
            break;            
      }
   }

   testControllerConnectionInfo = function () {
      return (
         testControllerConnection()
            .then(response => {
               if (response.success === "true") {
                  this.setState({
                     isControllerOnline: ((response.data === "True") ? true : false)
                  })
               }
            })
            .catch(error => alert("Error: " + error.message + "\n" + error.stack))
      )
   }

   changeWaitingState = function (component, newState) {
      this.setState({ componentWaiting: utils.updateObject(this.state.componentWaiting, component, newState) })
   }

   clearState = function() {
      this.setState({

      });
   }

   componentDidMount() {
      this.childrenCallback("updateControllerState")
         .catch(error => alert("Error: " + error.message + "\n" + error.stack))
   }
}

export default LoadTestRunApp;


