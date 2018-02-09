import React, { Component } from 'react';
import * as utils from '../utils.js';
import CircularProgress from 'material-ui/CircularProgress';


class RunTestCasesExtendedInfoCmp extends Component {
    
   constructor(props) {
      super(props); 
      this.state = {
                     sortColumn:0,
                     sortDescending:true,
                     sortNumeric:false
                  };
      this.compareRows = this.compareRows.bind(this); 
   }

    render() {  

        let testCasesInfoElem = "";
        let testCasesInfoRows = [];
        let testCasesInfoRowsContent = [];
        let testCasesInfoHeaders = [];

        let componentContent = "";

        if(this.props.isWaiting) {
            componentContent = 
            <div> 
                <span className="section-waiting">Loading test cases performance info...</span>
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
                           average: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].Average,
                           percentile95: pagesInfoByTestCase[uniqueTestCases[i]][mostSignificantCallIndex].Percentile95,
                        }

                  for(let k = 0; k < this.props.testCasesOverallInfo.length; k++) {
                     if(this.props.testCasesOverallInfo[k].TestCaseName === uniqueTestCases[i] ) {
                        pagesInfoByTestCase[uniqueTestCases[i]]["totalTests"] = this.props.testCasesOverallInfo[k].TestsRun;
                     }
                  }                  
                              
               }

               for (let i = 0; i < uniqueTestCases.length; i++ ) {
                  testCasesInfoRowsContent.push([
                                    uniqueTestCases[i],
                                    parseInt(pagesInfoByTestCase[uniqueTestCases[i]]["totalTests"], 10),
                                    pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].url,
                                    parseInt(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].count, 10),
                                    parseFloat(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].average).toFixed(3),
                                    parseFloat(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].percentile95).toFixed(3)
                                 ])
               }  
               
               testCasesInfoRowsContent.sort(this.compareRows);
  
               testCasesInfoHeaders = [
                    <td key={0} className="header-2" onClick={(e) => this.handleHeaderClick(e, 0, false)}>Test Case Name</td>,
                    <td key={1} className="header-2" onClick={(e) => this.handleHeaderClick(e, 1, true)}>Total Tests</td>,
                    <td key={2} className="header-2" onClick={(e) => this.handleHeaderClick(e, 2, false)}>Main request</td>,
                    <td key={3} className="header-2" onClick={(e) => this.handleHeaderClick(e, 3, true)}>Count</td>,
                    <td key={4} className="header-2" onClick={(e) => this.handleHeaderClick(e, 4, true)}>Average (s)</td>,
                    <td key={5} className="header-2" onClick={(e) => this.handleHeaderClick(e, 5, true)}>95th percentile (s)</td>,
                ];

               for (let i = 0; i < testCasesInfoRowsContent.length; i++ ) {
                  testCasesInfoRows.push(<tr key={i}>
                        <td className="row-data-1" 
                              onClick={(e) => this.handleTestCaseClick(e, testCasesInfoRowsContent[i][0])}>
                              {testCasesInfoRowsContent[i][0]}
                        </td>
                        <td className="row-data-2">{testCasesInfoRowsContent[i][1]}</td>
                        <td className="row-data-1"
                           onClick={(e) => { this.handleRequestUriClick(e,                            
                              [testCasesInfoRowsContent[i][0], testCasesInfoRowsContent[i][2]])}
                           }> 
                           {testCasesInfoRowsContent[i][2]}</td>
                        <td className="row-data-2">{testCasesInfoRowsContent[i][3]}</td>
                        <td className="row-data-2">{
                              testCasesInfoRowsContent[i][4]}
                        </td>
                        <td className="row-data-2">{
                              testCasesInfoRowsContent[i][5]}
                        </td>
                     </tr>)
               }


                testCasesInfoElem = 
                    <div>
                        <div className="section-title">Test cases executed:</div>
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

//    handleUpdateTestCasesInfo = (event, index, value) => this.props.callback("updateRunTestCasesExtendedInfo",{});
   handleTestCaseClick = function(event, data) {
        this.props.callback("openTestCasePagesDialog",data);
   }

   handleRequestUriClick = function(event, data) {
      this.props.callback("openTestCaseRequestPlotDialog",data);
   }

   handleHeaderClick = function(event, column, isNumeric) {
      this.setState({
         sortColumn:column,
         sortDescending:(this.state.sortColumn===column)?!this.state.sortDescending:true,
         sortNumeric:isNumeric
      });  
   }

   compareRows = function(a, b) {
      let column = this.state.sortColumn;
      if (a[column] === b[column]) {
         return 0;
      }
      else {
         if(this.state.sortNumeric) {
            return (this.state.sortDescending ? (((a[column] - b[column]) < 0) ? -1 : 1) : (((b[column] - a[column]) < 0) ? -1 : 1));
         } else {
            return (this.state.sortDescending ? ((a[column] < b[column]) ? -1 : 1) : ((b[column] < a[column]) ? -1 : 1));
         }
      }
   }

}




export default RunTestCasesExtendedInfoCmp;
