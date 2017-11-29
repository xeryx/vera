import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class RunPageInfoCmp extends Component {
    
    render() {  

        var pageItems = [];
        var waitingCircle = "" ;
        

        if(this.props.pagesInfo.length === 0) {
            pageItems.push(<MenuItem value={0} primaryText={"None"} />)
        }
        else {
            for (let i = 0; i < this.props.pagesInfo.length; i++ ) {
                pageItems.push(<MenuItem value={i} primaryText={this.props.pagesInfo[i].RequestUri} />);
            }
        }

        if(this.props.isWaiting) {
            waitingCircle = <span><CircularProgress size={25}/></span> 
        } 
        
 
        return(

            <div><MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
                <RaisedButton 
                    label="Pages Info" 
                    primary={true} 
                    style={{"margin":"0px 0px 15px 0px"}}
                    onClick={this.props.infoFunction} 
                    disabled={this.props.isWaiting}/>
                <DropDownMenu 
                    value={this.props.menuValue} 
                    onChange={this.handleChange}
                    >
                {pageItems}
                </DropDownMenu>
                {waitingCircle}
                <div style={{"margin":"10px 0px 0px 0px"}}>
                {"Hello"}
                </div>
            </MuiThemeProvider></div>

        )
    }

    handleChange = (event, index, value) => this.props.changeDropdownValue(value);


    

  ParseObject(obj, key, value) {
    
            var returnArray = [];
    
            obj.forEach(function(elem) {
                if(elem[key] === value) {
                    returnArray.push(elem)
    
                }
            });
    
            return returnArray;  
  }

}  




export default RunPageInfoCmp;
