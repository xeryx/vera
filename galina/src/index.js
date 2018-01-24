import React from 'react';
import ReactDOM from 'react-dom';
import LoadTestInfoApp from './apps/LoadTestInfoApp';


function getParam(parm) {
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
       if (pair[0].toLowerCase() === parm.toLowerCase()) {
         let pair = vars[i].split("=");
           if (pair[0].toLowerCase() === parm.toLowerCase()) {
               return pair[1];
           }
       }
   }
   return (false);
}

let runId = getParam("runid");
if (!runId) {
   runId = "";
}

let heading = "";
if(window.self === window.top) {
   heading = 
      <div style={{padding:"10px 0px 20px 0px",fontSize:"2em", color:"rgb(167, 180, 130)", borderBottomStyle: "solid"}}>
         <img alt="" src="./res/fujifilm_logo.svg" style={{width:"250px", float:"left"}}/>
         <div style={{margin:"5px 0px 0px 25px", float:"left"}}> Load Tests Info</div> 
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
                <LoadTestInfoApp defaultSelectedRunId={runId}/>   
    </div>, document.getElementById('root'));

