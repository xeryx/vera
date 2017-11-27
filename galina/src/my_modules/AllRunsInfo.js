import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';


class AllRunsInfo extends Component {
    
    constructor(props) {
        super(props); 
    }

    render() {  


        if(this.props.isWaiting) {
            var content = <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
                        <CircularProgress size={20}/>
                    </MuiThemeProvider>         
        }

        return(
            <div>
             {content}
            </div>

        )
    }

}          


export default AllRunsInfo;