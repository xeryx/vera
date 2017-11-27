import React from 'react';
import ReactDOM from 'react-dom';
//import AgentInfoApp from './apps/AgentInfoApp';
import PageHeader from './my_modules/PageHeader';
import LoadTestInfo from './apps/LoadTestInfo';

ReactDOM.render(<div>
                <div>
                <div><PageHeader/></div>
                <LoadTestInfo/>   
                </div> 
    </div>, document.getElementById('root'));

