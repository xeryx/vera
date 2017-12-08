import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from '../themes/myTheme';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

const compName = "DataPlotCmp";


const PlotlyComponent = createPlotlyComponent(Plotly);


class DataPlotCmp extends Component {


  render() {
    let data = [
      {
        type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
        x: this.props.plotData.x,     // more about "x": #scatter-x
        y: this.props.plotData.y,     // #scatter-y
        marker: {         // marker is an object, valid marker keys: #scatter-marker
          color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
        }
      }
    ];
    let layout = {                     // all "layout" attributes: #layout
      title: this.props.plotData.title,  // more about "layout.title": #layout-title
      xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
        title: this.props.plotData.xtitle         // more about "layout.xaxis.title": #layout-xaxis-title
      },
      yaxis: {
        title: this.props.plotData.ytitle
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };


    let content = "No Data";

    if(this.props.plotData.x) {

      if(this.props.isWaiting) {
          content = <CircularProgress size={20}/>                      
      }
      else {
        content = <PlotlyComponent 
                      data={data} 
                      layout={layout} 
                      config={config}
                  />
      }

    }

    let waitingCircle = "";

    if(this.props.isWaiting) {
      waitingCircle = <span><CircularProgress size={25}/></span> 
  } 

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div>
        <RaisedButton 
            label="Load plot info" 
            primary={true} 
            style={{"margin":"0px 0px 15px 0px"}}
            onClick={this.handleChangeButton} 
            disabled={this.props.isWaiting}
            />
        {waitingCircle}
        <div style={{"margin":"20px 0px 0px 0px"}}>
          {content}
        </div>  
      </div></MuiThemeProvider>
    )
  }


  handleChangeButton = (event, index, value) => this.props.callback(compName,"updateRunPlotInfo",{});
  

}



export default DataPlotCmp;


