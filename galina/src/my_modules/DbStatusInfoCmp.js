import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';



class DbStatusInfoCmp extends Component {
    
    render() {  

        var color = "red";
        var content = "offline"

        if(this.props.isDbOnline) {
            color = "green";
            content = "online" 
        }

        if(this.props.isWaiting) {
            content = <CircularProgress size={20}/>                      
        }

        return(

            <div><MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>

            <div>
                <span>DB connection status:</span> <span style={{"color":color, "padding":"10px"}}>{content}</span> 
            </div>

            </MuiThemeProvider></div>

        )
    }

}          


export default DbStatusInfoCmp;
