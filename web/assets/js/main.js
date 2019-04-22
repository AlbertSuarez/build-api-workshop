/* JSON stuff */
function renderJson(jsonString) {
    try {
        var input = eval('(' + jsonString + ')');
    }
    catch (error) {
        return alert("Cannot eval JSON: " + error);
    }
    var options = {
        collapsed: false,
        rootCollapsable: false,
        withQuotes: false,
        withLinks: true
    };
    $('#json-renderer').jsonViewer(input, options);
}
renderJson('{"message": "Waiting for your request."}');



/* Form stuff */

// Set up our HTTP request
var xhr = new XMLHttpRequest();

$('#apiForm a').on('click', function() {
    const port = $('#portInput').val();
    const endpoint = $('#endpointInput').val();
    const method = $('#methodInput').val();
    const requestBody = $('#requestBodyInput').val();
    if (!port || !endpoint || !method) {
        alert('All form inputs are required.');
        return;
    }
    if (!endpoint.startsWith('/')) {
        alert('Endpoint has to start by `/`.');
        return;
    }
    console.log('[PARAMS] Port: ' + port);
    console.log('[PARAMS] Endpoint: ' + endpoint);
    console.log('[PARAMS] Method: ' + method);
    console.log('[PARAMS] Request body: ' + requestBody);

    // Setup our listener to process completed requests
    xhr.onload = function () {
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            var jsonResponse = JSON.parse(xhr.responseText)
            renderJson(jsonResponse);
        } else {
            // What do when the request fails
            alert('The request failed!');
        }
    };
    xhr.onerror = function() {
        alert('The request failed!');
    };
    xhr.ontimeout = function() {
        alert('The request times out!');
    };

    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open(method, 'http://localhost:' + port + endpoint);
    if (requestBody) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(requestBody);
    }
    xhr.send();
});
