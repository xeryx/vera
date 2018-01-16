function saveInLocalStorage(dataJson, requestPath) {
   try{
      localStorage.setItem(requestPath,JSON.stringify(dataJson))
   }
   catch(err){}; 
};

export function testControllerConnection() {
   let path = '/loadrun/testControllerConn';
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                  resolve(responseJson);
                }
                else {
                  reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getAgentsStatus() {
   let path = '/loadrun/getAgentsStatus';
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
               if(responseJson.success !== "false") {
                  resolve(responseJson);
                }
                else {
                  reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function cleanReadyAgents() {
   let path = '/loadrun/cleanReadyAgents';
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                  resolve(responseJson);
                }
                else {
                  reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function runTest(testContainer, numberOfAgents) {
   let path = '/loadrun/runTest/' + testContainer + '/' + numberOfAgents;;
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                  resolve(responseJson);
                }
                else {
                  reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};


export function getTestRunInfo(testRunId) {
   let path = '/tests/' + testRunId + '.json';
   let cachedData = null;
   try {cachedData = localStorage.getItem(path);} catch(err){}
   if(cachedData) {
      return (new Promise(function(resolve, reject) {
            resolve(JSON.parse(cachedData))
         })
      )
   } 
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
               if(responseJson.success !== "false") {
                  saveInLocalStorage(responseJson,path);
                  resolve(responseJson);
                }
                else {
                  reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        ) 
    );
};
