const usesIPAddress = url => {
  const regex1 = /\d{1-3}\.\d{1-3}\.\d{1-3}\.\d{1-3}/;
  const regex2 = /0x[A-F0-9][A-F0-9]?\.0x[A-F0-9][A-F0-9]?\.0x[A-F0-9][A-F0-9]?\.0x[A-F0-9][A-F0-9]?/;
  return regex1.test(url) || regex2.test(url);
};

const urlIsTooLong = url => {
  return url.length > 75;
};

const shortenedUrl = url => {
  return (
    url.includes('bit.ly') ||
    url.includes('goo.gl') ||
    url.includes('tinyurl') ||
    url.includes('tiny.cc') ||
    url.includes('lc.chat') ||
    url.includes('is.gd')
  );
};

const hasAt = url => {
  return url.includes('@');
};

const lastOccurenceOfDoubleSlashes = url => {
  return url.lastIndexOf('//') > 6;
};

const hasDashInDomain = url => {
  const domain = url.split('/')[2];
  return domain.includes('-');
};

const isntHTTPS = url => {
  return !url.startsWith('https');
};

function results(url) {
  let result = '';
  if (usesIPAddress(url)) result += 'URL uses IP Address\n';
  if (urlIsTooLong(url)) result += 'URL is too long\n';
  if (shortenedUrl(url)) result += 'URL is shortened\n';
  if (hasAt(url)) result += 'URL has an @\n';
  if (lastOccurenceOfDoubleSlashes(url)) result += 'URL redirects to link after //\n';
  if (hasDashInDomain(url)) result += 'Dashes are rarely used in legitimate URLs\n';
  if (isntHTTPS(url)) result += "URL doesn't use https\n";
  if (result.length == 0) result = 'This URL passes all checks\n';
  return result;
}

document.addEventListener(`DOMContentLoaded`, event => {
  document.getElementById('evaluate-button').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.get(tabs[0].id, tab => {
        alert(results(tab.url));
      });
    });
  });
});
