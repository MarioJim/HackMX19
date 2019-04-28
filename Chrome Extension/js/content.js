function checkForPhishing(request, sender, sendResponse) {
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++)
    if (scripts[i].src.toLowerCase().indexOf('jquery') > -1) return sendResponse(true);

  return sendResponse(false);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkForPhishing') {
    checkForPhishing(request, sender, sendResponse);
    return true;
  }
  return false;
});
