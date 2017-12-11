import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

const compName = "RunTestCasesInfoCmp";


class RunTestCasesInfoCmp extends Component {
    
    render() {  

        let waitingCircle = "" ;
        let testCasesInfoElem = "";
        
        let testCasesInfoRows = [];
        let testCasesInfoHeaders = [];
        

        if(this.props.testCasesInfo.length > 0) {

            testCasesInfoHeaders = [
                <td key={0} className="header-1">Test Case Name</td>,
                <td key={1} className="header-1">Total Tests</td> 
            ];

            for (let i = 0; i < this.props.testCasesInfo.length; i++ ) {
                testCasesInfoRows.push(<tr key={i}>
                        <td className="row-data-1">{this.props.testCasesInfo[i].TestCaseName}</td>
                        <td key={3} className="row-data-2">{this.props.testCasesInfo[i].TestsRun}</td>
                    </tr>)
            }

            testCasesInfoElem = <div style={{"margin":"10px 0px 0px 0px"}}>
                                    <table><tbody>
                                        <tr>
                                        {testCasesInfoHeaders}
                                        </tr>
                                        {testCasesInfoRows}
                                    </tbody></table>  
                                </div>
        } else {
            testCasesInfoElem = <div className="row-data-2" style={{"margin":"10px 0px 0px 0px"}}>
                                    (No Data)
                                </div>
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
                    {testCasesInfoElem}
                </div>
            </div>

        )
    }

    handleChangeButton = (event, index, value) => this.props.callback(compName,"updateRunTestCasesInfo",{});

}       




export default RunTestCasesInfoCmp;
