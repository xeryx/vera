import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';


class RunTestCasesInfoCmp extends Component {
    

    render() {  

        let testCasesInfoElem = "";
        let testCasesInfoRows = [];
        let testCasesInfoHeaders = [];

        let componentContent = "";
        let loadInfoButton = "";


        if(this.props.runId !== "") {
            loadInfoButton = 
                <RaisedButton 
                    label= "Test cases performance info" 
                    primary={true} 
                    style={{"margin":"0px 0px 15px 0px"}}
                    onClick={this.handleUpdateTestCasesInfo} 
                    disabled={this.props.isWaiting}
                />
        }

        if(this.props.isWaiting) {
            componentContent = 
            <div> 
                <div>{loadInfoButton}</div>
                <span style={{fontSize:"16px",padding:"0px 20px 0px 0px"}}>Loading test cases performance info...</span>
                <span><CircularProgress size={25}/></span> 
            </div>
             
        } else {

            if(this.props.testCasesInfo.length > 0) {

                testCasesInfoHeaders = [
                    <td key={0} className="header-1">Test Case Name</td>,
                    <td key={1} className="header-1">Total Tests</td>,
                ];

                for (let i = 0; i < this.props.testCasesInfo.length; i++ ) {
                    testCasesInfoRows.push(<tr key={i}>
                            <td className="row-data-1" onClick={(e) => this.handleTestCaseClick(e, this.props.testCasesInfo[i].TestCaseName)}>{this.props.testCasesInfo[i].TestCaseName}</td>
                            <td className="row-data-2" >{this.props.testCasesInfo[i].TestsRun}</td>
                        </tr>)
                }

                testCasesInfoElem = 
                    <div>
                        <div>Test cases executed:</div>
                        <div style={{"margin":"10px 0px 0px 0px"}}>
                            <table><tbody>
                                <tr>
                                {testCasesInfoHeaders}
                                </tr>
                                {testCasesInfoRows}
                            </tbody></table>  
                        </div>
                    </div>

                componentContent = 
                <div> 
                    {loadInfoButton}
                    <div style={{"margin":"10px 0px 0px 0px"}}>
                        {testCasesInfoElem}
                    </div>
                </div>            
            } else {
                componentContent = loadInfoButton
            }

        }
        
        return(componentContent)


    }

    handleUpdateTestCasesInfo = (event, index, value) => this.props.callback("updateRunTestCasesInfo",{});
    handleTestCaseClick = function(event, data) {
        this.props.callback("openTestCasePagesDialog",data);
    }

    

}       




export default RunTestCasesInfoCmp;
