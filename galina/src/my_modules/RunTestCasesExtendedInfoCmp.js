import React, { Component } from 'react';
import * as utils from '../utils.js';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';


class RunTestCasesExtendedInfoCmp extends Component {
    

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

            if(this.props.testCasesPagesInfo.length > 0) {

               let uniqueTestCases = utils.getUniqueKeyValuesInObjectArray(this.props.testCasesPagesInfo, "TestCaseName");
               let pagesInfoByTestCase = utils.getObjectofArraysByUniqueKeyValues(this.props.testCasesPagesInfo, "TestCaseName",uniqueTestCases);

               for(let i = 0; i< uniqueTestCases.length; i++) {
                  let mostSignificantCallIndex = 0;
                  let mostSignificantCallWeight = 0;
                  for(let j = 0; j < pagesInfoByTestCase[uniqueTestCases[i]].length; j++) {
                     let tempWeight = 
                     pagesInfoByTestCase[uniqueTestCases[i]][j].PageCount * pagesInfoByTestCase[uniqueTestCases[i]][j].Average;
                     if (tempWeight > mostSignificantCallWeight) {
                           mostSignificantCallWeight = tempWeight
                           mostSignificantCallIndex = j;
                        }
                  }

                  pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"] = 
                                 {
                                    url: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].RequestUri,
                                    count: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].PageCount,
                                    average: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].Average
                                 }

                  for(let k = 0; k < this.props.testCasesOverallInfo.length; k++) {
                     if(this.props.testCasesOverallInfo[k].TestCaseName === uniqueTestCases[i] ) {
                        pagesInfoByTestCase[uniqueTestCases[i]]["totalTests"] = this.props.testCasesOverallInfo[k].TestsRun;
                     }
                  }                  
                              
               }



               testCasesInfoHeaders = [
                    <td key={0} className="header-1">Test Case Name</td>,
                    <td key={1} className="header-1">Total Tests</td>,
                    <td key={2} className="header-1">Main request</td>,
                    <td key={3} className="header-1">Count</td>,
                    <td key={4} className="header-1">Average</td>,
                ];

                for (let i = 0; i < uniqueTestCases.length; i++ ) {
                    testCasesInfoRows.push(<tr key={i}>
                            <td className="row-data-1" 
                                 onClick={(e) => this.handleTestCaseClick(e, uniqueTestCases[i])}>
                                 {uniqueTestCases[i]}
                           </td>
                            <td className="row-data-2">{pagesInfoByTestCase[uniqueTestCases[i]]["totalTests"]}</td>
                            <td className="row-data-1">{pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].url}</td>
                            <td className="row-data-2">{pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].count}</td>
                            <td className="row-data-2">{
                                 parseFloat(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].average).toFixed(2)}</td>
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

    handleUpdateTestCasesInfo = (event, index, value) => this.props.callback("updateRunTestCasesExtendedInfo",{});
    handleTestCaseClick = function(event, data) {
        this.props.callback("openTestCasePagesDialog",data);
    }

    

}       




export default RunTestCasesExtendedInfoCmp;
