import React, { Component } from 'react';

class MyPageHeader extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {};    
    }

    render() {  
        return(
            <div style={{"padding":"10px 0px 20px 0px","font-size":"2em", "color":"#02906E"}}>
                <img alt="" src="./res/fujifilm_logo.svg" style={{"width":"250px", "float":"left"}}/>
                <div style={{"margin":"5px 0px 0px 25px", "float":"left"}}> Load Tests Info</div> 
                <img alt="" src="./res/synapse5_logo.svg" style={{"width":"240px", "float":"right"}}/>                
                <div style={{"clear":"both"}}></div>
            </div>
        )
    }
}          

export default MyPageHeader;