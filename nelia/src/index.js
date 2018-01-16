import React from 'react';
import ReactDOM from 'react-dom';
import LoadTestRunApp from './LoadTestRunApp';

let heading = "";
if(window.self === window.top) {
   heading = 
      <div style={{padding:"10px 0px 20px 0px",fontSize:"2em", color:"rgb(167, 180, 130)", borderBottomStyle: "solid"}}>
         <img alt="" src="./res/fujifilm_logo.svg" style={{width:"250px", float:"left"}}/>
         <div style={{margin:"5px 0px 0px 25px", float:"left"}}>Run Load Test</div> 
         <img alt="" src="./res/synapse5_logo.svg" style={{width:"240px", float:"right"}}/>                
         <div style={{clear:"both"}}></div>
      </div>
}
else {
   heading = 
   <div style={{fontSize:"1.4em", color:"rgb(167, 180, 130)", borderBottomStyle: "solid"}}>
      <div style={{padding:"0px 0px 10px 0px", float:"left"}}> Load Tests Info</div> 
      <div style={{clear:"both"}}></div>
   </div>   
}

ReactDOM.render(<div>
   {heading}
   <LoadTestRunApp/>
</div>, document.getElementById('root'));

