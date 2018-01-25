//Function that retrieves the contents of the response json
function saveInLocalStorage(dataJson, requestPath) {
   try{
      localStorage.setItem(requestPath,JSON.stringify(dataJson))
   }
   catch(err){}; 
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

export function getPageResultsByTestCase(runId, testCaseName) {
   let path = '/loaddb/getPageResultsByTestCase/' + runId + '/' + testCaseName;
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

export function getPageResults(runId) {
   let path = '/loaddb/getPageResults/' + runId;
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

export function getTestCaseResults(runId) {
   let path = '/loaddb/getTestCaseResults/' + runId;
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

export function getMachinesInvolved(runId) {
   let path = '/loaddb/getMachinesInvolved/' + runId;
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

export function getGraphData(runId, machine, category, counter) {
   let path = '/loaddb/getGraphData/' + runId + '/' + machine + '/' + category +  '/' + counter;
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

export function getTestCaseRequestGraphData(runId, testCaseName, requestUri, counter) {
   let path = '/loaddb/getPageGraphData/' + runId + '/' + testCaseName + '/' + encodeURIComponent(requestUri) +  '/' + encodeURIComponent(counter);
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

export function getSystemUnderTestResources(runId) {
   let path = '/loaddb/getSystemUnderTestResources/' + runId;
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

export function getCounterCategories(runId) {
   let path = '/loaddb/getCounterCategories/' + runId;
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

export function getAllCountersForCategory(runId, category) {
   let path = '/loaddb/getAllCountersForCategory/' + runId + '/' + category;
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

export function getRunInfo(command,runId) {
   let path = '/loaddb/' + command + '/' + runId;
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

export function getTestRunInformation(runId) {
   let path = '/loaddb/getTestRunInformation/' + runId;
   let cachedData = null;
   try {cachedData = localStorage.getItem(path);} catch(err){}   
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

export function getOverallResults(runId) {
   let path = '/loaddb/getOverallResults/' + runId;
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