import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';

const compName = "RunMachinesDataCmp";

const PlotlyComponent = createPlotlyComponent(Plotly);

class RunMachinesDataCmp extends Component {


  render() {

    let machineItems = [];
    let menuDisabled = false;
    let waitingCircle = "";

    
    if(this.props.machineInfo.length === 0) {
      machineItems.push(<MenuItem key={0} value={0} primaryText={"None"} />)
    }
    else {
      for (let i = 0; i < this.props.machineInfo.length; i++ ) {
        machineItems.push(<MenuItem value={i} primaryText={this.props.machineInfo[i]}  key={i} />);
      }
    }

    if(this.props.isWaiting) {
      waitingCircle = <span><CircularProgress size={25}/></span> 
      menuDisabled = true;
    } 
    if(this.props.machineInfo.length<1) {
        menuDisabled = true;
    }

    /*Plot*/

    let plotContent = "";

    if(Object.keys(this.props.plotData).length !== 0) {

      let trace1 = {
        x: this.props.plotData.x,
        y: this.props.plotData.y1,
        name: this.props.plotData.y1DataName,
        type: "scatter"
      };
      let trace2 = {
        x: this.props.plotData.x,
        y: this.props.plotData.y2,
        name: this.props.plotData.y2DataName,
        yaxis: "y2",
        type: "scatter"
      };
      let data = [trace1, trace2];
      let layout = {
        paper_bgcolor:'#bfbfbf',
        plot_bgcolor:'#bfbfbf',
        title: this.props.plotData.title,
        xaxis: {title: this.props.plotData.xtitle},
        yaxis: {title: this.props.plotData.y1title},
        yaxis2: {
          title: this.props.plotData.y2title,
          titlefont: {color: "rgb(148, 103, 189)"},
          tickfont: {color: "rgb(148, 103, 189)"},
          overlaying: "y",
          side: "right"
        }
      };
      let config = {
        showLink: false,
        displayModeBar: true
      };


      plotContent = <PlotlyComponent 
                    data={data} 
                    layout={layout} 
                    config={config}
                />
    } else {
      plotContent = <div className="row-data-2" style={{"margin":"10px 0px 0px 0px"}}>
                              (No plot data)
                          </div>
  }
    /*End plot*/


    return(<div>
      
            <div style={{float:"left", padding:"20px 0px 0px 0px"}}>  
                <RaisedButton 
                    label="Load Machine Info" 
                    primary={true} 
                    onClick={this.handleChangeButton} 
                    disabled={this.props.isWaiting}
                />
            </div> 
            <div style={{float:"left", width:"300px"}}>    
                <DropDownMenu 
                    value={this.props.menuValue} 
                    onChange={this.handleChangeMenu}
                    disabled={menuDisabled}
                    autoWidth={false}
                    >
                {machineItems}
                </DropDownMenu>
            </div>
            {waitingCircle}
            <div style={{ clear:"both"}}></div> 

            <div style={{padding:"20px 0px 0px 0px"}}>  
                <RaisedButton 
                    label="Load Performance Plot" 
                    primary={true} 
                    onClick={this.handlePlotLoadButton} 
                    disabled={this.props.isWaiting}
                />
            </div>    
            <div style={{padding:"20px 0px 0px 0px"}}>  
            {plotContent}        
            </div> 
     
    </div>)

  }
  
  handleChangeMenu = (event, index, value) => this.props.callback(compName, "machineMenuChange", value);
  handleChangeButton = (event, index, value) => this.props.callback(compName,"updateRunMachineInfo",{});  
  handlePlotLoadButton = (event, index, value) => this.props.callback(compName,"updateMachinePlotInfo",{});  

}



export default RunMachinesDataCmp;


