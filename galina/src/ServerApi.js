//Function that retrieves the contents of the response json
export function getRequestResponseContent(requestId, requestPath) {
   return(
        fetch('/requests/' + requestId.request + '.json', {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => {localStorage.setItem(requestPath,JSON.stringify(responseJson)); return responseJson})
    );
};

export function testDbConnection() {
   let path = '/loaddb/testDbConnection/';
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getAllTestRuns() {
   let path = '/loaddb/getAllTestRuns';
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getPageResultsByTestCase(runId, testCaseName) {
   let path = '/loaddb/getPageResultsByTestCase/' + runId + '/' + testCaseName;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        ) 
    );
};

export function getTestCaseResults(runId) {
   let path = '/loaddb/getTestCaseResults/' + runId;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )   
    );
};

export function getMachinesInvolved(runId) {
   let path = '/loaddb/getMachinesInvolved/' + runId;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson,path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )  
    );
};

export function getGraphData(runId, machine, category, counter) {
   let path = '/loaddb/getGraphData/' + runId + '/' + machine + '/' + category +  '/' + counter;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getSystemUnderTestResources(runId) {
   let path = '/loaddb/getSystemUnderTestResources/' + runId;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getCounterCategories(runId) {
   let path = '/loaddb/getCounterCategories/' + runId;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getAllCountersForCategory(runId, category) {
   let path = '/loaddb/getAllCountersForCategory/' + runId + '/' + category;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )  
    );
};

export function getRunInfo(command,runId) {
   let path = '/loaddb/' + command + '/' + runId;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson,path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

export function getTestRunInformation(runId) {
   let path = '/loaddb/getTestRunInformation/' + runId;
   let cachedData = localStorage.getItem(path);
   if(cachedData) {
      return new Promise(function(resolve, reject) {
         resolve(cachedData)
      })
   } 
   return(
        fetch('/loaddb/getTestRunInformation/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )    
    );
};

export function getOverallResults(runId) {
   let path = '/loaddb/getOverallResults/' + runId;
   let cachedData = localStorage.getItem(path);
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
                    resolve(getRequestResponseContent(responseJson, path))    
                }
                else {
                    reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )    
    );
};