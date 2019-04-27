chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "checkForPhishing") {
            checkForPhishing(request, sender, sendResponse);
            return true;
        }
    }
);

function checkForPhishing(request, sender, sendResponse){
    var scripts = document.getElementsByTagName("script");
    for (var i=0; i<scripts.length; i++) {
        if (scripts[i].src.toLowerCase().indexOf("jquery")>-1){
            return sendResponse(true);
        }
    }
    return sendResponse(false);
}