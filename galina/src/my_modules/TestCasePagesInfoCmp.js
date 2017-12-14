import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';


class TestCasePagesInfoCmp extends Component {

   render() {

      let pagesInfoElem = "";

      let pagesInfoRows = [];
      let pagesInfoHeaders = [];

      let componentContent = "";


      if (this.props.isWaiting) {
         pagesInfoElem = <span><CircularProgress size={25} /></span>
      }
      else {
         if (this.props.pagesInfo.length > 0) {

            pagesInfoHeaders = [
               <td key={0} className="header-1">URL</td>,
               <td key={1} className="header-1">Count</td>,
               <td key={2} className="header-1">Average</td>
            ];

            for (let i = 0; i < this.props.pagesInfo.length; i++) {
               pagesInfoRows.push(<tr key={i}>
                  <td className="row-data-1">{this.props.pagesInfo[i].RequestUri}</td>
                  <td className="row-data-2">{this.props.pagesInfo[i].PageCount}</td>
                  <td className="row-data-2">{parseFloat(this.props.pagesInfo[i].Average).toFixed(2)}</td>
               </tr>)
            }

            pagesInfoElem = <div style={{ "margin": "10px 0px 0px 0px" }}>
               <table><tbody>
                  <tr>
                     {pagesInfoHeaders}
                  </tr>
                  {pagesInfoRows}
               </tbody></table>
            </div>
         } else {

            pagesInfoElem = <div className="row-data-2" style={{ "margin": "10px 0px 0px 0px" }}>
               (No Data)
                                </div>
         }


      }

      componentContent =
         <Dialog
            title={this.props.testCaseName}
            modal={false}
            open={this.props.isOpen}
            onRequestClose={this.handleClose}
            children={<div style={{ "margin": "10px 0px 0px 0px" }}>{pagesInfoElem}</div>}
         />


      return (componentContent)
   }


   handleClose = (event, index, value) => {
      if(!this.props.isWaiting) {
         this.props.callback("closeTestCasePagesDialog", value); 
      }
   } 

}




export default TestCasePagesInfoCmp;
