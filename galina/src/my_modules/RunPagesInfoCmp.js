import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const compName = "RunPagesInfoCmp";


class RunPagesInfoCmp extends Component {
    
    render() {  

        let waitingCircle = "" ;

        let uniqueTests = this.getUniqueKeyValues(this.props.pagesInfo, "TestCaseName");
        let objectsPerTest = this.getObjectofArraysByUniqueKeyValues(this.props.pagesInfo, "TestCaseName",uniqueTests);

        let uniqueTestsRows = [];

        if(uniqueTests.length > 0) {

            for (let i = 0; i < uniqueTests.length; i++ ) {
                uniqueTestsRows.push(<tr><td className="tdg">{uniqueTests[i]}</td></tr>)
            }
        }

        if(this.props.isWaiting) {
            waitingCircle = <span><CircularProgress size={25}/></span> 
        }
        
        return(
            <div>
                <RaisedButton 
                    label= "Load test cases info" 
                    primary={true} 
                    style={{"margin":"0px 0px 15px 0px"}}
                    onClick={this.handleChangeButton} 
                    disabled={this.props.isWaiting}/>
                {waitingCircle}
                <div style={{"margin":"10px 0px 0px 0px"}}>
                    Test cases executed:
                    <div style={{"margin":"10px 0px 0px 0px"}}>
                        <table><tbody>
                        {uniqueTestsRows}
                        </tbody></table>  
                    </div>
                </div>
            </div>

        )
    }

    handleChangeButton = (event, index, value) => this.props.callback(compName,"updateRunPagesInfo",{});



//Internal functions to parse pages info object
    getUniqueKeyValues = function(obj, key) {
        let keyElems = [];
        obj.forEach(function(elem) {
            if(keyElems.indexOf(elem[key]) < 0)  {
                keyElems.push(elem[key]);
            }
        });
        return keyElems;
    }
    getObjectofArraysByUniqueKeyValues = function(obj, key, keyElems) {
        let returnObject = {};
        for(let i=0; i<keyElems.length;i++) {       
            returnObject[keyElems[i]] = [];
            obj.forEach(function(elem) {
                if(elem[key]=== keyElems[i])  {
                    returnObject[keyElems[i]].push(elem);        
                }
            });
        }   
        return returnObject;  
    }


}       




export default RunPagesInfoCmp;
