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

renderJson('{"message": "Waiting for your response."}');