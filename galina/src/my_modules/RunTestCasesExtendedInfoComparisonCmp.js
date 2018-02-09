import React, { Component } from 'react';
import * as utils from '../utils.js';
import CircularProgress from 'material-ui/CircularProgress';


class RunTestCasesExtendedInfoComparisonCmp extends Component {
    
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
            if((this.props.testCasesPagesInfo.length > 0) && (this.props.testCasesPagesInfo_2.length > 0)) {

               // Get info for run 1

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
                  <td key={0} className="header-2" onClick={(e) => this.handleHeaderClick(e, 0, false)}>Test Case Name</td>,
                  <td key={1} className="header-2" onClick={(e) => this.handleHeaderClick(e, 1, false)}>Main request</td>,
                  <td key={2} className="header-2" onClick={(e) => this.handleHeaderClick(e, 2, true)}>Avg 1 (s)</td>,
                  <td key={3} className="header-2" onClick={(e) => this.handleHeaderClick(e, 3, true)}>Avg 2 (s)</td>,
                  <td key={4} className="header-2" onClick={(e) => this.handleHeaderClick(e, 4, true)}>Delta</td>,
                  <td key={5} className="header-2" onClick={(e) => this.handleHeaderClick(e, 5, true)}>95th %ile 1</td>,
                  <td key={6} className="header-2" onClick={(e) => this.handleHeaderClick(e, 6, true)}>95th %ile 2</td>,
                  <td key={7} className="header-2" onClick={(e) => this.handleHeaderClick(e, 7, true)}>Count 1</td>,
                  <td key={8} className="header-2" onClick={(e) => this.handleHeaderClick(e, 8, true)}>Count 2</td>,                
               ];

               for (let i = 0; i < uniqueTestCases.length; i++ ) {

                  if(uniqueTestCases_2.indexOf(uniqueTestCases[i]) !== -1) {

                     let urlString = pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].url;
                     if(urlString === pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].url ) {

                        urlString = urlString.substr(urlString.lastIndexOf('/'))
                        let average_1 = pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].average;
                        let average_2 = pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].average;
                        let averageDelta = average_1-average_2;

                        testCasesInfoRowsContent.push([
                           uniqueTestCases[i],
                           urlString,
                           parseFloat(average_1).toFixed(3),
                           parseFloat(average_2).toFixed(3),
                           parseFloat(averageDelta).toFixed(3),
                           parseFloat(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].percentile95).toFixed(3),
                           parseFloat(pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].percentile95).toFixed(3), 
                           parseInt(pagesInfoByTestCase[uniqueTestCases[i]]["mostSignificantCall"].count, 10), 
                           parseInt(pagesInfoByTestCase_2[uniqueTestCases[i]]["mostSignificantCall"].count, 10)
                        ]);
                     }
                  }
               }

               testCasesInfoRowsContent.sort(this.compareRows);

               for (let i = 0; i < testCasesInfoRowsContent.length; i++ ) {
                  
                  let deltaClassName = (testCasesInfoRowsContent[i][4] > 0)?"row-data-delta-red":"row-data-delta-green";

                  testCasesInfoRows.push(<tr key={i}>
                     <td className="row-data-1-nolink">
                        {testCasesInfoRowsContent[i][0]}
                     </td>
                     <td className="row-data-1-nolink">{testCasesInfoRowsContent[i][1]}</td>
                     <td className="row-data-2">{
                        testCasesInfoRowsContent[i][2]}
                     </td>
                     <td className="row-data-2-cmp">{
                        testCasesInfoRowsContent[i][3]}
                     </td>    
                     <td className={deltaClassName}>{
                        testCasesInfoRowsContent[i][4]}
                     </td> 
                     <td className="row-data-2">{
                        testCasesInfoRowsContent[i][5]}
                     </td>
                     <td className="row-data-2-cmp">{
                        testCasesInfoRowsContent[i][6]}
                     </td>                              
                     <td className="row-data-2">{testCasesInfoRowsContent[i][7]}</td>
                     <td className="row-data-2-cmp">{testCasesInfoRowsContent[i][8]}</td>                              
                  </tr>)

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


export default RunTestCasesExtendedInfoComparisonCmp;
