//Function that retrieves the contents of the response json
export function getRequestResponseContent(requestId) {
    return(
        fetch('/requests/' + requestId.request + '.json', {
            method: "get",
        })
        .then(response => response.json())
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

export function getAllTestRuns() {
    return(
        fetch('/loaddb/getAllTestRuns', {
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
        fetch('/loaddb/getOverallResults/2919' + runId, {
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

export function getTestCaseResults(runId) {
    return(
        fetch('/loaddb/getTestCaseResults/' + runId, {
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

export function getCounterCategories(runId) {
    return(
        fetch('/loaddb/getCounterCategories/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};

export function getAllCountersForCategory(runId, category) {
    return(
        fetch('/loaddb/getAllCountersForCategory/' + runId + '/' + category, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};

export function getMachinesInvolved(runId) {
    return(
        fetch('/loaddb/getMachinesInvolved/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};

export function getGraphData(runId, machine, category, counter) {
    return(
        fetch('/loaddb/getGraphData/' + runId + '/' + machine + '/' + category +  '/' + counter, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))
    );
};

export function getRunInfo(command,runId) {
    return(
        fetch('/loaddb/' + command + '/' + runId, {
            method: "get",
        })
        .then(response => response.json())
        .then(requestId => getRequestResponseContent(requestId))

    );
};