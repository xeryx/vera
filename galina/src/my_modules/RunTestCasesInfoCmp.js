import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

const compName = "RunTestCasesInfoCmp";


class RunTestCasesInfoCmp extends Component {
    
    constructor(props) {
        super(props); 

        this.handleTestCaseClick = this.handleTestCaseClick.bind(this); 
    }

    render() {  

        let waitingCircle = "" ;
        let testCasesInfoElem = "";
        
        let testCasesInfoRows = [];
        let testCasesInfoHeaders = [];
        

        if(this.props.testCasesInfo.length > 0) {

            testCasesInfoHeaders = [
                <td key={0} className="header-1">Test Case Name</td>,
                <td key={1} className="header-1">Total Tests</td>,
                <td key={2} className="header-1">Average</td> 
            ];

            for (let i = 0; i < this.props.testCasesInfo.length; i++ ) {
                testCasesInfoRows.push(<tr key={i}>
                        <td className="row-data-1" onClick={(e) => this.handleTestCaseClick(e, this.props.testCasesInfo[i].TestCaseName)}>{this.props.testCasesInfo[i].TestCaseName}</td>
                        <td className="row-data-2" >{this.props.testCasesInfo[i].TestsRun}</td>
                        <td className="row-data-2">{parseFloat(this.props.testCasesInfo[i].Average).toFixed(1)}</td>
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
    handleTestCaseClick = function(event, data) {
        this.props.callback(compName,"openTestCasePagesDialog",data);
    }

    

}       




export default RunTestCasesInfoCmp;
