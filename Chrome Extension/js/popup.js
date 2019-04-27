document.addEventListener("DOMContentLoaded", function(event) {
    $('#evaluate-button').on('click', getResults);
});

function getResults() { 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "checkForPhishing" }, function (response) {
            showResults(response);
        });
    });
}

function showResults(results) {
    results ? alert("This email is phishing") : alert("This email is not phishing");
}