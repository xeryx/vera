import React from 'react';
import ReactDOM from 'react-dom';
import LoadTestInfoApp from './apps/LoadTestInfoApp';

ReactDOM.render(<div>
                <div style={{padding:"10px 0px 20px 0px",fontSize:"2em", color:"rgb(167, 180, 130)", "border-bottom-style": "solid"}}>
                    <img alt="" src="./res/fujifilm_logo.svg" style={{width:"250px", float:"left"}}/>
                    <div style={{margin:"5px 0px 0px 25px", float:"left"}}> Load Tests Info</div> 
                    <img alt="" src="./res/synapse5_logo.svg" style={{width:"240px", float:"right"}}/>                
                    <div style={{clear:"both"}}></div>
                </div>
                <LoadTestInfoApp/>   
    </div>, document.getElementById('root'));

