import React from 'react';
import ReactDOM from 'react-dom';
//import AgentInfoApp from './apps/AgentInfoApp';
import MyPageHeader from './my_modules/myPageHeader';
import LoadTestInfo from './apps/LoadTestInfo';

ReactDOM.render(<div>
                <div>
                <div><MyPageHeader/></div>
                <LoadTestInfo/>   
                </div> 
    </div>, document.getElementById('root'));

