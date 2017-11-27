import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';


class DbStatusInfo extends Component {
    
    constructor(props) {
        super(props); 
    }

    render() {  

        var color = "red";
        var content = "offline"

        if(this.props.isDbOnline) {
            color = "green";
            content = "online" 
        }

        if(this.props.isWaiting) {
            content = <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
                        <CircularProgress size={20}/>
                    </MuiThemeProvider>         
        }

        return(
            <div style={{"fontSize":"20px", "color":"white"}}>
                <span>Database status:</span> <span style={{"color":color, "padding":"10px"}}>{content}</span> 
            </div>

        )
    }

}          


export default DbStatusInfo;