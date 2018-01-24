import React, { Component } from 'react';
import * as utils from '../utils.js';
import CircularProgress from 'material-ui/CircularProgress';


class RunTestCasesExtendedInfoComparisonCmp extends Component {
    

    render() {  

        let testCasesInfoElem = "";
        let testCasesInfoRows = [];
        let testCasesInfoHeaders = [];

        let componentContent = "";

        if(this.props.isWaiting) {
            componentContent = 
            <div> 
                <span className="section-waiting">Loading test cases performance info...</span>
                <span><CircularProgress size={25}/></span> 
            </div>
             
        } else {
            if((this.props.testCasesPagesInfo.length > 0) && (this.props.testCasesPagesInfo_2.length > 0)) {

               // Get info for run 1

               let uniqueTestCases = utils.getUniqueKeyValuesInObjectArray(this.props.testCasesPagesInfo, "TestCaseName").sort();             
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
                           average: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].Average,
                           percentile95: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].Percentile95,
                        }

                  for(let k = 0; k < this.props.testCasesOverallInfo.length; k++) {
                     if(this.props.testCasesOverallInfo[k].TestCaseName === uniqueTestCases[i] ) {
                        pagesInfoByTestCase[uniqueTestCases[i]]["totalTests"] = this.props.testCasesOverallInfo[k].TestsRun;
                     }
                  }                  
                              
               }

               // Get info for run 2

               let uniqueTestCases_2 = utils.getUniqueKeyValuesInObjectArray(this.props.testCasesPagesInfo_2, "TestCaseName").sort();             
               let pagesInfoByTestCase_2 = utils.getObjectofArraysByUniqueKeyValues(this.props.testCasesPagesInfo_2, "TestCaseName",uniqueTestCases_2);

               for(let i = 0; i< uniqueTestCases_2.length; i++) {
                  let mostSignificantCallIndex = 0;
                  let mostSignificantCallWeight = 0;
                  for(let j = 0; j < pagesInfoByTestCase_2[uniqueTestCases_2[i]].length; j++) {
                     let tempWeight = 
                     pagesInfoByTestCase_2[uniqueTestCases_2[i]][j].PageCount * pagesInfoByTestCase_2[uniqueTestCases_2[i]][j].Average;
                     if (tempWeight > mostSignificantCallWeight) {
                           mostSignificantCallWeight = tempWeight
                           mostSignificantCallIndex = j;
                        }
                  }

                  pagesInfoByTestCase_2[uniqueTestCases_2[i]]["mostSignificantCall"] = 
                        {
                           url: pagesInfoByTestCase_2[uniqueTestCases_2[i]][mostSignificantCallIndex].RequestUri,
                           count: pagesInfoByTestCase_2[uniqueTestCases_2[i]][mostSignificantCallIndex].PageCount,
                           average: pagesInfoByTestCase_2[uniqueTestCases_2[i]][mostSignificantCallIndex].Average,
                           percentile95: pagesInfoByTestCase_2[uniqueTestCases_2[i]][mostSignificantCallIndex].Percentile95,
                        }

                  for(let k = 0; k < this.props.testCasesOverallInfo_2.length; k++) {
                     if(this.props.testCasesOverallInfo_2[k].TestCaseName === uniqueTestCases_2[i] ) {
                        pagesInfoByTestCase_2[uniqueTestCases_2[i]]["totalTests"] = this.props.testCasesOverallInfo_2[k].TestsRun;
                     }
                  }                  
                              
               }

               testCasesInfoHeaders = [
                  <td key={0} className="header-1">Test Case Name</td>,
                  <td key={1} className="header-1">Main request</td>,
                  <td key={2} className="header-1">Avg 1 (s)</td>,
                  <td key={3} className="header-1">Avg 2 (s)</td>,
                  <td key={4} className="header-1">Delta</td>,
                  <td key={5} className="header-1">95th %ile 1</td>,
                  <td key={6} className="header-1">95th %ile 2</td>,
                  <td key={7} className="header-1">Count 1</td>,
                  <td key={8} className="header-1">Count 2</td>,                
               ];

               for (let i = 0; i < uniqueTestCases.length; i++ ) {

                  if(uniqueTestCases_2.indexOf(uniqueTestCases[i]) !== -1) {

                     let urlString = pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].url;
                     if(urlString === pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].url ) {

                        urlString = urlString.substr(urlString.lastIndexOf('/'))
                        let average_1 = pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].average;
                        let average_2 = pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].average;
                        let averageDelta = average_1-average_2;
                        let deltaClassName = (averageDelta > 0)?"row-data-delta-red":"row-data-delta-green";


                        testCasesInfoRows.push(<tr key={i}>
                                 <td className="row-data-1-nolink">
                                    {uniqueTestCases[i]}
                                 </td>
                                 <td className="row-data-1-nolink">{urlString}</td>
                                 <td className="row-data-2">{
                                    parseFloat(average_1).toFixed(3)}
                                 </td>
                                 <td className="row-data-2-cmp">{
                                    parseFloat(average_2).toFixed(3)}
                                 </td>    
                                 <td className={deltaClassName}>{
                                    parseFloat(averageDelta).toFixed(3)}
                                 </td> 
                                 <td className="row-data-2">{
                                    parseFloat(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].percentile95).toFixed(3)}
                                 </td>
                                 <td className="row-data-2-cmp">{
                                    parseFloat(pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].percentile95).toFixed(3)}
                                 </td>                              
                                 <td className="row-data-2">{pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].count}</td>
                                 <td className="row-data-2-cmp">{pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].count}</td>                              
                           </tr>)

                     }
                  }
               }

                testCasesInfoElem = 
                    <div>
                        <div className="section-title">Test cases comparison:</div>
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
                    <div style={{"margin":"10px 0px 0px 0px"}}>
                        {testCasesInfoElem}
                    </div>
                </div>            
            }

        }
        
        return(componentContent)
    }

    handleTestCaseClick = function(event, data) {
        this.props.callback("openTestCasePagesDialog",data);
    }

    

}       




export default RunTestCasesExtendedInfoComparisonCmp;
