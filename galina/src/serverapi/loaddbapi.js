//Function that retrieves the contents of the response json
export function getRequestResponseContent(requestId) {
    return(
        fetch('/requests/' + requestId.request + '.json', {
            method: "get",
        })
        .then(response => response.json())
    );
};

export function getAllTestRuns() {
    return(
        fetch('/loaddb/getAllTestRuns', {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))

    );
};

export function getSystemUnderTestResources(runId) {
    return(
        fetch('/loaddb/getSystemUnderTestResources/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))

    );
};

export function getPageResults(runId) {
    return(
        fetch('/loaddb/getPageResults/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};

export function getTestRunInformation(runId) {
    return(
        fetch('/loaddb/getTestRunInformation/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};

export function getOverallResults(runId) {
    return(
        fetch('/loaddb/getOverallResults/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};


export function testDbConnection() {
    return(
        fetch('/loaddb/testDbConnection/', {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};



//getGraphData/2917/LOADMASTERCB.PERFTESTMV.LOCAL/%25%20Processor%20Time/Processor/
//getGraphData/2917/LOADMASTERCB.PERFTESTMV.LOCAL/Available%20MBytes/Memory/