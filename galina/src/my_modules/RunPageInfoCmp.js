import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


class RunPageInfoCmp extends Component {
    

    constructor(props) {
        super(props); 

        this.state = {
            pageMenuValue:0,
            testsByPageMenuValue:0,

            testMenuValue:0,
            pagesByTestMenuValue:0,            
          }; 
    }        
    
    render() {  
// For Pages as driver
        var pageItems = [];
        var testsByPageItems = [];
// For Tests as driver
        var testItems = [];
        var pagesByTestItems = [];

        var uniquePages = [];
        var uniqueTests = [];

        var objectsPerTest = {};
        var objectsPerPage = {};
        
        var waitingCircle = "" ;
        var infoTextTestsByPage = "";
        var infoTextPagesByTest = "";
        

        if(this.props.pagesInfo.length === 0) {
            pageItems.push(<MenuItem value={0} primaryText={"None"} />)
            testItems.push(<MenuItem value={0} primaryText={"None"} />)
        }
        else {

            uniquePages = this.getUniqueKeyValues(this.props.pagesInfo,"RequestUri")
            uniqueTests = this.getUniqueKeyValues(this.props.pagesInfo, "TestCaseName");
            objectsPerTest = this.getObjectofArraysByUniqueKeyValues(this.props.pagesInfo, "TestCaseName",uniqueTests);
            objectsPerPage = this.getObjectofArraysByUniqueKeyValues(this.props.pagesInfo, "RequestUri",uniquePages);

            // For Pages as driver
            for (let i = 0; i < uniquePages.length; i++ ) {
                pageItems.push(<MenuItem value={i} primaryText={uniquePages[i]} />);
            }

            for (let i = 0; i < objectsPerPage[uniquePages[this.state.pageMenuValue]].length; i++ ) {
                testsByPageItems.push(<MenuItem value={i} primaryText={objectsPerPage[uniquePages[this.state.pageMenuValue]][i].TestCaseName} />);
            }


            infoTextTestsByPage =  <div> 
                <div>{"Request: " + objectsPerPage[uniquePages[this.state.pageMenuValue]][this.state.testsByPageMenuValue].RequestUri} </div>
                <div>{"Test name: " + objectsPerPage[uniquePages[this.state.pageMenuValue]][this.state.testsByPageMenuValue].TestCaseName} </div>
                <div>{"Page count: "  + objectsPerPage[uniquePages[this.state.pageMenuValue]][this.state.testsByPageMenuValue].PageCount} </div>
                <div>{"Average: " + objectsPerPage[uniquePages[this.state.pageMenuValue]][this.state.testsByPageMenuValue].Average} </div>
                <div>{"Maximum: " + objectsPerPage[uniquePages[this.state.pageMenuValue]][this.state.testsByPageMenuValue].Maximum} </div>
                <div>{"Minimum: "  + objectsPerPage[uniquePages[this.state.pageMenuValue]][this.state.testsByPageMenuValue].Minimum} </div>            
            </div>

            // For Tests as driver
            for (let i = 0; i < uniqueTests.length; i++ ) {
                testItems.push(<MenuItem value={i} primaryText={uniqueTests[i]} />);
            }

            for (let i = 0; i < objectsPerTest[uniqueTests[this.state.testMenuValue]].length; i++ ) {
                pagesByTestItems.push(<MenuItem value={i} primaryText={objectsPerTest[uniqueTests[this.state.testMenuValue]][i].RequestUri} />);
            }

            infoTextPagesByTest =  <div> 
                <div>{"Request: " + objectsPerTest[uniqueTests[this.state.testMenuValue]][this.state.pagesByTestMenuValue].RequestUri} </div>
                <div>{"Test name: " + objectsPerTest[uniqueTests[this.state.testMenuValue]][this.state.pagesByTestMenuValue].TestCaseName} </div>
                <div>{"Page count: "  + objectsPerTest[uniqueTests[this.state.testMenuValue]][this.state.pagesByTestMenuValue].PageCount} </div>
                <div>{"Average: " + objectsPerTest[uniqueTests[this.state.testMenuValue]][this.state.pagesByTestMenuValue].Average} </div>
                <div>{"Maximum: " + objectsPerTest[uniqueTests[this.state.testMenuValue]][this.state.pagesByTestMenuValue].Maximum} </div>
                <div>{"Minimum: "  + objectsPerTest[uniqueTests[this.state.testMenuValue]][this.state.pagesByTestMenuValue].Minimum} </div>            
            </div>


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
                {waitingCircle}

                {/*For info by page*/}
                <Paper zDepth={2}>
                <div style={{"margin":"15px 0px 15px 0px"}}>Info by request type:</div>
                <div><DropDownMenu 
                    value={this.state.pageMenuValue} 
                    onChange={this.pageMenuHandleChange}
                    >
                {pageItems}
                </DropDownMenu></div>
                <div><DropDownMenu 
                    value={this.state.testsByPageMenuValue} 
                    onChange={this.testsbByPageMenuHandleChange}
                    >
                {testsByPageItems}
                </DropDownMenu></div>
                <div style={{"margin":"10px 0px 0px 0px"}}>
                {infoTextTestsByPage}
                </div>
                </Paper>
                
                {/*For info by test*/}
                <Paper zDepth={2}>
                <div style={{"margin":"15px 0px 15px 0px"}}>Info by test case:</div>
                <div><DropDownMenu 
                    value={this.state.testMenuValue} 
                    onChange={this.testMenuHandleChange}
                    >
                {testItems}
                </DropDownMenu></div>
                <div><DropDownMenu 
                    value={this.state.pagesByTestMenuValue} 
                    onChange={this.pagesByTestMenuHandleChange}
                    >
                {pagesByTestItems}
                </DropDownMenu></div>
                <div style={{"margin":"10px 0px 0px 0px"}}>
                {infoTextPagesByTest}
                </div>
                </Paper>

            </MuiThemeProvider></div>

        )
    }

    pageMenuHandleChange = (event, index, value) =>  this.setState({pageMenuValue:value});
    testsbByPageMenuHandleChange = (event, index, value) => this.setState({testsByPageMenuValue:value});
    
    testMenuHandleChange = (event, index, value) =>  this.setState({testMenuValue:value});
    pagesByTestMenuHandleChange = (event, index, value) => this.setState({pagesByTestMenuValue:value});


    getUniqueKeyValues = function(obj, key) {
        var keyElems = [];
        obj.forEach(function(elem) {
            if(keyElems.indexOf(elem[key]) < 0)  {
                keyElems.push(elem[key]);

            }
        });

        return keyElems;
    }

    getObjectofArraysByUniqueKeyValues = function(obj, key, keyElems) {

        var returnObject = {};

        for(var i=0; i<keyElems.length;i++) {
            
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




export default RunPageInfoCmp;
