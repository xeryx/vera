import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';

const PlotlyComponent = createPlotlyComponent(Plotly);


class MachinePlotCmp extends Component {

   render() {

      let plotContent = "";
      let componentContent = "";

      if (this.props.isWaiting) {
         plotContent = <div style={{textAlign:"center"}}><CircularProgress size={25} /></div>
      } 
      else {

         if (Object.keys(this.props.plotData).length !== 0) {

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
               paper_bgcolor: '#bfbfbf',
               plot_bgcolor: '#bfbfbf',
               title: this.props.plotData.title,
               xaxis: { title: this.props.plotData.xtitle },
               yaxis: { title: this.props.plotData.y1title },
               yaxis2: {
                  title: this.props.plotData.y2title,
                  titlefont: { color: "rgb(148, 103, 189)" },
                  tickfont: { color: "rgb(148, 103, 189)" },
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
            plotContent =
               <div className="row-data-2" style={{ "margin": "10px 0px 0px 0px" }}>
                  (No plot data)
                  </div>
         }

      }

      componentContent =
         <Dialog
            title={this.props.machineName}
            titleStyle = {{fontSize:"16px", textAlign:"center"}}
            modal={false}
            open={this.props.isOpen}
            onRequestClose={this.handleClose}
            children={plotContent}
            contentStyle={{width: '100%',maxWidth: 'none'}}
            />
      return (componentContent)
   }


   componentDidMount() {
      window.addEventListener("resize",  this.update.bind(this));
   }

   update() {
      this.forceUpdate()
   }

   handleClose = (event, index, value) =>  {
      if(!this.props.isWaiting) {
         this.props.callback("closeMachinePlotDialog", value);
      }
   }

}


export default MachinePlotCmp;
